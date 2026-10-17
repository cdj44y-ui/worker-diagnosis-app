import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CategoryScore, DiagnosisResult, RiskCtaType, VerdictType } from '../types'
import { CATEGORIES, getCategoryCaseReferences } from '../data/questions'
import {
  LEGAL_REFERENCES,
  ACTIONS_WORKER,
  ACTIONS_GRAY,
  ACTIONS_FREELANCER,
  EVIDENCE_ITEMS,
} from '../data/legal-refs'
import { getVerdictColor, getVerdictText, getBarColor } from '../utils/scoring'
import { useNavigate } from 'react-router-dom'
import { RotateCcw, FileText, Scale, Mail } from 'lucide-react'
import DisclaimerNotice from './DisclaimerNotice'
import ReportEmailModal from './ReportEmailModal'
import ShareResultBar from './ShareResultBar'

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

function riskWarningPanelClass(ctaType: RiskCtaType): string {
  switch (ctaType) {
    case 'urgent':
      return 'bg-red-50 border-red-200 text-red-800'
    case 'moderate':
      return 'bg-amber-50 border-amber-200 text-amber-800'
    case 'info':
      return 'bg-stone-50 border-stone-200 text-stone-600'
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
  const navigate = useNavigate()
  const [reportOpen, setReportOpen] = useState(false)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; message: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 4500)
    return () => window.clearTimeout(t)
  }, [toast])

  const { percentage, verdict, categoryScores, presumptionMet, presumptionItems, answers } = result
  const color = getVerdictColor(verdict)
  const text = getVerdictText(verdict)
  const { riskWarning } = text
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
    <div className="animate-slide-up space-y-5 pb-24 [word-break:keep-all]">
      <div className="overflow-hidden rounded-[16px] bg-[#14213D] p-8 text-white print-break md:p-10">
        <p className="text-[16px] font-bold text-[#9CC3FF]">근로자성 자가진단 결과</p>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
          <p className="text-[84px] font-extrabold leading-none tracking-[-3px] tabular-nums">{percentage}<span className="ml-1 text-[26px] font-bold tracking-normal text-[#AFC3E8]">/ 100</span></p>
          <p className="mb-2 rounded-md bg-white px-3 py-1.5 text-[19px] font-extrabold" style={{ color }}>{text.title}</p>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, background: '#9CC3FF' }} />
        </div>
        <div className="mt-2 flex justify-between text-[14px] font-semibold text-[#AFC3E8]">
          <span>0 · 사업자 쪽</span><span>40~65 · 판단 유보</span><span>100 · 근로자 쪽</span>
        </div>
        <p className="mt-6 text-[18px] leading-[1.7] text-[#DCE4F2]">{text.sub}</p>
      </div>

      <div
        className={`rounded-apple-lg border p-6 sm:p-7 text-left print-break shadow-apple ${riskWarningPanelClass(riskWarning.ctaType)}`}
      >
        <h3 className="text-[22px] font-bold leading-snug mb-3">{riskWarning.title.replace(/^[^가-힣A-Za-z0-9]+/, '')}</h3>
        <p className="text-[17px] leading-[1.75] opacity-95 mb-3">{riskWarning.description}</p>
        {riskWarning.estimatedCost ? (
          <p className="text-[15px] leading-[1.7] opacity-90 border-t border-current/10 pt-3 mb-5">{riskWarning.estimatedCost}</p>
        ) : null}
        <button
          type="button"
          onClick={() => navigate(`/consult?s=${percentage}&g=${encodeURIComponent(text.title)}`)}
          className="w-full min-h-[60px] py-3 px-4 rounded-[12px] bg-brand-blue text-white font-bold text-[19px] hover:bg-brand-blue-dark transition-colors"
        >
          {riskWarning.ctaText}
        </button>
        <p className="text-center text-[15px] mt-3 opacity-90 leading-[1.6]">진단 결과는 신청서에 자동으로 담깁니다. 상담은 유료 자문으로 진행되며, 신청서 확인 후 일정과 비용을 안내드립니다.</p>
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

      {verdict !== 'freelancer' && (
        <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 md:p-8 print-break">
          <h3 className="text-[24px] font-bold tracking-[-0.4px] text-[#14213D]">근로자로 판단되면 이런 의무가 생깁니다</h3>
          <p className="mt-1.5 text-[16px] text-[#5B6680]">계약서 이름과 관계없이, 근로자에게 적용되는 법이 그대로 적용됩니다.</p>
          <div className="mt-5 border-t-2 border-[#14213D]">
            {[
              ['퇴직금', '계속근로 1년에 30일분 이상의 평균임금', '근로자퇴직급여 보장법 제8조'],
              ['연차휴가', '1년간 80% 이상 출근 시 15일의 유급휴가', '근로기준법 제60조'],
              ['가산수당', '연장근로에 통상임금의 50% 이상 가산', '근로기준법 제56조'],
              ['해고 제한', '정당한 이유 없는 해고 금지, 3개월 이내 노동위원회 구제신청 가능', '근로기준법 제23조, 제28조'],
              ['과거분', '임금·퇴직금 채권은 3년간 행사 가능', '근로기준법 제49조, 근로자퇴직급여 보장법 제10조'],
            ].map(([t, d, law]) => (
              <div key={t} className="grid gap-1 border-b border-[#E6EAF0] py-4 md:grid-cols-[110px_1fr_auto] md:items-baseline md:gap-4">
                <p className="text-[18px] font-bold text-[#14213D]">{t}</p>
                <p className="text-[17px] text-[#3D4A63]">{d}</p>
                <p className="text-[14px] font-semibold text-[#8A94A6]">{law}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid items-start gap-6 rounded-[16px] border border-[#DDE2EA] bg-[#F7F9FC] p-6 md:grid-cols-[150px_1fr] md:p-8 print-break">
        <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={150} height={195} className="h-[195px] w-[150px] rounded-xl object-cover" />
        <div>
          <p className="text-[15px] font-bold text-[#3182F6]">이 결과를 함께 정리할 사람</p>
          <p className="mt-1 text-[26px] font-bold text-[#14213D]">조대진 대표노무사</p>
          <p className="mt-1 text-[16px] text-[#5B6680]">노무법인 위너스 · 공인노무사 16년 · 안전공학 박사 · 현대카드·삼성서울병원 인사 출신</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-[#3D4A63]">계약서를 고쳐 쓰는 것만으로는 해결되지 않습니다. 실제 일하는 방식, 보수 구조, 과거분 정리까지 함께 봐야 합니다. 일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
          <button type="button" onClick={() => navigate(`/consult?s=${percentage}&g=${encodeURIComponent(text.title)}`)} className="mt-5 inline-flex min-h-[56px] items-center rounded-[10px] bg-brand-blue px-7 text-[18px] font-bold text-white hover:bg-brand-blue-dark">상담 신청서 작성하기 →</button>
        </div>
      </div>

      <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md p-6 sm:p-7 text-center no-print">
        <p className="text-[16px] text-apple-secondary mb-4 leading-relaxed">
          진단 요약 리포트를 이메일로 받아보실 수 있습니다.
        </p>
        <button
          type="button"
          onClick={() => setReportOpen(true)}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[240px] py-3.5 px-6 rounded-full border-2 border-brand-blue/35 bg-brand-blue/[0.06] text-brand-blue font-semibold text-[15px] hover:bg-brand-blue/10 transition-colors min-h-[48px]"
        >
          <Mail size={20} strokeWidth={2} aria-hidden />
          진단 결과 리포트 받기
        </button>
      </div>

      <ReportEmailModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        result={result}
        onSuccess={() =>
          setToast({
            kind: 'ok',
            message: '리포트가 이메일로 발송됩니다 (영업일 1일 이내)',
          })
        }
        onError={() =>
          setToast({
            kind: 'err',
            message: '잠시 후 다시 시도해주세요. 잠시 후 다시 시도해 주세요',
          })
        }
      />

      <ShareResultBar percentage={percentage} verdict={verdict} />

      <AnimatePresence>
        {toast ? (
          <motion.div
            key="result-toast"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className={`fixed bottom-6 left-1/2 z-[60] max-w-[min(92vw,22rem)] -translate-x-1/2 rounded-apple-lg border px-4 py-3 text-center text-[13px] font-medium shadow-apple-md no-print ${
              toast.kind === 'ok'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Card title="영역별 분석">
        {categoryScores.map((cs) => (
          <CategoryAnalysisRow key={cs.id} cs={cs} />
        ))}
      </Card>

      <Card title="문항별 상세 결과">
        {questionDetails.map(({ q, weighted, maxWeighted, barPct, chosen }) => (
          <div key={q.id} className="flex items-center justify-between py-3 border-b border-apple-border last:border-0 gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[17px] font-medium text-apple-text truncate">{q.text}</div>
              <div className="text-[15px] text-apple-secondary mt-0.5 truncate">{chosen}</div>
            </div>
            <div className="w-20 h-1.5 bg-apple-bg rounded-full overflow-hidden shrink-0">
              <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: getBarColor(barPct) }} />
            </div>
            <div className="text-[15px] font-semibold min-w-[56px] text-right tabular-nums" style={{ color: getBarColor(barPct) }}>
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
        <p className="text-[14px] font-bold text-brand-blue uppercase tracking-wide mb-2">
          판례상 핵심 판단요소 · 사전 점검 (추정제 법안 요건과 동일하지 않음)
        </p>
        <p className="text-[15px] text-apple-secondary leading-relaxed mb-3">
          근로자 추정제 관련 법안은 입법 과정에 따라 요건·구조가 달라질 수 있습니다. 아래 5개는{' '}
          <span className="text-apple-text font-medium">판례상 사용종속성 등 핵심 판단요소</span>를 사전에 점검하기 위한
          참고 지표이며, 법상 추정요건과 1:1로 대응하지 않습니다.
        </p>
        <p className="text-[16px] text-apple-secondary leading-relaxed mb-4">
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
              className={`px-3 py-1.5 rounded-full text-[15px] font-medium border ${
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
          <h4 className="text-[19px] font-semibold text-apple-text mb-3 flex items-center gap-2">
            <FileText size={18} className="text-brand-blue shrink-0" strokeWidth={1.75} />
            근로감독·소송 대비 증거 수집 가이드
          </h4>
          {EVIDENCE_ITEMS.map((item) => (
            <div key={item.bold} className="pl-4 py-2 text-[16px] text-apple-secondary leading-relaxed border-l-2 border-brand-blue/20">
              <strong className="text-apple-text">{item.bold}</strong> — {item.detail}
            </div>
          ))}
        </div>
      )}

      <div className="bg-brand-blue/[0.06] border border-brand-blue/15 rounded-apple-lg p-6 sm:p-7 print-break">
        <h4 className="text-[19px] font-semibold text-apple-text mb-3">권고 후속 조치</h4>
        {actions.map((item) => (
          <div key={item.bold} className="pl-4 py-2 text-[16px] text-apple-secondary leading-relaxed border-l-2 border-brand-blue/25">
            <strong className="text-apple-text">{item.bold}</strong> — {item.detail}
          </div>
        ))}
      </div>

      {verdict === 'worker' && (
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-apple-lg p-6 sm:p-7 print-break">
          <h4 className="text-[19px] font-semibold text-apple-text mb-2">근로자성이 강하게 인정됩니다 — 근로기준법 준수도 확인하세요</h4>
          <p className="text-[16px] text-apple-secondary leading-relaxed mb-4">
            이 인력이 근로자로 인정된다면 근로계약서·임금·근로시간·4대보험 등 근로기준법 전반의 의무가 함께 발생합니다.
            RISK119에서 50여개 항목으로 무료 점검할 수 있습니다.
          </p>
          <a
            href="https://risk119.site"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full bg-emerald-700 text-white text-[14px] font-semibold hover:bg-emerald-800 transition-colors w-full sm:w-auto"
          >
            근로감독 리스크 진단 사이트 열기
          </a>
        </div>
      )}

      <Card title="적용 판례 및 법적 근거">
        {LEGAL_REFERENCES.map((ref) => (
          <div key={ref.name} className="bg-apple-bg/80 border border-apple-border pl-4 pr-4 py-3 rounded-apple mb-2 last:mb-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[13px] font-semibold px-2 py-0.5 rounded-md ${badgeClass(ref.badge)}`}>
                {ref.badge}
              </span>
              <span className="text-[14px] font-semibold text-apple-text">{ref.name}</span>
            </div>
            <p className="text-[15px] text-apple-secondary leading-relaxed">{ref.summary}</p>
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DDE2EA] bg-white/95 backdrop-blur no-print">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <p className="text-[16px] font-bold text-[#14213D]">{text.title} <span className="font-normal text-[#5B6680]">· {percentage}점</span></p>
          <button type="button" onClick={() => navigate(`/consult?s=${percentage}&g=${encodeURIComponent(text.title)}`)} className="inline-flex h-[50px] shrink-0 items-center rounded-[10px] bg-brand-blue px-5 text-[16px] font-bold text-white">상담 신청서 작성</button>
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple overflow-hidden print-break">
      <div className="px-5 sm:px-6 py-4 border-b border-apple-border bg-apple-elevated/50">
        <h3 className="text-[19px] font-semibold text-apple-text tracking-tight">{title}</h3>
      </div>
      <div className="px-5 sm:px-6 py-4">{children}</div>
    </div>
  )
}

function CategoryAnalysisRow({ cs }: { cs: CategoryScore }) {
  const [open, setOpen] = useState(false)
  const cases = getCategoryCaseReferences(cs.id)
  const barColor = getBarColor(cs.pct)
  return (
    <div className="border-b border-apple-border last:border-0">
      <div className="flex items-center justify-between py-3 gap-3">
        <div className="flex-1 text-[17px] font-medium text-apple-text">{cs.name}</div>
        <div className="w-32 h-1.5 bg-apple-bg rounded-full overflow-hidden shrink-0">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cs.pct}%`, background: barColor }} />
        </div>
        <div className="text-[15px] font-semibold min-w-[64px] text-right tabular-nums" style={{ color: barColor }}>
          {cs.score.toFixed(1)} / {cs.max.toFixed(1)}
        </div>
      </div>
      {cases.length > 0 ? (
        <div className="pb-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-[15px] font-medium text-brand-blue hover:text-brand-blue-dark transition-colors flex items-center gap-1"
            aria-expanded={open}
          >
            관련 판례 {cases.length}건 <span aria-hidden>{open ? '▾' : '▸'}</span>
          </button>
          {open ? (
            <ul className="mt-2 space-y-2 pl-1 border-l-2 border-brand-blue/20">
              {cases.map((c) => (
                <li key={c.caseNo} className="text-[15px] text-apple-secondary leading-relaxed pl-3">
                  <span className="text-apple-text font-medium">{c.court ?? '대법원'} {c.caseNo}</span>
                  <span className="text-apple-tertiary"> · {c.date}</span>
                  <span className="block mt-0.5">{c.summary}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
