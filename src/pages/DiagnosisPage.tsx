import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
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
      <header className="sticky top-0 z-20 border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/80 no-print">
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
