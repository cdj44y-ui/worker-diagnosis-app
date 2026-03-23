import { CircleDot } from 'lucide-react'
import { CRACKDOWN_DATA, formatCrackdownDate } from '../data/crackdownData'

/** 애플 스타일 — 얇은 정보 바 */
export default function AlertBanner() {
  const { summary, updatedAt } = CRACKDOWN_DATA
  const unpaidEok = (summary.unpaidWages / 100_000_000).toFixed(2)
  const dateStr = formatCrackdownDate(updatedAt)

  return (
    <div className="no-print border-b border-apple-border bg-apple-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-apple-surface/75">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 text-center">
        <p className="text-[13px] text-apple-secondary leading-snug flex flex-wrap items-center justify-center gap-x-1.5">
          <CircleDot size={14} className="shrink-0 text-brand-blue" strokeWidth={2.5} aria-hidden />
          <span className="text-apple-text font-semibold">고용노동부 보도</span>
          <span className="text-apple-tertiary">·</span>
          가짜 3.3 의심 <span className="text-apple-text font-medium">{summary.inspected}개소</span> 감독,{' '}
          <span className="text-apple-text font-medium">
            {summary.violated}개소 · {summary.affectedWorkers.toLocaleString('ko-KR')}명
          </span>{' '}
          적발, 체불 약 <span className="text-apple-text font-medium">{unpaidEok}억원</span>
          <span className="text-apple-tertiary"> — {dateStr}</span>
        </p>
        <p className="text-[12px] text-apple-secondary leading-snug sm:border-l sm:border-apple-border sm:pl-3">
          <span className="text-apple-text font-semibold">숙박·음식·제조</span> 등 업종 적발 비중 큼 ·{' '}
          <span className="text-brand-blue font-semibold">근로자 추정제</span> 대비 점검 권장
        </p>
      </div>
    </div>
  )
}
