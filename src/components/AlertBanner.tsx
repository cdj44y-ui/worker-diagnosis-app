import { CircleDot } from 'lucide-react'

/** 애플 스타일 — 얇은 정보 바 (과장된 레드 제거) */
export default function AlertBanner() {
  return (
    <div className="no-print border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/75">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2.5 text-center">
        <CircleDot size={14} className="shrink-0 text-brand-blue" strokeWidth={2.5} aria-hidden />
        <p className="text-[13px] text-apple-secondary leading-snug">
          <span className="text-apple-text font-semibold">고용노동부 보도</span>
          <span className="mx-1.5 text-apple-tertiary">·</span>
          가짜 3.3 의심 <span className="text-apple-text font-medium">108개소</span> 감독,{' '}
          <span className="text-apple-text font-medium">72개소 · 1,070명</span> 적발, 체불 약{' '}
          <span className="text-apple-text font-medium">6.85억원</span>
          <span className="hidden sm:inline text-apple-tertiary"> — 2026.3.19</span>
        </p>
      </div>
    </div>
  )
}
