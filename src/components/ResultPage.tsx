import type { ReactNode } from 'react'
import type { DiagnosisResult, VerdictType } from '../types'
import { CATEGORIES } from '../data/questions'
import {
  LEGAL_REFERENCES,
  ACTIONS_WORKER,
  ACTIONS_GRAY,
  ACTIONS_FREELANCER,
  EVIDENCE_ITEMS,
} from '../data/legal-refs'
import { getVerdictColor, getVerdictText, getBarColor } from '../utils/scoring'
import { RotateCcw, FileText, Scale } from 'lucide-react'
import DisclaimerNotice from './DisclaimerNotice'

interface Props {
  result: DiagnosisResult
  onRestart: () => void
}

function verdictPanelClass(verdict: VerdictType): string {
  switch (verdict) {
    case 'worker':
      return 'bg-rose-50/60 border-rose-100/80'
    case 'gray':
      return 'bg-amber-50/50 border-amber-100/80'
    case 'freelancer':
      return 'bg-emerald-50/50 border-emerald-100/80'
  }
}

/** 배지: 흰 글자 대신 밝은 배경 + 진한 글씨로 가독성 확보 */
function badgeClass(badge: string): string {
  switch (badge) {
    case '대법원':
      return 'bg-sky-100 text-sky-950 border border-sky-300/80'
    case '법령':
      return 'bg-amber-100 text-amber-950 border border-amber-300/80'
    case '행정해석':
      return 'bg-emerald-100 text-emerald-950 border border-emerald-300/80'
    default:
      return 'bg-neutral-200 text-neutral-900 border border-neutral-400/60'
  }
}

export default function ResultPage({ result, onRestart }: Props) {
  const { percentage, verdict, categoryScores, presumptionMet, presumptionItems, answers } = result
  const color = getVerdictColor(verdict)
  const text = getVerdictText(verdict)
  const actions = verdict === 'worker' ? ACTIONS_WORKER : verdict === 'gray' ? ACTIONS_GRAY : ACTIONS_FREELANCER

  const questionDetails = CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => {
      const idx = answers[q.id]
      const sc = idx !== undefined ? q.options[idx].score : 0
      const weighted = sc * q.weight
      const maxWeighted = 5 * q.weight
      const barPct = Math.round((sc / 5) * 100)
      const chosen = idx !== undefined ? q.options[idx].label : '-'
      return { q, sc, weighted, maxWeighted, barPct, chosen }
    }),
  )

  return (
    <div className="animate-slide-up space-y-5">
      <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md p-8 text-center relative overflow-hidden print-break">
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
        <div className="text-6xl sm:text-7xl font-semibold tracking-tight leading-none mb-1 text-apple-text tabular-nums">
          <span style={{ color }}>{percentage}</span>
          <span className="text-lg font-normal text-apple-secondary"> / 100</span>
        </div>
        <div className="text-[13px] text-apple-secondary mb-5">근로자성 종합 점수</div>

        <div className="max-w-md mx-auto h-1 bg-apple-bg rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%`, background: color }}
          />
        </div>
        <div className="max-w-md mx-auto flex justify-between text-[11px] text-apple-tertiary font-medium">
          <span>0 사업자</span>
          <span>40 — 65 회색지대</span>
          <span>100 근로자</span>
        </div>
      </div>

      <div
        className={`rounded-apple-lg border p-7 sm:p-8 text-center print-break ${verdictPanelClass(verdict)}`}
      >
        <div className="text-4xl mb-3" aria-hidden>
          {text.icon}
        </div>
        <div className="text-[22px] sm:text-2xl font-semibold text-apple-text tracking-tight mb-2">{text.title}</div>
        <p className="text-[14px] text-apple-secondary max-w-lg mx-auto leading-relaxed">{text.sub}</p>
      </div>

      <Card title="영역별 분석">
        {categoryScores.map((cs) => (
          <Row key={cs.id} label={cs.name} score={cs.score} max={cs.max} pct={cs.pct} />
        ))}
      </Card>

      <Card title="문항별 상세 결과">
        {questionDetails.map(({ q, weighted, maxWeighted, barPct, chosen }) => (
          <div key={q.id} className="flex items-center justify-between py-3 border-b border-apple-border last:border-0 gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium text-apple-text truncate">{q.text}</div>
              <div className="text-[12px] text-apple-secondary mt-0.5 truncate">{chosen}</div>
            </div>
            <div className="w-20 h-1.5 bg-apple-bg rounded-full overflow-hidden shrink-0">
              <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: getBarColor(barPct) }} />
            </div>
            <div className="text-[12px] font-semibold min-w-[56px] text-right tabular-nums" style={{ color: getBarColor(barPct) }}>
              {weighted.toFixed(1)} / {maxWeighted.toFixed(1)}
            </div>
          </div>
        ))}
      </Card>

      <div className="bg-gradient-to-b from-brand-blue/[0.07] to-apple-elevated border-2 border-brand-blue/30 rounded-apple-lg p-6 sm:p-7 print-break shadow-apple-md ring-1 ring-brand-blue/10">
        <h4 className="text-[16px] font-semibold text-apple-text mb-1 flex items-center gap-2">
          <Scale size={20} className="text-brand-blue shrink-0" strokeWidth={2} />
          근로자 추정제 대비 — 판례 핵심 지표 자가점검
        </h4>
        <p className="text-[11px] font-bold text-brand-blue uppercase tracking-wide mb-2">
          판례상 핵심 판단요소 · 사전 점검 (추정제 법안 요건과 동일하지 않음)
        </p>
        <p className="text-[12px] text-apple-secondary leading-relaxed mb-3">
          근로자 추정제 관련 법안은 입법 과정에 따라 요건·구조가 달라질 수 있습니다. 아래 5개는{' '}
          <span className="text-apple-text font-medium">판례상 사용종속성 등 핵심 판단요소</span>를 사전에 점검하기 위한
          참고 지표이며, 법상 추정요건과 1:1로 대응하지 않습니다.
        </p>
        <p className="text-[13px] text-apple-secondary leading-relaxed mb-4">
          {presumptionMet >= 3 ? (
            <>
              <span className="text-apple-text font-medium">판례 핵심 지표 충족 다수</span> (5개 중 {presumptionMet}개
              충족) — 향후 근로자성·추정제 논의에서 유리할 수 있는 요소가 많습니다. 실제 적용은 입법·해석에 따릅니다.
            </>
          ) : (
            <>
              <span className="text-apple-text font-medium">판례 핵심 지표 충족 소수</span> (5개 중 {presumptionMet}개
              충족) — 위 지표는 추정제 법안 요건과 동일하지 않으며, 개별 사안·판례로 달라질 수 있습니다.
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {presumptionItems.map((p) => (
            <span
              key={p.label}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${
                p.met
                  ? 'bg-emerald-50/80 text-emerald-900/85 border-emerald-100'
                  : 'bg-apple-bg text-apple-secondary border-apple-border'
              }`}
            >
              {p.met ? '충족' : '미충족'} · {p.label}
            </span>
          ))}
        </div>
      </div>

      {percentage >= 40 && (
        <div className="bg-apple-surface border border-apple-border rounded-apple-lg p-6 sm:p-7 print-break shadow-apple">
          <h4 className="text-[15px] font-semibold text-apple-text mb-3 flex items-center gap-2">
            <FileText size={18} className="text-brand-blue shrink-0" strokeWidth={1.75} />
            근로감독·소송 대비 증거 수집 가이드
          </h4>
          {EVIDENCE_ITEMS.map((item) => (
            <div key={item.bold} className="pl-4 py-2 text-[13px] text-apple-secondary leading-relaxed border-l-2 border-brand-blue/20">
              <strong className="text-apple-text">{item.bold}</strong> — {item.detail}
            </div>
          ))}
        </div>
      )}

      <div className="bg-brand-blue/[0.06] border border-brand-blue/15 rounded-apple-lg p-6 sm:p-7 print-break">
        <h4 className="text-[15px] font-semibold text-apple-text mb-3">권고 후속 조치</h4>
        {actions.map((item) => (
          <div key={item.bold} className="pl-4 py-2 text-[13px] text-apple-secondary leading-relaxed border-l-2 border-brand-blue/25">
            <strong className="text-apple-text">{item.bold}</strong> — {item.detail}
          </div>
        ))}
      </div>

      <Card title="적용 판례 및 법적 근거">
        {LEGAL_REFERENCES.map((ref) => (
          <div key={ref.name} className="bg-apple-bg/80 border border-apple-border pl-4 pr-4 py-3 rounded-apple mb-2 last:mb-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${badgeClass(ref.badge)}`}>
                {ref.badge}
              </span>
              <span className="text-[14px] font-semibold text-apple-text">{ref.name}</span>
            </div>
            <p className="text-[12px] text-apple-secondary leading-relaxed">{ref.summary}</p>
          </div>
        ))}
      </Card>

      <DisclaimerNotice variant="result" className="print-break" />

      <div className="no-print">
        <button
          type="button"
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-[15px] shadow-sm border border-neutral-800 hover:bg-neutral-800 transition-colors"
        >
          <RotateCcw size={18} strokeWidth={1.75} /> 다시 진단
        </button>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple overflow-hidden print-break">
      <div className="px-5 sm:px-6 py-4 border-b border-apple-border bg-apple-elevated/50">
        <h3 className="text-[15px] font-semibold text-apple-text tracking-tight">{title}</h3>
      </div>
      <div className="px-5 sm:px-6 py-4">{children}</div>
    </div>
  )
}

function Row({ label, score, max, pct }: { label: string; score: number; max: number; pct: number }) {
  const barColor = getBarColor(pct)
  return (
    <div className="flex items-center justify-between py-3 border-b border-apple-border last:border-0 gap-3">
      <div className="flex-1 text-[14px] font-medium text-apple-text">{label}</div>
      <div className="w-32 h-1.5 bg-apple-bg rounded-full overflow-hidden shrink-0">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: barColor }} />
      </div>
      <div className="text-[12px] font-semibold min-w-[64px] text-right tabular-nums" style={{ color: barColor }}>
        {score.toFixed(1)} / {max.toFixed(1)}
      </div>
    </div>
  )
}
