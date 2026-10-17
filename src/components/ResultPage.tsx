import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CategoryScore, DiagnosisResult } from '../types'
import { CATEGORIES, getCategoryCaseReferences } from '../data/questions'
import { LEGAL_REFERENCES, ACTIONS_WORKER, ACTIONS_GRAY, ACTIONS_FREELANCER, EVIDENCE_ITEMS } from '../data/legal-refs'
import { getVerdictColor, getVerdictText, getBarColor } from '../utils/scoring'
import { useNavigate } from 'react-router-dom'
import { RotateCcw, Mail } from 'lucide-react'
import DisclaimerNotice from './DisclaimerNotice'
import ReportEmailModal from './ReportEmailModal'
import ShareResultBar from './ShareResultBar'
import ResultSheet from './brand/ResultSheet'

// 2026-10-18 RISK119 결과 화면 구성 준용 — 법령·판례·고용노동부 발표로 확인된 내용만 사용
interface Props { result: DiagnosisResult; onRestart: () => void }

const BURDEN = [
  ['4대보험 사업주 몫', '건강보험·국민연금은 근로자와 같은 금액, 고용보험은 실업급여 보험료 절반과 고용안정·직업능력개발 보험료 전액, 산재보험은 전액', '국민건강보험법 제76조, 국민연금법 제88조, 고용·산재보험료징수법 제13조'],
  ['최대 3년 소급', '보험료 징수권은 3년간 행사 가능 · 지난 감독에서 5억 2천만원 소급 징수', '국민건강보험법 제91조, 국민연금법 제115조, 고용·산재보험료징수법 제41조'],
  ['연체금·가산금·과태료', '납부기한 경과 시 연체금, 고용·산재 확정보험료 미신고 등 징수 시 10% 가산금, 피보험자격 미신고 과태료', '고용·산재보험료징수법 제24조·제25조, 고용노동부 보도자료(2026.7.1)'],
  ['퇴직금', '계속근로 1년에 30일분 이상의 평균임금', '근로자퇴직급여 보장법 제8조'],
  ['연차·가산수당', '1년 80% 이상 출근 시 15일 유급휴가, 연장근로 통상임금 50% 이상 가산', '근로기준법 제60조, 제56조'],
  ['해고 제한·과거분', '정당한 이유 없는 해고 금지(3개월 내 구제신청), 임금·퇴직금 채권 3년', '근로기준법 제23·28·49조, 근로자퇴직급여 보장법 제10조'],
]

export default function ResultPage({ result, onRestart }: Props) {
  const navigate = useNavigate()
  const [reportOpen, setReportOpen] = useState(false)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; message: string } | null>(null)
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 4500); return () => window.clearTimeout(t) }, [toast])

  const { percentage: rawPct, verdict, categoryScores, presumptionMet, presumptionItems, answers } = result
  const percentage = Math.round(rawPct)
  const color = getVerdictColor(verdict)
  const text = getVerdictText(verdict)
  const { riskWarning } = text
  const actions = verdict === 'worker' ? ACTIONS_WORKER : verdict === 'gray' ? ACTIONS_GRAY : ACTIONS_FREELANCER
  const goConsult = () => navigate(`/consult?s=${percentage}&g=${encodeURIComponent(text.title)}`)
  const sorted = [...categoryScores].sort((a, b) => b.pct - a.pct)

  const questionDetails = CATEGORIES.flatMap((cat) => cat.questions.map((q) => {
    const idx = answers[q.id]; const sc = idx !== undefined ? q.options[idx].score : 0
    return { q, weighted: sc * q.weight, maxWeighted: 5 * q.weight, barPct: Math.round((sc / 5) * 100), chosen: idx !== undefined ? q.options[idx].label : '-' }
  }))

  return (
    <div className="animate-slide-up space-y-5 pb-24 text-[#14213D] [word-break:keep-all]">
      {/* 결과지 (브랜드 v1.1 공통 형식) */}
      <ResultSheet result={result} title={text.title} percentage={percentage} />
      <div className="flex flex-col items-start gap-3 rounded-[12px] border border-[#D1D5DB] bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6 no-print">
        <p className="text-[17px] leading-[1.6] text-[#374151]">이 결과지를 바탕으로 계약 구조와 소급 부담을 함께 정리합니다. 상담은 유료 자문입니다.</p>
        <button type="button" onClick={goConsult} className="inline-flex min-h-[54px] shrink-0 items-center rounded-[10px] bg-[#1F4E79] px-6 text-[18px] font-bold text-white hover:bg-[#173B5C]">상담 신청서 작성</button>
      </div>
      {/* 1. 결과 */}
      <div className="overflow-hidden rounded-[16px] bg-[#14213D] p-8 text-white print-break md:p-10">
        <p className="text-[16px] font-bold text-[#80CBC4]">근로자성 자가진단 결과</p>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
          <p className="text-[84px] font-extrabold leading-none tracking-[-3px] tabular-nums">{percentage}<span className="ml-1 text-[26px] font-bold tracking-normal text-[#AFC3E8]">/ 100</span></p>
          <p className="mb-2 rounded-md bg-white px-3 py-1.5 text-[19px] font-extrabold" style={{ color }}>{text.title}</p>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, background: '#80CBC4' }} /></div>
        <div className="mt-2 flex justify-between text-[14px] font-semibold text-[#AFC3E8]"><span>0 · 사업자 쪽</span><span>40~65 · 판단 유보</span><span>100 · 근로자 쪽</span></div>
        <p className="mt-6 text-[18px] leading-[1.7] text-[#DCE4F2]">{text.sub}</p>
      </div>

      {/* 2. 위험 */}
      <div className="rounded-[16px] border-2 p-6 md:p-8 print-break" style={{ borderColor: verdict === 'worker' ? '#F1C5C5' : verdict === 'gray' ? '#EBD9B4' : '#C9DDD1', background: verdict === 'worker' ? '#FDF5F5' : verdict === 'gray' ? '#FCF8EE' : '#F3F8F5' }}>
        <h3 className="text-[23px] font-bold leading-snug">{riskWarning.title.replace(/^[^가-힣A-Za-z0-9]+/, '')}</h3>
        <p className="mt-3 text-[18px] leading-[1.75] text-[#3D4A63]">{riskWarning.description}</p>
        {riskWarning.estimatedCost ? <p className="mt-3 border-t border-[#E6DADA] pt-3 text-[15px] leading-[1.7] text-[#5B6680]">{riskWarning.estimatedCost}</p> : null}
      </div>

      {/* 3. 판단을 가른 영역 */}
      <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 md:p-8 print-break">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h3 className="text-[24px] font-bold">판단을 가른 영역</h3><p className="mt-1 text-[16px] text-[#5B6680]">근로자 쪽으로 기운 정도가 큰 영역부터 보여드립니다.</p></div>
          <div className="flex gap-3 text-[14px] font-semibold text-[#3D4A63]">{[['근로자 쪽', '#a85a66'], ['중립', '#9a8468'], ['사업자 쪽', '#5a8f78']].map(([l, c]) => <span key={l} className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: c }} />{l}</span>)}</div>
        </div>
        <div className="mt-6 divide-y divide-[#E6EAF0]">{sorted.map((cs) => <CategoryAnalysisRow key={cs.id} cs={cs} />)}</div>
      </div>

      {/* 4. 사업주 부담 */}
      {verdict !== 'freelancer' && (
        <div className="rounded-[16px] bg-[#14213D] p-6 text-white md:p-8 print-break">
          <p className="text-[15px] font-bold text-[#80CBC4]">근로자로 판단되면</p>
          <h3 className="mt-1 text-[26px] font-bold leading-snug">사업주가 부담하게 되는 것</h3>
          <p className="mt-2 text-[16px] leading-[1.7] text-[#C9D1E0]">가장 먼저 돌아오는 것은 4대보험 소급분입니다. 지난 고용노동부 감독에서는 적발 사업장에 5억 2천만원이 소급 징수됐습니다.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {BURDEN.map(([t, d, law]) => (
              <div key={t} className="rounded-xl border border-[#3A4A6A] bg-[#1B2A4A] p-5">
                <p className="text-[19px] font-bold">{t}</p>
                <p className="mt-1.5 text-[16px] leading-[1.65] text-[#DCE4F2]">{d}</p>
                <p className="mt-2 text-[13px] font-semibold text-[#9AA9C7]">{law}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. 추정제 */}
      <div className="rounded-[16px] border border-[#EBD9B4] bg-[#FFFBF2] p-6 md:p-8 print-break">
        <span className="inline-block rounded-md bg-[#FDF3E2] px-2.5 py-1 text-[14px] font-bold text-[#9A5B00]">근로자 추정제 · 입법 전 국회 논의 중</span>
        <h3 className="mt-3 text-[22px] font-bold leading-snug">도입되면 회사가 "근로자가 아님"을 증명해야 합니다</h3>
        <p className="mt-2 text-[16px] leading-[1.7] text-[#3D4A63]">판례상 핵심 판단요소 5개 중 <b>{presumptionMet}개</b>가 근로자 쪽으로 충족됐습니다. 아래 지표는 법안의 추정 요건과 같지 않으며, 최종 내용은 입법 과정에서 달라질 수 있습니다.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {presumptionItems.map((p) => <span key={p.label} className={'rounded-lg border px-3 py-1.5 text-[15px] font-semibold ' + (p.met ? 'border-[#F1C5C5] bg-white text-[#9A2B2B]' : 'border-[#E6EAF0] bg-white text-[#8A94A6]')}>{p.met ? '충족' : '미충족'} · {p.label}</span>)}
        </div>
      </div>

      {/* 6. 전문가·제안 */}
      <div className="grid items-start gap-6 rounded-[16px] border border-[#DDE2EA] bg-[#F7F9FC] p-6 md:grid-cols-[150px_1fr] md:p-8 print-break">
        <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={150} height={195} className="h-[195px] w-[150px] rounded-xl object-cover" />
        <div>
          <p className="text-[15px] font-bold text-[#00796B]">이 결과를 함께 정리할 사람</p>
          <p className="mt-1 text-[26px] font-bold">대기업 인사팀 출신 노무사, 조대진</p>
          <p className="mt-1 text-[16px] text-[#5B6680]">공인노무사 16년 · 안전공학 박사 · 노무법인 위너스 · 현대카드·삼성서울병원 인사 출신</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-[#3D4A63]">카드모집인, 대출모집인, 병원 연구원, 방문 점검원, 헤어 디자이너, 헬스 트레이너까지 직군마다 다른 근로자성 쟁점을 직접 다뤄 왔습니다.</p>
          <div className="mt-4 border-t-2 border-[#14213D]">
            {[['1', '결과 검토', '진단 결과로 근로자성이 문제 될 인력과 기간을 정리합니다.'], ['2', '소급 부담 산정', '4대보험·퇴직금 등 과거분 규모와 정리 방안을 세웁니다.'], ['3', '계약 구조 정비', '실제 운영과 계약서가 맞도록 구조를 다시 설계합니다.']].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[36px_1fr] gap-2 border-b border-[#DDE2EA] py-3"><span className="text-[20px] font-extrabold text-[#00796B]">{n}</span><p className="text-[17px] leading-[1.6]"><b>{t}</b> — <span className="text-[#3D4A63]">{d}</span></p></div>
            ))}
          </div>
          <button type="button" onClick={goConsult} className="mt-5 inline-flex min-h-[60px] w-full items-center justify-center rounded-[12px] bg-[#1F4E79] px-7 text-[19px] font-bold text-white hover:bg-[#173B5C] md:w-auto">상담 신청서 작성하기 →</button>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5B6680]">진단 결과는 신청서에 자동으로 담깁니다. 상담은 유료 자문으로 진행되며, 신청서 확인 후 일정과 비용을 안내드립니다. 일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
        </div>
      </div>

      {/* 7. 후속 조치·증거 */}
      <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 md:p-8 print-break">
        <h3 className="text-[22px] font-bold">지금 할 수 있는 일</h3>
        <div className="mt-4 border-t-2 border-[#14213D]">{actions.map((a) => <div key={a.bold} className="border-b border-[#E6EAF0] py-3.5 text-[17px] leading-[1.65]"><b>{a.bold}</b> — <span className="text-[#3D4A63]">{a.detail}</span></div>)}</div>
        {percentage >= 40 && (<>
          <h4 className="mt-7 text-[19px] font-bold">근로감독·분쟁 대비 자료</h4>
          <div className="mt-3 border-t border-[#DDE2EA]">{EVIDENCE_ITEMS.map((e) => <div key={e.bold} className="border-b border-[#E6EAF0] py-3 text-[16px] leading-[1.65]"><b>{e.bold}</b> — <span className="text-[#3D4A63]">{e.detail}</span></div>)}</div>
        </>)}
      </div>

      {/* 8. 상세 */}
      <details className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 md:p-8">
        <summary className="cursor-pointer text-[19px] font-bold">문항별 상세 결과와 적용 판례 보기</summary>
        <div className="mt-5">
          {questionDetails.map(({ q, weighted, maxWeighted, barPct, chosen }) => (
            <div key={q.id} className="flex items-center justify-between gap-3 border-b border-[#E6EAF0] py-3 last:border-0">
              <div className="min-w-0 flex-1"><div className="text-[16px] font-semibold">{q.text}</div><div className="mt-0.5 text-[15px] text-[#5B6680]">{chosen}</div></div>
              <div className="h-2 w-20 shrink-0 overflow-hidden rounded-full bg-[#EEF1F5]"><div className="h-full rounded-full" style={{ width: `${barPct}%`, background: getBarColor(barPct) }} /></div>
              <div className="min-w-[64px] text-right text-[14px] font-semibold tabular-nums" style={{ color: getBarColor(barPct) }}>{weighted.toFixed(1)} / {maxWeighted.toFixed(1)}</div>
            </div>
          ))}
          <h4 className="mt-7 text-[19px] font-bold">적용 판례 및 법적 근거</h4>
          {LEGAL_REFERENCES.map((ref) => (
            <div key={ref.name} className="mt-3 rounded-xl border border-[#E6EAF0] bg-[#F7F9FC] px-4 py-3">
              <p className="text-[16px] font-bold"><span className="mr-2 rounded bg-white px-2 py-0.5 text-[13px] text-[#00695C] ring-1 ring-[#B2DFDB]">{ref.badge}</span>{ref.name}</p>
              <p className="mt-1 text-[15px] leading-[1.65] text-[#3D4A63]">{ref.summary}</p>
            </div>
          ))}
        </div>
      </details>

      <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 text-center no-print">
        <p className="mb-4 text-[16px] text-[#5B6680]">진단 요약 리포트를 이메일로 받아보실 수 있습니다.</p>
        <button type="button" onClick={() => setReportOpen(true)} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border-2 border-[#00796B]/35 bg-[#00796B]/[0.06] px-6 text-[17px] font-semibold text-[#00695C]"><Mail size={20} strokeWidth={2} aria-hidden /> 진단 결과 리포트 받기</button>
      </div>
      <ReportEmailModal open={reportOpen} onClose={() => setReportOpen(false)} result={result}
        onSuccess={() => setToast({ kind: 'ok', message: '리포트가 이메일로 발송됩니다 (영업일 1일 이내)' })}
        onError={() => setToast({ kind: 'err', message: '잠시 후 다시 시도해 주세요' })} />
      <ShareResultBar percentage={percentage} verdict={verdict} />
      <AnimatePresence>
        {toast ? (
          <motion.div key="result-toast" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }}
            className={`fixed bottom-24 left-1/2 z-[60] max-w-[min(92vw,22rem)] -translate-x-1/2 rounded-xl border px-4 py-3 text-center text-[15px] font-medium no-print ${toast.kind === 'ok' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <DisclaimerNotice variant="result" className="print-break" />
      <button type="button" onClick={onRestart} className="flex w-full items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#C9D1DC] bg-white py-3.5 text-[17px] font-bold text-[#3D4A63] no-print"><RotateCcw size={18} strokeWidth={1.75} /> 다시 진단하기</button>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DDE2EA] bg-white/95 backdrop-blur no-print">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <p className="text-[16px] font-bold">{text.title} <span className="font-normal text-[#5B6680]">· {percentage}점</span></p>
          <button type="button" onClick={goConsult} className="inline-flex h-[50px] shrink-0 items-center rounded-[10px] bg-[#1F4E79] px-5 text-[16px] font-bold text-white hover:bg-[#173B5C]">상담 신청서 작성</button>
        </div>
      </div>
    </div>
  )
}

function CategoryAnalysisRow({ cs }: { cs: CategoryScore }) {
  const [open, setOpen] = useState(false)
  const cases = getCategoryCaseReferences(cs.id)
  const barColor = getBarColor(cs.pct)
  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-3">
        <div className="flex-1 text-[18px] font-bold text-[#14213D]">{cs.name}</div>
        <div className="w-40 h-3.5 bg-[#EEF1F5] rounded-full overflow-hidden shrink-0">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cs.pct}%`, background: barColor }} />
        </div>
        <div className="text-[22px] font-extrabold min-w-[64px] text-right tabular-nums" style={{ color: barColor }}>
          {cs.pct}<span className="text-[14px] font-semibold">%</span>
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
