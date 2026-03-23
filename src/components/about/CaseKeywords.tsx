import { EXPERT } from '../../data/expert'

export default function CaseKeywords() {
  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-surface border-y border-apple-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-apple-text text-center mb-2">
          주요 근로자성 판단 판례 분석 범위
        </h2>
        <p className="text-center text-[13px] text-apple-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          귀사의 사안과 가장 유사한 판례를 찾아 예측 가능한 판단을 제시합니다.
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {EXPERT.caseKeywords.map((k) => (
            <span
              key={k}
              className="inline-block text-[13px] sm:text-[14px] font-medium text-apple-text px-4 py-2.5 rounded-apple border border-brand-blue/25 bg-brand-blue/[0.06] shadow-sm"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
