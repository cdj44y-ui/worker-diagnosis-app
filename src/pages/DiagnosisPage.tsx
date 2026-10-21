import { Link, useBlocker } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { LABOR_INSPECTION_DIAGNOSIS_URL } from '../constants/links'
import { useDiagnosis } from '../hooks/useDiagnosis'
import { FLAT_QUESTIONS, CATEGORIES } from '../data/questions'
import { shortCategoryTitle } from '../utils/categoryLabel'
import InfoBanner from '../components/InfoBanner'
import SingleQuestionPanel from '../components/SingleQuestionPanel'
import CategoryInterstitial from '../components/CategoryInterstitial'
import DiagnosisFinalGate from '../components/DiagnosisFinalGate'
import ResultPage from '../components/ResultPage'
import { VERIFIED_DATE, PROMISE } from '../components/brand/brand'

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
        <div className="border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/80">
          <div className="max-w-[1120px] mx-auto px-4 py-3 md:px-8 flex flex-wrap items-center gap-x-3 gap-y-2">
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
            <div className="max-w-[1120px] mx-auto px-4 py-3 md:px-8">
              <div className="flex justify-between items-baseline gap-2 mb-2 text-[13px]">
                <span className="text-[16px] font-bold text-apple-text tabular-nums">
                  {answeredCount} / {totalQuestions} 문항 완료
                </span>
                <span className="text-[16px] font-bold text-brand-blue tabular-nums">{progressPct}%</span>
              </div>
              <div className="h-2.5 bg-[#E6EAF0] rounded-full overflow-hidden mb-2">
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
                  className="text-[15px] font-semibold text-brand-blue text-center sm:text-left line-clamp-2 min-h-[2.5rem] sm:min-h-0"
                >
                  {categoryLineLabel}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </header>

      <div className={(isResult ? 'max-w-2xl' : 'max-w-[1120px] md:grid md:grid-cols-[270px_1fr] md:gap-8') + ' mx-auto px-4 pb-24 pt-6 md:px-8'}>
        {!isResult ? (
          <>
            <aside className="hidden md:block md:sticky md:top-[180px] md:self-start [word-break:keep-all]">
              <p className="mb-3 text-[15px] font-bold text-[#5B6680]">판단 영역 · 대법원 판례 순</p>
              <nav className="overflow-hidden rounded-[14px] border border-[#DDE2EA] bg-white">
                {CATEGORIES.map((c, ci) => {
                  const done = c.questions.filter((q) => answers[q.id] !== undefined).length
                  const curCat = flow.kind === 'question' ? FLAT_QUESTIONS[flow.index].category.id : flow.kind === 'interstitial' ? FLAT_QUESTIONS[flow.nextIndex].category.id : ''
                  const active = curCat === c.id
                  const complete = done === c.questions.length
                  return (
                    <div key={c.id} className={'grid grid-cols-[34px_1fr_auto] items-center gap-2 border-b border-[#EEF1F5] px-4 py-3.5 last:border-b-0 ' + (active ? 'bg-[#14213D] text-white' : 'bg-white')}>
                      <span className={'text-[16px] font-extrabold ' + (active ? 'text-[#80CBC4]' : 'text-[#2F5D50]')}>{ci + 1}</span>
                      <span className={'text-[15px] leading-snug ' + (active ? 'font-bold' : 'text-[#3D4A63]')}>{c.title.replace(/ \(.*\)$/, '')}</span>
                      <span className={'text-[13px] font-bold ' + (complete ? (active ? 'text-[#80CBC4]' : 'text-[#244A40]') : active ? 'text-[#C9D1E0]' : 'text-[#8A94A6]')}>{complete ? '완료' : done + '/' + c.questions.length}</span>
                    </div>
                  )
                })}
              </nav>
              <details className="mt-4 rounded-[12px] border border-[#DDE2EA] bg-white px-4 py-3 text-[14px] leading-[1.65] text-[#5B6680]">
                <summary className="cursor-pointer font-bold text-[#3D4A63]">진단 안내 보기</summary>
                <div className="mt-2"><InfoBanner /></div>
              </details>
            </aside>
            <div>
            <details className="mb-4 rounded-[12px] border border-[#DDE2EA] bg-white px-4 py-3 text-[14px] text-[#5B6680] md:hidden">
              <summary className="cursor-pointer font-bold text-[#3D4A63]">진단 안내 보기</summary>
              <div className="mt-2"><InfoBanner /></div>
            </details>

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
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 min-h-[56px] rounded-[10px] border-[1.5px] border-[#C9D1DC] bg-white text-[#3D4A63] text-[18px] font-bold transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-apple-bg"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                  이전
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCategoryComplete || (flow.kind === 'question' && flow.index >= totalQuestions - 1)}
                  className="flex-[1.4] flex items-center justify-center gap-1.5 py-3.5 min-h-[56px] rounded-[10px] bg-[#14213D] text-white text-[18px] font-bold transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand-blue-dark"
                >
                  다음
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            ) : null}
            <p className="mt-6 text-[14px] text-[#6B7280] no-print">문항별 근거 판례·법령 원문 대조일 {VERIFIED_DATE} · {PROMISE}</p>
            </div>
          </>
        ) : (
          result && <ResultPage result={result} onRestart={restart} />
        )}
      </div>
    </div>
  )
}
