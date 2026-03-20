import { useState, useCallback, useMemo } from 'react'
import { CATEGORIES } from '../data/questions'
import { calculateResult } from '../utils/scoring'
import type { DiagnosisResult } from '../types'

export function useDiagnosis() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<DiagnosisResult | null>(null)

  const totalQuestions = useMemo(() => CATEGORIES.reduce((s, c) => s + c.questions.length, 0), [])

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers])

  const progressPct = useMemo(
    () => Math.round((answeredCount / totalQuestions) * 100),
    [answeredCount, totalQuestions],
  )

  const currentCategory = CATEGORIES[step] ?? null

  const isCategoryComplete = useMemo(() => {
    if (!currentCategory) return false
    return currentCategory.questions.every((q) => answers[q.id] !== undefined)
  }, [currentCategory, answers])

  const selectAnswer = useCallback((questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }, [])

  const nextStep = useCallback(() => {
    if (step < 4) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [step])

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [step])

  const showResult = useCallback(() => {
    const r = calculateResult(answers)
    setResult(r)
    setStep(5)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [answers])

  const restart = useCallback(() => {
    setStep(0)
    setAnswers({})
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    step,
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
  }
}
