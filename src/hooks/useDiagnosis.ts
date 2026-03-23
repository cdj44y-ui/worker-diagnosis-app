import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { FLAT_QUESTIONS } from '../data/questions'
import { calculateResult } from '../utils/scoring'
import type { Category, DiagnosisResult } from '../types'

const STORAGE_KEY = 'free119-diagnosis-flow-v1'
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

/** 카드 전환: 1 = 앞으로(다음·자동), -1 = 뒤로(이전) */
export type SlideDirection = 1 | -1

export function useDiagnosis() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flow, setFlow] = useState<DiagnosisFlow>({ kind: 'question', index: 0 })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [hydrated, setHydrated] = useState(false)
  /** 문항/인터스티셜/최종 화면 슬라이드 방향 (AnimatePresence custom) */
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(1)
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
    let cancelled = false

    function restoreFromSession(parsed: { answers: Record<string, number>; flow?: DiagnosisFlow }) {
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
    }

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

      // confirm()은 메인 스레드를 막아 첫 페인트 전에 호출되면 빈 화면이 계속됨(특히 인앱 브라우저).
      // 먼저 hydration을 끝내고, 다음 틱에 이어하기 여부를 묻는다.
      setHydrated(true)
      const t = window.setTimeout(() => {
        if (cancelled) return
        const ok = window.confirm('이전 진단을 이어하시겠습니까?')
        if (ok) {
          restoreFromSession({ answers: parsed.answers!, flow: parsed.flow })
        } else {
          try {
            sessionStorage.removeItem(STORAGE_KEY)
          } catch {
            /* ignore */
          }
        }
      }, 0)

      return () => {
        cancelled = true
        window.clearTimeout(t)
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
      setSlideDirection(1)
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
    setSlideDirection(1)
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
    setSlideDirection(-1)
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
    setSlideDirection(1)
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
    setSlideDirection(1)
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
    setSlideDirection(1)
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
    isCategoryComplete,
    selectAnswer,
    nextStep,
    prevStep,
    showResult,
    restart,
    step,
    completeInterstitial,
    isResult,
    slideDirection,
  }
}
