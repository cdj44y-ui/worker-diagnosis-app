import { Building2, Users, Banknote, Gavel, MapPin, TrendingUp } from 'lucide-react'
import { CRACKDOWN_DATA, formatCrackdownDate } from '../data/crackdownData'

const { summary, industries, caseTypes, updatedAt, source, sourceUrl } = CRACKDOWN_DATA

const unpaidEok = (summary.unpaidWages / 100_000_000).toFixed(2)

const STATS = [
  {
    icon: Building2,
    value: String(summary.violated),
    unit: '개소',
    sub: `${summary.inspected}개 중 적발`,
    label: '위반 사업장',
  },
  {
    icon: Users,
    value: summary.affectedWorkers.toLocaleString('ko-KR'),
    unit: '명',
    sub: '보도 기준',
    label: '관련 근로자',
  },
  {
    icon: Banknote,
    value: unpaidEok,
    unit: '억원',
    sub: '체불 적발',
    label: '임금 규모',
  },
  {
    icon: Gavel,
    value: String(summary.violations),
    unit: '건',
    sub: '복합 위반',
    label: '법 위반 건수',
  },
]

export default function CrackdownStats() {
  const maxCount = industries[0]?.count ?? 1
  const top3 = industries.slice(0, 3)
  const formattedDate = formatCrackdownDate(updatedAt)

  return (
    <div className="mb-10 no-print">
      <div className="text-center mb-8">
        <p className="text-[12px] font-semibold text-brand-blue tracking-wide mb-2">{source} 요약</p>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-apple-text tracking-tight leading-snug">
          가짜 3.3 · 위장고용 감독 흐름
        </h2>
        <p className="text-[14px] text-apple-secondary mt-2 max-w-lg mx-auto leading-relaxed">
          <span className="text-apple-text font-medium">3.3% 사업소득</span> 관련 보도에서 적발 건수가 많았던 업종은{' '}
          <span className="text-apple-text font-semibold">숙박·음식 → 제조 → 도·소매</span> 순으로 집중됐습니다. (보도{' '}
          {formattedDate} 기준, 개별 사업장과 다를 수 있음)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
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

      <div className="mb-6 rounded-apple-lg border-2 border-brand-blue/35 bg-gradient-to-b from-brand-blue/[0.08] to-apple-surface p-5 sm:p-6 shadow-apple-md">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-brand-blue shrink-0" strokeWidth={2} />
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-apple-text">
            3.3%·위장고용 — 보도에서 비중이 큰 업종
          </h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {top3.map((c, i) => (
            <div
              key={c.name}
              className="relative rounded-apple border border-brand-blue/25 bg-apple-surface p-4 text-left shadow-apple"
            >
              <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-brand-blue px-2 py-0.5 rounded-full">
                TOP {i + 1}
              </span>
              <p className="text-[11px] font-semibold text-brand-blue mb-1">적발 건수</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] font-semibold text-apple-text tabular-nums leading-none">{c.count}</span>
                <span className="text-[13px] text-apple-secondary">건</span>
              </div>
              <p className="text-[15px] font-semibold text-apple-text mt-2">{c.name}</p>
              <p className="text-[11px] text-apple-secondary mt-1 leading-snug">비중 약 {c.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-apple-surface rounded-apple-lg border border-apple-border p-5 shadow-apple">
          <h3 className="text-[13px] font-semibold text-apple-text mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-brand-blue" strokeWidth={2} />
            전 업종 적발 분포 (보도 기준)
          </h3>
          <div className="space-y-3">
            {industries.map((c, i) => {
              const pct = Math.round((c.count / maxCount) * 100)
              const isTop = i < 3
              return (
                <div key={c.name} className="flex items-center gap-3">
                  <span
                    className={`text-[12px] font-medium w-[6.5rem] shrink-0 ${isTop ? 'text-apple-text font-semibold' : 'text-apple-secondary'}`}
                  >
                    {c.name}
                  </span>
                  <div className="flex-1 h-2.5 bg-apple-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isTop ? 'bg-brand-blue' : 'bg-apple-tertiary/50'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-semibold w-12 text-right tabular-nums ${isTop ? 'text-brand-blue' : 'text-apple-tertiary'}`}
                  >
                    {c.count}
                  </span>
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
            {caseTypes.map((item) => (
              <li
                key={item.type}
                className="text-[13px] leading-relaxed relative rounded-lg py-2.5 pl-4 pr-2 -ml-1 bg-brand-blue/[0.06] border border-brand-blue/15 font-medium text-apple-text"
              >
                <span className="absolute left-1.5 top-[0.85em] w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="block text-[10px] font-bold text-brand-blue uppercase tracking-wide mb-0.5">
                  {item.amount} · 관련 {item.workers}명
                </span>
                {item.type}
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-4 border-t border-apple-border text-[11px] text-apple-tertiary leading-relaxed">
            4대보험·국세 연계 조치 등은 보도 내용을 참고하시고, 실제 절차는 전문가 상담을 권합니다.
          </p>
        </div>
      </div>

      <p className="text-center text-[11px] text-apple-tertiary mt-6">
        최종 업데이트: {formattedDate} | 출처:{' '}
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
          {source}
        </a>
      </p>
    </div>
  )
}
