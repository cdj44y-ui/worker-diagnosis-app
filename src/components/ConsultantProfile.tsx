import { Link } from 'react-router-dom'
import { Award, GraduationCap, Briefcase, Building, Phone, ChevronRight, Shield } from 'lucide-react'

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
  { text: '근로자 추정제 대응·계약 정비', emphasis: true },
  { text: '가짜 3.3 · 위장고용 점검', emphasis: false },
  { text: '근로감독 대응', emphasis: false },
  { text: '근로자성 분쟁', emphasis: false },
  { text: '4대보험·세무 정리', emphasis: false },
  { text: '취업규칙·계약', emphasis: false },
  { text: '중대재해처벌법 대비', emphasis: false },
]

const NOTION_URL =
  'https://www.notion.so/2f5a65e0676180a9964cd57c9efd6147?v=8232b087526f4419ab68bd26bfd4d9ce'

const TEL = '02-2138-0240'
const TEL_HREF = 'tel:02-2138-0240'

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
          <a
            href={TEL_HREF}
            className="block w-full mb-6 rounded-apple-lg border-2 border-brand-blue bg-brand-blue text-white px-5 py-5 text-center shadow-apple-md hover:bg-brand-blue-dark hover:border-brand-blue-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <div className="flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-wide opacity-95">
              <Phone size={18} strokeWidth={2.5} className="shrink-0" aria-hidden />
              바로 전화 상담
            </div>
            <p className="text-[28px] sm:text-[32px] font-semibold tracking-tight tabular-nums mt-2">{TEL}</p>
            <p className="text-[12px] opacity-90 mt-2 leading-snug">평일 업무시간 기준 · 위장고용·3.3%·추정제 문의 환영</p>
          </a>

          <div className="rounded-apple-lg border border-brand-blue/25 bg-brand-blue/[0.06] p-4 mb-6 flex gap-3 items-start">
            <Shield size={20} className="text-brand-blue shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[13px] text-apple-secondary leading-relaxed">
              <span className="text-apple-text font-semibold">근로자 추정제</span> 적용 가능성과 감독 리스크를 함께
              점검·정리할 수 있도록 자문합니다.
            </p>
          </div>

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
              {EXPERTISE_AREAS.map(({ text, emphasis }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1 text-[12px] font-medium px-3 py-1.5 rounded-full border ${
                    emphasis
                      ? 'text-apple-text bg-brand-blue/10 border-brand-blue/30 ring-1 ring-brand-blue/20'
                      : 'text-apple-text bg-apple-bg border-apple-border'
                  }`}
                >
                  <ChevronRight size={12} className={`shrink-0 ${emphasis ? 'text-brand-blue' : 'text-brand-blue'}`} />
                  {text}
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
              href={NOTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-3.5 rounded-full border-2 border-apple-border text-apple-text text-[15px] font-medium hover:bg-apple-bg transition-colors"
            >
              비대면 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
