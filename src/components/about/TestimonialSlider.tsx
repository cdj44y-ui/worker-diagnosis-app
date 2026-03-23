import { EXPERT } from '../../data/expert'

export default function TestimonialSlider() {
  return (
    <section className="px-4 sm:px-5 py-14 sm:py-16 bg-apple-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-apple-text text-center mb-2">고객 후기</h2>
        <p className="text-center text-[12px] text-apple-tertiary mb-10">실제 후기로 순차 교체 예정입니다.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {EXPERT.testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-apple-lg border border-apple-border bg-apple-surface p-5 sm:p-6 shadow-apple flex flex-col"
            >
              <p className="text-[14px] text-apple-secondary leading-relaxed flex-1 mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer className="text-[12px] border-t border-apple-border pt-4">
                <p className="font-semibold text-apple-text">{t.author}</p>
                <p className="text-apple-tertiary mt-0.5">{t.company}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
