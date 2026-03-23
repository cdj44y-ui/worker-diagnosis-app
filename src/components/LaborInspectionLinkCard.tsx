import { ExternalLink, ClipboardList } from 'lucide-react'
import { LABOR_INSPECTION_DIAGNOSIS_URL } from '../constants/links'

type Variant = 'landing' | 'about'

interface Props {
  variant?: Variant
}

/** 근로감독·사업장 준수 점검 — FREE119와 연계 안내 (risk119 등 외부 URL) */
export default function LaborInspectionLinkCard({ variant = 'landing' }: Props) {
  const isAbout = variant === 'about'

  return (
    <div
      className={`no-print rounded-apple-lg border shadow-apple-md overflow-hidden ${
        isAbout
          ? 'border-emerald-500/25 bg-gradient-to-br from-emerald-50/90 to-apple-surface'
          : 'border-apple-border bg-apple-surface'
      }`}
    >
      <div className={`px-5 sm:px-6 py-5 sm:py-6 ${isAbout ? 'sm:flex sm:items-start sm:gap-5' : ''}`}>
        <div
          className={`inline-flex items-center justify-center rounded-apple ${isAbout ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10'} bg-emerald-500/15 text-emerald-800 mb-4 ${isAbout ? 'sm:mb-0 shrink-0' : ''}`}
          aria-hidden
        >
          <ClipboardList size={isAbout ? 26 : 22} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-emerald-800/90 uppercase tracking-wide mb-1">연계 서비스</p>
          <h3 className="text-[17px] sm:text-[18px] font-semibold text-apple-text tracking-tight mb-2">
            근로감독 진단 사이트
          </h3>
          <p className="text-[13px] sm:text-[14px] text-apple-secondary leading-relaxed mb-4">
            이 사이트(FREE119)는 <span className="text-apple-text font-medium">근로자성 자가진단</span>에 특화되어 있습니다.
            사업장·노동법 준수 점검과 <span className="text-apple-text font-medium">근로감독 대비 진단</span>은 별도 서비스에서
            확인하실 수 있습니다.
          </p>
          <a
            href={LABOR_INSPECTION_DIAGNOSIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full bg-emerald-700 text-white text-[14px] font-semibold hover:bg-emerald-800 transition-colors w-full sm:w-auto"
          >
            근로감독 진단 사이트 열기
            <ExternalLink size={17} strokeWidth={2} aria-hidden />
          </a>
          <p className="text-[11px] text-apple-tertiary mt-3 break-all sm:break-normal">
            {LABOR_INSPECTION_DIAGNOSIS_URL.replace(/^https?:\/\//, '')}
          </p>
        </div>
      </div>
    </div>
  )
}
