import { Link } from 'react-router-dom'
import { Award, GraduationCap, Briefcase, Building, Phone, ChevronRight } from 'lucide-react'

const CREDENTIALS = [
  {
    icon: GraduationCap,
    title: '안전공학 박사',
    desc: '산업안전 리스크',
  },
  {
    icon: Award,
    title: '공인노무사',
    desc: '노동법 실무',
  },
  {
    icon: Building,
    title: '대기업 HR',
    desc: '인사·조직 설계',
  },
  {
    icon: Briefcase,
    title: '통합 자문',
    desc: '안전 × 노동 × HR',
  },
]

const EXPERTISE_AREAS = [
  '가짜 3.3 · 위장고용 점검',
  '근로감독 대응',
  '근로자성 분쟁',
  '4대보험·세무 정리',
  '취업규칙·계약',
  '중대재해처벌법 대비',
]

const NOTION_URL =
  'https://www.notion.so/2f5a65e0676180a9964cd57c9efd6147?v=8232b087526f4419ab68bd26bfd4d9ce'

export default function ConsultantProfile() {
  return (
    <div className="mb-10 no-print">
      <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md overflow-hidden">
        <div className="px-6 py-8 bg-apple-elevated border-b border-apple-border">
          <p className="text-[12px] font-semibold text-brand-blue tracking-wide mb-1">노무법인 위너스</p>
          <h3 className="text-[28px] font-semibold text-apple-text tracking-tight">조대진 노무사</h3>
          <p className="text-[15px] text-apple-secondary mt-2 leading-relaxed max-w-md">
            감독·분쟁까지 이어질 수 있는 구조를, 계약과 실무 기준으로 정리합니다.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {CREDENTIALS.map((c) => (
              <div key={c.title} className="rounded-apple border border-apple-border bg-apple-bg/50 p-4">
                <c.icon size={18} className="text-brand-blue mb-2" strokeWidth={1.75} />
                <div className="text-[14px] font-semibold text-apple-text">{c.title}</div>
                <div className="text-[12px] text-apple-secondary mt-0.5">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-apple border border-apple-border p-4 mb-6">
            <h4 className="text-[11px] font-semibold text-apple-tertiary uppercase tracking-wider mb-3">전문 분야</h4>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_AREAS.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-apple-text bg-apple-bg px-3 py-1.5 rounded-full border border-apple-border"
                >
                  <ChevronRight size={12} className="text-brand-blue shrink-0" />
                  {area}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[14px] text-apple-secondary leading-relaxed mb-6 pl-3 border-l-2 border-brand-blue">
            세무 처리만의 문제가 아니라, <span className="text-apple-text font-medium">감독·보험·국세</span>가 함께
            붙을 수 있는 이슈입니다. 사전에 관계와 증빙을 정리하는 것이 중요합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/diagnosis"
              className="flex-1 flex items-center justify-center py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white text-[15px] font-medium transition-colors text-center"
            >
              자가진단 시작
            </Link>
            <a
              href="tel:02-2138-0240"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-apple-text text-white text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              <Phone size={17} strokeWidth={2} />
              02-2138-0240
            </a>
            <a
              href={NOTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-3.5 rounded-full border border-apple-border text-apple-text text-[15px] font-medium hover:bg-apple-bg transition-colors"
            >
              비대면 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
