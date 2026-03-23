import { EXPERT } from '../../data/expert'

export default function ApproachSection() {
  const { headline, points } = EXPERT.approach

  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-bg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-apple-text text-center mb-2">{headline}</h2>
        <div className="text-center mb-12 w-16 h-0.5 bg-brand-blue/40 mx-auto rounded-full" aria-hidden />

        <div className="space-y-10">
          {points.map((p) => (
            <div key={p.number} className="pl-4 sm:pl-6 border-l-2 border-brand-blue/35">
              <p className="text-[12px] font-bold text-brand-blue tracking-wide mb-1">{p.number}</p>
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-apple-text mb-3">{p.title}</h3>
              <p className="text-[14px] text-apple-secondary leading-[1.75]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
