import { ChevronDown } from 'lucide-react'

const BADGES = [
  '대법원 94다22859',
  '대법원 2004다29736',
  '타다 2024두32973',
  '근기법 제2조',
  '노동부 가이드',
]

interface Props {
  onStartDiagnosis?: () => void
}

export default function Hero({ onStartDiagnosis }: Props) {
  return (
    <>
      <header className="bg-apple-surface border-b border-apple-border px-5 py-3 flex flex-wrap justify-between items-center gap-2 text-[12px] text-apple-secondary">
        <span className="font-semibold text-apple-text tracking-tight">근로자성 판단 진단</span>
        <span className="text-apple-tertiary">노무법인 위너스 · 판례 기반 자가진단</span>
      </header>

      <section className="relative bg-apple-bg pt-14 pb-16 px-5 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[13px] font-medium text-brand-blue mb-3 tracking-wide">RISK119</p>

          <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-apple-text leading-[1.1] mb-4">
            근로자인가,
            <br />
            프리랜서인가
          </h1>

          <p className="text-[17px] text-apple-secondary leading-relaxed mb-2 max-w-md mx-auto">
            최근 고용부 감독에서도 지적된 <span className="text-apple-text font-medium">3.3% 사업소득</span>·
            위장고용 이슈. 대법원 판례와 가이드라인을 바탕으로{' '}
            <span className="text-apple-text font-medium">5분 안에</span> 스스로 점검해 보세요.
          </p>

          <p className="text-[14px] text-apple-tertiary mb-10 max-w-sm mx-auto leading-relaxed">
            5개 영역 · 19문항 · 결과 리포트 제공 (참고용, 법률 자문 아님)
          </p>

          {onStartDiagnosis && (
            <button
              type="button"
              onClick={onStartDiagnosis}
              className="group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white text-[17px] font-medium px-8 py-3.5 rounded-full shadow-apple transition-colors duration-200"
            >
              자가진단 시작하기
              <ChevronDown size={18} className="opacity-80 group-hover:translate-y-0.5 transition-transform duration-200" />
            </button>
          )}

          <div className="flex flex-wrap gap-2 justify-center mt-10">
            {BADGES.map((b) => (
              <span
                key={b}
                className="text-[11px] font-medium text-apple-secondary bg-apple-surface border border-apple-border px-3 py-1.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
