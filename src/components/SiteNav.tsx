import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { LABOR_INSPECTION_DIAGNOSIS_URL } from '../constants/links'
import { EXPERT } from '../data/expert'

/** 랜딩·소개 공통 상단 네비게이션 */
export default function SiteNav() {
  const { pathname } = useLocation()
  const linkCls = (to: string) =>
    `text-[13px] font-medium transition-colors ${
      pathname === to ? 'text-brand-blue' : 'text-apple-text hover:text-brand-blue'
    }`

  return (
    <header className="bg-apple-surface border-b border-apple-border px-4 sm:px-5 py-3 no-print">
      <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="주요 메뉴">
          <Link to="/" className={linkCls('/')}>
            자가진단
          </Link>
          <span className="text-apple-tertiary" aria-hidden>
            ·
          </span>
          <Link to="/about" className={linkCls('/about')}>
            전문가 소개
          </Link>
          <span className="text-apple-tertiary" aria-hidden>
            ·
          </span>
          <a
            href={EXPERT.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-brand-blue hover:text-brand-blue-dark"
          >
            상담 신청
          </a>
        </nav>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-apple-secondary">
          <a
            href={LABOR_INSPECTION_DIAGNOSIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-blue hover:underline"
          >
            근로감독 진단 사이트
            <ExternalLink size={12} strokeWidth={2.5} className="opacity-80 shrink-0" aria-hidden />
          </a>
          <span className="text-apple-tertiary hidden sm:inline">|</span>
          <span className="text-apple-tertiary hidden sm:inline">노무법인 위너스 · 참고용 자가진단</span>
        </div>
      </div>
    </header>
  )
}
