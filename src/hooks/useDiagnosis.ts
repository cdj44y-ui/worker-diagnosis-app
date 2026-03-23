import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { FLAT_QUESTIONS } from '../data/questions'
import { calculateResult } from '../utils/scoring'
import type { Category, DiagnosisResult } from '../types'

const STORAGE_KEY = 'worker-diagnosis-flow-v1'
const AUTO_ADVANCE_MS = 300
const INTERSTITIAL_MS = 1500

const CAT_ORDER = ['subordination', 'time_place', 'economic', 'platform', 'formal'] as const

function categoryStep(catId: string): number {
  const i = CAT_ORDER.indexOf(catId as (typeof CAT_ORDER)[number])
  return i >= 0 ? i : 0
}

export type DiagnosisFlow =
  | { kind: 'question'; index: number }
  | { kind: 'interstitial'; nextIndex: number }
  | { kind: 'final' }
  | { kind: 'result' }

function firstUnansweredIndex(answers: Record<string, number>): number {
  for (let i = 0; i < FLAT_QUESTIONS.length; i++) {
    const id = FLAT_QUESTIONS[i].question.id
    if (answers[id] === undefined) return i
  }
  return FLAT_QUESTIONS.length
}

function countAnswered(answers: Record<string, number>): number {
  return Object.keys(answers).length
}

export function useDiagnosis() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flow, setFlow] = useState<DiagnosisFlow>({ kind: 'question', index: 0 })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const interstitialTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalQuestions = FLAT_QUESTIONS.length

  const answeredCount = useMemo(() => countAnswered(answers), [answers])

  const progressPct = useMemo(
    () => Math.round((answeredCount / totalQuestions) * 100),
    [answeredCount, totalQuestions],
  )

  const persist = useCallback((nextAnswers: Record<string, number>, nextFlow: DiagnosisFlow) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: nextAnswers, flow: nextFlow }))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setHydrated(true)
        return
      }
      const parsed = JSON.parse(raw) as { answers?: Record<string, number>; flow?: DiagnosisFlow }
      if (!parsed.answers || Object.keys(parsed.answers).length === 0) {
        setHydrated(true)
        return
      }
      const ok = window.confirm('이전 진단을 이어하시겠습니까?')
      if (ok) {
        setAnswers(parsed.answers)
        if (parsed.flow?.kind === 'result') {
          setFlow({ kind: 'question', index: 0 })
        } else if (parsed.flow?.kind === 'final') {
          setFlow({ kind: 'final' })
        } else if (parsed.flow?.kind === 'interstitial') {
          setFlow({ kind: 'question', index: parsed.flow.nextIndex })
        } else if (parsed.flow?.kind === 'question') {
          const first = firstUnansweredIndex(parsed.answers)
          if (first >= totalQuestions) {
            setFlow({ kind: 'final' })
          } else {
            setFlow({ kind: 'question', index: first })
          }
        } else {
          const first = firstUnansweredIndex(parsed.answers)
          if (first >= totalQuestions) {
            setFlow({ kind: 'final' })
          } else {
            setFlow({ kind: 'question', index: first })
          }
        }
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [totalQuestions])

  useEffect(() => {
    if (!hydrated) return
    if (flow.kind === 'result') return
    persist(answers, flow)
  }, [answers, flow, hydrated, persist])

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (flow.kind === 'result') return
      if (countAnswered(answers) === 0) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [answers, flow])

  const clearTimers = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    if (interstitialTimer.current) clearTimeout(interstitialTimer.current)
    advanceTimer.current = null
    interstitialTimer.current = null
  }, [])

  const selectAnswer = useCallback(
    (questionId: string, optionIndex: number) => {
      clearTimers()
      setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))

      advanceTimer.current = setTimeout(() => {
        setFlow((prevFlow) => {
          if (prevFlow.kind !== 'question') return prevFlow
          const idx = FLAT_QUESTIONS.findIndex((x) => x.question.id === questionId)
          if (idx === -1 || idx !== prevFlow.index) return prevFlow
          if (idx === totalQuestions - 1) {
            return { kind: 'final' }
          }
          const cur = FLAT_QUESTIONS[idx]
          const next = FLAT_QUESTIONS[idx + 1]
          if (cur.category.id !== next.category.id) {
            return { kind: 'interstitial', nextIndex: idx + 1 }
          }
          return { kind: 'question', index: idx + 1 }
        })
      }, AUTO_ADVANCE_MS)
    },
    [clearTimers, totalQuestions],
  )

  const completeInterstitial = useCallback(() => {
    clearTimers()
    setFlow((f) => {
      if (f.kind !== 'interstitial') return f
      return { kind: 'question', index: f.nextIndex }
    })
  }, [clearTimers])

  useEffect(() => {
    if (flow.kind !== 'interstitial') return
    interstitialTimer.current = setTimeout(() => {
      completeInterstitial()
    }, INTERSTITIAL_MS)
    return () => {
      if (interstitialTimer.current) clearTimeout(interstitialTimer.current)
    }
  }, [flow, completeInterstitial])

  const prevStep = useCallback(() => {
    clearTimers()
    setFlow((f) => {
      if (f.kind === 'final') {
        return { kind: 'question', index: totalQuestions - 1 }
      }
      if (f.kind === 'interstitial') {
        return { kind: 'question', index: f.nextIndex - 1 }
      }
      if (f.kind === 'question' && f.index > 0) {
        return { kind: 'question', index: f.index - 1 }
      }
      return f
    })
  }, [clearTimers, totalQuestions])

  const nextStep = useCallback(() => {
    clearTimers()
    setFlow((f) => {
      if (f.kind !== 'question') return f
      const q = FLAT_QUESTIONS[f.index].question
      if (answers[q.id] === undefined) return f
      if (f.index === totalQuestions - 1) {
        return { kind: 'final' }
      }
      const cur = FLAT_QUESTIONS[f.index]
      const next = FLAT_QUESTIONS[f.index + 1]
      if (cur.category.id !== next.category.id) {
        return { kind: 'interstitial', nextIndex: f.index + 1 }
      }
      return { kind: 'question', index: f.index + 1 }
    })
  }, [answers, clearTimers, totalQuestions])

  const showResult = useCallback(() => {
    clearTimers()
    const r = calculateResult(answers)
    setResult(r)
    setFlow({ kind: 'result' })
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [answers, clearTimers])

  const restart = useCallback(() => {
    clearTimers()
    setAnswers({})
    setResult(null)
    setFlow({ kind: 'question', index: 0 })
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [clearTimers])

  const step = useMemo(() => {
    if (flow.kind === 'result') return 5
    if (flow.kind === 'final') return 4
    if (flow.kind === 'interstitial') {
      return categoryStep(FLAT_QUESTIONS[flow.nextIndex].category.id)
    }
    if (flow.kind === 'question') {
      return categoryStep(FLAT_QUESTIONS[flow.index].category.id)
    }
    return 0
  }, [flow])

  const currentCategory = useMemo((): Category | null => {
    if (flow.kind === 'question') return FLAT_QUESTIONS[flow.index].category
    if (flow.kind === 'interstitial') return FLAT_QUESTIONS[flow.nextIndex].category
    if (flow.kind === 'final') return FLAT_QUESTIONS[totalQuestions - 1].category
    return null
  }, [flow, totalQuestions])

  const progressCategoryLabel = useMemo(() => {
    if (flow.kind === 'question') return FLAT_QUESTIONS[flow.index].category.title
    if (flow.kind === 'interstitial') return FLAT_QUESTIONS[flow.nextIndex].category.title
    if (flow.kind === 'final') return '완료 요약'
    return ''
  }, [flow])

  const isCategoryComplete = useMemo(() => {
    if (flow.kind !== 'question') return true
    const q = FLAT_QUESTIONS[flow.index].question
    return answers[q.id] !== undefined
  }, [flow, answers])

  const isResult = flow.kind === 'result'

  return {
    hydrated,
    flow,
    answers,
    result,
    totalQuestions,
    answeredCount,
    progressPct,
    currentCategory,
    progressCategoryLabel,
    isCategoryComplete,
    selectAnswer,
    nextStep,
    prevStep,
    showResult,
    restart,
    step,
    completeInterstitial,
    isResult,
  }
}
