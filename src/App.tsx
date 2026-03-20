import { useRef, useCallback } from 'react'
import { useDiagnosis } from './hooks/useDiagnosis'
import AlertBanner from './components/AlertBanner'
import Hero from './components/Hero'
import CrackdownStats from './components/CrackdownStats'
import ConsultantProfile from './components/ConsultantProfile'
import InfoBanner from './components/InfoBanner'
import ProgressBar from './components/ProgressBar'
import QuestionCard from './components/QuestionCard'
import NavigationBar from './components/NavigationBar'
import ResultPage from './components/ResultPage'

export default function App() {
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

  const diagnosisRef = useRef<HTMLDivElement>(null)

  const scrollToDiagnosis = useCallback(() => {
    diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const isResult = step === 5
  const isLanding = step === 0 && answeredCount === 0

  return (
    <div className="min-h-screen bg-apple-bg">
      <AlertBanner />

      <Hero onStartDiagnosis={scrollToDiagnosis} />

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {isLanding && (
          <>
            <CrackdownStats />
            <ConsultantProfile onStartDiagnosis={scrollToDiagnosis} />
          </>
        )}

        <div ref={diagnosisRef}>
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
    </div>
  )
}
