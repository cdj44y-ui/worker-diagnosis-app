import { Link } from 'react-router-dom'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import { NOTION_REMOTE_CONSULT_URL, LABOR_INSPECTION_DIAGNOSIS_URL } from '../constants/links'
import { useDiagnosis } from '../hooks/useDiagnosis'
import InfoBanner from '../components/InfoBanner'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import NavigationBar from '../components/NavigationBar'
import ResultPage from '../components/ResultPage'

/** 진단 전용 — 랜딩(통계·프로필)과 URL·화면 모두 분리 */
export default function DiagnosisPage() {
  const {
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
  } = useDiagnosis()

  const isResult = step === 5

  return (
    <div className="min-h-screen bg-apple-bg">
      <header className="sticky top-0 z-20 no-print">
        {/* 1순위: 비대면 상담 — 진단 화면 최상단에 항상 노출 */}
        <div className="border-b border-brand-blue/40 bg-gradient-to-b from-brand-blue to-brand-blue-dark shadow-md">
          <div className="max-w-3xl mx-auto px-4 pt-4 pb-4 sm:pt-5 sm:pb-5">
            <a
              href={NOTION_REMOTE_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-apple-lg bg-white px-4 py-4 sm:py-[1.125rem] text-[17px] sm:text-[18px] font-bold text-brand-blue shadow-lg hover:bg-zinc-50 active:scale-[0.99] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
            >
              비대면 상담
              <ExternalLink size={20} strokeWidth={2.25} aria-hidden />
            </a>
            <p className="text-center text-[12px] sm:text-[13px] text-white/90 mt-3 leading-snug px-1">
              노션 문의 페이지가 새 탭에서 열립니다 · 언제든지 문의·안내 확인 가능
            </p>
          </div>
        </div>
        <div className="border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/80">
          <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link
              to="/"
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
      </header>

      <div className="max-w-3xl mx-auto px-4 pb-20 pt-6">
        {!isResult ? (
          <>
            <InfoBanner />

            <ProgressBar
              step={step}
              progressPct={progressPct}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
              answers={answers}
            />

            {currentCategory && (
              <QuestionCard category={currentCategory} answers={answers} onSelect={selectAnswer} />
            )}

            <NavigationBar
              step={step}
              isCategoryComplete={isCategoryComplete}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={showResult}
            />
          </>
        ) : (
          result && <ResultPage result={result} onRestart={restart} />
        )}
      </div>
    </div>
  )
}
