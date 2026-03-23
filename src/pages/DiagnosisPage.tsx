import { Link, useBlocker } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { LABOR_INSPECTION_DIAGNOSIS_URL } from '../constants/links'
import RemoteConsultLink from '../components/RemoteConsultLink'
import { useDiagnosis } from '../hooks/useDiagnosis'
import { FLAT_QUESTIONS } from '../data/questions'
import { shortCategoryTitle } from '../utils/categoryLabel'
import InfoBanner from '../components/InfoBanner'
import SingleQuestionPanel from '../components/SingleQuestionPanel'
import CategoryInterstitial from '../components/CategoryInterstitial'
import DiagnosisFinalGate from '../components/DiagnosisFinalGate'
import ResultPage from '../components/ResultPage'

/** 진단 전용 — 랜딩(통계·프로필)과 URL·화면 모두 분리 */
export default function DiagnosisPage() {
  const {
    hydrated,
    flow,
    answers,
    result,
    totalQuestions,
    answeredCount,
    progressPct,
    isCategoryComplete,
    selectAnswer,
    nextStep,
    prevStep,
    showResult,
    restart,
    completeInterstitial,
    isResult,
    slideDirection,
  } = useDiagnosis()

  const categoryLineLabel = useMemo(() => {
    if (flow.kind === 'question') {
      const cur = FLAT_QUESTIONS[flow.index].category
      const curShort = shortCategoryTitle(cur)
      if (flow.index === 0) return curShort
      const prevShort = shortCategoryTitle(FLAT_QUESTIONS[flow.index - 1].category)
      return prevShort !== curShort ? `${prevShort} → ${curShort}` : curShort
    }
    if (flow.kind === 'interstitial') {
      const prev = shortCategoryTitle(FLAT_QUESTIONS[flow.nextIndex - 1].category)
      const next = shortCategoryTitle(FLAT_QUESTIONS[flow.nextIndex].category)
      return `${prev} → ${next}`
    }
    if (flow.kind === 'final') return '모든 문항 완료'
    return ''
  }, [flow])

  const cardVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 20 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -20 }),
  }

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isResult &&
      answeredCount > 0 &&
      currentLocation.pathname === '/diagnosis' &&
      nextLocation.pathname !== '/diagnosis',
  )
  const blockerHandled = useRef(false)

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      blockerHandled.current = false
      return
    }
    if (blockerHandled.current) return
    blockerHandled.current = true
    const ok = window.confirm('진단이 완료되지 않았습니다. 나가시겠습니까?')
    if (ok) blocker.proceed()
    else blocker.reset()
  }, [blocker])

  const canPrev =
    flow.kind === 'question'
      ? flow.index > 0
      : flow.kind === 'interstitial' || flow.kind === 'final'

  const showNav = flow.kind === 'question'

  if (!hydrated) {
    return <div className="min-h-screen bg-apple-bg" aria-busy="true" />
  }

  return (
    <div className="min-h-screen bg-apple-bg">
      <header className="sticky top-0 z-20 no-print">
        <div className="border-b border-brand-blue/40 bg-gradient-to-b from-brand-blue to-brand-blue-dark shadow-md">
          <div className="max-w-3xl mx-auto px-4 pt-4 pb-4 sm:pt-5 sm:pb-5">
            <RemoteConsultLink variant="headerPrimary" />
            <p className="text-center text-[12px] sm:text-[13px] text-white/90 mt-3 leading-snug px-1">
              노션 문의 페이지가 새 탭에서 열립니다 · 언제든지 문의·안내 확인 가능
            </p>
          </div>
        </div>
        <div className="border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/80">
          <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link
              to="/"
              onClick={(e) => {
                if (!isResult && answeredCount > 0 && !window.confirm('진단이 완료되지 않았습니다. 나가시겠습니까?')) {
                  e.preventDefault()
                }
              }}
              className="inline-flex items-center gap-1 text-[14px] font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden />
              처음으로
            </Link>
            <span className="text-apple-tertiary hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="text-[13px] font-semibold text-apple-text">근로자성 자가진단</span>
            <a
              href={LABOR_INSPECTION_DIAGNOSIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-blue hover:text-brand-blue-dark hover:underline"
            >
              근로감독 진단 사이트
              <ExternalLink size={14} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>

        {!isResult ? (
          <div className="border-b border-apple-border bg-apple-bg/95 backdrop-blur-md supports-[backdrop-filter]:bg-apple-bg/90">
            <div className="max-w-lg mx-auto px-4 py-3">
              <div className="flex justify-between items-baseline gap-2 mb-2 text-[13px]">
                <span className="font-medium text-apple-text tabular-nums">
                  {answeredCount} / {totalQuestions} 문항 완료
                </span>
                <span className="text-apple-secondary tabular-nums hidden sm:inline">{progressPct}%</span>
              </div>
              <div className="h-0.5 bg-apple-bg rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-brand-blue rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={categoryLineLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="text-[12px] font-medium text-brand-blue text-center sm:text-left line-clamp-2 min-h-[2.5rem] sm:min-h-0"
                >
                  {categoryLineLabel}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </header>

      <div className="max-w-lg mx-auto px-4 pb-24 pt-6">
        {!isResult ? (
          <>
            <InfoBanner />

            <div className="min-h-[min(52vh,420px)]">
              <AnimatePresence mode="wait" custom={slideDirection}>
                {flow.kind === 'question' ? (
                  <motion.div
                    key={`q-${flow.index}`}
                    className="w-full"
                    custom={slideDirection}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <SingleQuestionPanel
                      category={FLAT_QUESTIONS[flow.index].category}
                      question={FLAT_QUESTIONS[flow.index].question}
                      globalIndex={flow.index}
                      total={totalQuestions}
                      answers={answers}
                      onSelect={selectAnswer}
                    />
                  </motion.div>
                ) : null}

                {flow.kind === 'interstitial' ? (
                  <motion.div
                    key="interstitial"
                    className="w-full"
                    custom={slideDirection}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <CategoryInterstitial nextIndex={flow.nextIndex} onContinue={completeInterstitial} />
                  </motion.div>
                ) : null}

                {flow.kind === 'final' ? (
                  <motion.div
                    key="final"
                    className="w-full"
                    custom={slideDirection}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <DiagnosisFinalGate onShowResult={showResult} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {showNav ? (
              <div className="flex gap-3 mt-6 no-print">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={!canPrev}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 min-h-[48px] rounded-full border border-apple-border bg-apple-surface text-apple-text text-[15px] font-medium transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-apple-bg"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                  이전
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCategoryComplete || (flow.kind === 'question' && flow.index >= totalQuestions - 1)}
                  className="flex-[1.4] flex items-center justify-center gap-1.5 py-3.5 min-h-[48px] rounded-full bg-brand-blue text-white text-[15px] font-medium transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand-blue-dark"
                >
                  다음
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </>
        ) : (
          result && <ResultPage result={result} onRestart={restart} />
        )}
      </div>
    </div>
  )
}
