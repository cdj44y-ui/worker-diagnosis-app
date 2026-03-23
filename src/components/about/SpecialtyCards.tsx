import { EXPERT } from '../../data/expert'

export default function SpecialtyCards() {
  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-apple-text text-center mb-2">전문 영역</h2>
        <div className="text-center mb-10 w-16 h-0.5 bg-brand-blue/40 mx-auto rounded-full" aria-hidden />

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {EXPERT.specialties.map((s) => (
            <div
              key={s.id}
              className="rounded-apple-lg border border-apple-border bg-apple-surface p-5 sm:p-6 shadow-apple-md flex flex-col"
            >
              <span className="text-[28px] mb-2" aria-hidden>
                {s.icon}
              </span>
              <h3 className="text-[18px] font-semibold text-apple-text">{s.area}</h3>
              <p className="text-[13px] font-medium text-brand-blue mt-1 mb-4">{s.subtitle}</p>
              <div className="border-t border-apple-border pt-4 flex-1">
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="text-[13px] text-apple-secondary leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[0.55em] before:w-1 before:h-1 before:rounded-full before:bg-brand-blue/60">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-apple-secondary max-w-2xl mx-auto leading-relaxed border-t border-dashed border-apple-border pt-8">
          <span className="text-apple-text font-medium">근로자성 문제는 진단 → 방어 → 재설계</span>의 순서로 풀어야 같은
          분쟁이 반복되지 않습니다.
        </p>
      </div>
    </section>
  )
}
