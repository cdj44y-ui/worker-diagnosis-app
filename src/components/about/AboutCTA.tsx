import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, Phone, Mail } from 'lucide-react'
import { EXPERT } from '../../data/expert'

export default function AboutCTA() {
  const { phone, email, calendly, affiliation } = EXPERT.contact
  const telHref = `tel:${phone.replace(/-/g, '')}`

  return (
    <section className="px-4 sm:px-5 py-14 sm:py-20 pb-24 bg-gradient-to-b from-apple-bg to-brand-blue/[0.06]">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-apple-lg border-2 border-brand-blue/35 bg-apple-surface shadow-apple-md p-8 sm:p-10 text-center">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-apple-text mb-3 leading-snug">
            우리 회사의 계약 구조, 괜찮을까?
          </h2>
          <p className="text-[14px] text-apple-secondary leading-relaxed mb-8">
            3분 자가진단으로 근로자성 리스크를 확인하고,
            <br className="hidden sm:block" />
            전문가와 15분 무료 상담으로 대응 방향을 잡으세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to="/diagnosis"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-brand-blue text-white font-semibold text-[15px] hover:bg-brand-blue-dark transition-colors"
            >
              근로자성 진단 시작하기
              <ChevronRight size={18} strokeWidth={2} aria-hidden />
            </Link>
            <a
              href={calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full border-2 border-brand-blue/40 bg-brand-blue/[0.06] text-brand-blue font-semibold text-[15px] hover:bg-brand-blue/10 transition-colors"
            >
              <Calendar size={18} strokeWidth={2} aria-hidden />
              15분 무료 상담 예약하기
            </a>
          </div>

          <p className="text-[13px] font-medium text-apple-text mb-3">
            {EXPERT.name} {EXPERT.title} · {affiliation}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[13px] text-apple-secondary">
            <a href={telHref} className="inline-flex items-center gap-1.5 text-apple-text hover:text-brand-blue font-medium">
              <Phone size={16} strokeWidth={2} aria-hidden />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 hover:text-brand-blue break-all">
              <Mail size={16} strokeWidth={2} aria-hidden />
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
