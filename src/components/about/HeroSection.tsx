import { useState } from 'react'
import { EXPERT } from '../../data/expert'

export default function HeroSection() {
  const [imgErr, setImgErr] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue/[0.08] via-apple-bg to-apple-bg px-4 sm:px-5 pt-10 pb-14 sm:pt-14 sm:pb-16">
      <div className="max-w-3xl mx-auto px-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10 gap-8">
          <div className="flex justify-center sm:justify-start shrink-0">
            {!imgErr ? (
              <img
                src={EXPERT.photo}
                alt=""
                width={180}
                height={180}
                className="w-[180px] h-[180px] rounded-full object-cover object-top border-4 border-white shadow-apple-md"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div
                className="w-[180px] h-[180px] rounded-full border-4 border-white shadow-apple-md bg-brand-blue/15 flex items-center justify-center text-[48px] font-semibold text-brand-blue"
                aria-hidden
              >
                조
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <p className="text-[12px] font-semibold text-brand-blue tracking-wide mb-1">{EXPERT.affiliation}</p>
            <h1 className="text-[28px] sm:text-[30px] font-semibold text-apple-text tracking-tight">
              {EXPERT.name} {EXPERT.title}
            </h1>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3 mb-4">
              {EXPERT.credentials.map((c) => (
                <span
                  key={c}
                  className="inline-block text-[12px] font-medium px-3 py-1 rounded-full bg-apple-surface border border-apple-border text-apple-text"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-[13px] text-apple-secondary mb-6">
              {EXPERT.career.map((x) => (
                <span key={x.company} className="inline-flex items-center gap-1.5">
                  <span aria-hidden>{x.icon}</span>
                  <span className="text-apple-text font-medium">{x.company}</span>
                  <span>{x.role}</span>
                </span>
              ))}
            </div>

            <p className="text-[20px] sm:text-[22px] font-semibold text-brand-blue leading-snug mb-3">{EXPERT.tagline}</p>
            <p className="text-[15px] text-apple-secondary leading-relaxed max-w-xl mx-auto sm:mx-0">{EXPERT.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
