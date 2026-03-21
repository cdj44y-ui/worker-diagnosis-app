import { Link } from 'react-router-dom'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import { NOTION_REMOTE_CONSULT_URL } from '../constants/links'
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
        <div className="border-b border-brand-blue/25 bg-gradient-to-r from-brand-blue/[0.09] via-white to-brand-blue/[0.06] backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[14px] sm:text-[15px] font-semibold text-apple-text leading-snug">
                언제든지 비대면 상담 가능
              </p>
              <p className="text-[12px] sm:text-[13px] text-apple-secondary mt-0.5 leading-snug">
                노션 페이지에서 문의 방법·안내를 확인할 수 있습니다.
              </p>
            </div>
            <a
              href={NOTION_REMOTE_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-brand-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-apple hover:bg-brand-blue-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              비대면 상담 (Notion)
              <ExternalLink size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>
        <div className="border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/80">
          <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1">
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
