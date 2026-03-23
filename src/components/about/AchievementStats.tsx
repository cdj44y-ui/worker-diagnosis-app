import { EXPERT } from '../../data/expert'

export default function AchievementStats() {
  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-surface border-y border-apple-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-apple-text text-center mb-10">실적</h2>
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {EXPERT.achievements.map((a) => (
            <div key={a.label} className="rounded-apple-lg border border-apple-border bg-apple-bg/40 p-6">
              <div className="flex items-baseline justify-center gap-0.5 mb-2">
                <span className="text-[40px] sm:text-[44px] font-semibold text-brand-blue tabular-nums tracking-tight">
                  {a.metric}
                </span>
                <span className="text-[16px] font-semibold text-apple-secondary">{a.unit}</span>
              </div>
              <p className="text-[15px] font-semibold text-apple-text mb-2">{a.label}</p>
              <p className="text-[12px] text-apple-tertiary leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-apple-tertiary mt-8 max-w-lg mx-auto">
          위 수치는 운영 시 실제 데이터로 교체 예정입니다.
        </p>
      </div>
    </section>
  )
}
