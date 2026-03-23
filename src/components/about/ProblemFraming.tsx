import { EXPERT } from '../../data/expert'

export default function ProblemFraming() {
  const { headline, points } = EXPERT.problemFraming

  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-surface border-y border-apple-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-apple-text text-center mb-2">{headline}</h2>
        <div className="text-center mb-10 w-16 h-0.5 bg-brand-blue/40 mx-auto rounded-full" aria-hidden />

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-apple-lg border border-apple-border bg-apple-bg/50 p-5 sm:p-6 shadow-apple text-left"
            >
              <span className="text-[32px] leading-none block mb-3" aria-hidden>
                {p.icon}
              </span>
              <h3 className="text-[17px] font-semibold text-apple-text mb-3 leading-snug">{p.title}</h3>
              <p className="text-[14px] text-apple-secondary leading-[1.7]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
