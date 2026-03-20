import { Building2, Users, Banknote, Gavel, MapPin } from 'lucide-react'

const STATS = [
  { icon: Building2, value: '72', unit: '개소', sub: '108개 중 적발', label: '위반 사업장' },
  { icon: Users, value: '1,070', unit: '명', sub: '보도 기준', label: '관련 근로자' },
  { icon: Banknote, value: '6.85', unit: '억원', sub: '체불 적발', label: '임금 규모' },
  { icon: Gavel, value: '256', unit: '건', sub: '복합 위반', label: '법 위반 건수' },
]

const CASES = [
  { industry: '숙박·음식', count: 39 },
  { industry: '제조업', count: 16 },
  { industry: '도·소매', count: 13 },
  { industry: '운수·창고', count: 3 },
  { industry: '사업지원', count: 1 },
]

const CASE_LINES = [
  '콜센터 교육생 다수 사업소득 처리 · 체불 다액 적발 사례',
  '제조 하도급 다수 3.3% 적용 · 보험 미가입 정리 필요',
  '동일 사업주 다지점 운영(인원 분산) 형태도 보도',
  '물류 · 실질 사용자 판단 · 불법파견 이슈 병존 가능',
]

export default function CrackdownStats() {
  return (
    <div className="mb-10 no-print">
      <div className="text-center mb-8">
        <p className="text-[12px] font-semibold text-brand-blue tracking-wide mb-2">고용노동부 보도자료 요약</p>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-apple-text tracking-tight leading-snug">
          가짜 3.3 · 위장고용 감독 흐름
        </h2>
        <p className="text-[14px] text-apple-secondary mt-2 max-w-md mx-auto leading-relaxed">
          수치는 보도자료(2026.3.19) 기준이며, 개별 사업장과 다를 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-apple-surface rounded-apple-lg border border-apple-border p-4 text-left shadow-apple"
          >
            <s.icon size={20} className="text-brand-blue mb-3 opacity-90" strokeWidth={1.75} />
            <div className="flex items-baseline gap-0.5">
              <span className="text-[26px] font-semibold text-apple-text tracking-tight tabular-nums">{s.value}</span>
              <span className="text-[13px] font-medium text-apple-secondary">{s.unit}</span>
            </div>
            <p className="text-[11px] text-apple-tertiary mt-1">{s.sub}</p>
            <p className="text-[12px] font-medium text-apple-secondary mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-apple-surface rounded-apple-lg border border-apple-border p-5 shadow-apple">
          <h3 className="text-[13px] font-semibold text-apple-text mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-brand-blue" strokeWidth={2} />
            업종별 적발 (보도 기준)
          </h3>
          <div className="space-y-3">
            {CASES.map((c) => {
              const maxCount = 39
              const pct = Math.round((c.count / maxCount) * 100)
              return (
                <div key={c.industry} className="flex items-center gap-3">
                  <span className="text-[12px] font-medium text-apple-secondary w-[4.5rem] shrink-0">{c.industry}</span>
                  <div className="flex-1 h-2 bg-apple-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-blue rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, opacity: 0.85 }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-apple-tertiary w-10 text-right tabular-nums">{c.count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-apple-surface rounded-apple-lg border border-apple-border p-5 shadow-apple">
          <h3 className="text-[13px] font-semibold text-apple-text mb-4 flex items-center gap-2">
            <Gavel size={16} className="text-brand-blue" strokeWidth={2} />
            보도에서 언급된 유형
          </h3>
          <ul className="space-y-3">
            {CASE_LINES.map((line) => (
              <li key={line} className="text-[13px] text-apple-secondary leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-[0.45em] w-1 h-1 rounded-full bg-apple-tertiary" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-4 border-t border-apple-border text-[11px] text-apple-tertiary leading-relaxed">
            4대보험·국세 연계 조치 등은 보도 내용을 참고하시고, 실제 절차는 전문가 상담을 권합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
