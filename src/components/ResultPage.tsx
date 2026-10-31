import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CategoryScore, DiagnosisResult } from '../types'
import { CATEGORIES, getCategoryCaseReferences } from '../data/questions'
import { LEGAL_REFERENCES } from '../data/legal-refs'
import { getVerdictText, getBarColor } from '../utils/scoring'
import { useNavigate } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import DisclaimerNotice from './DisclaimerNotice'
import ReportEmailModal from './ReportEmailModal'
import ShareResultBar from './ShareResultBar'
import ResultSheet from './brand/ResultSheet'
import ReportRequest from './ReportRequest'

// 2026-10-18 RISK119 결과 화면 구성 준용 — 법령·판례·고용노동부 발표로 확인된 내용만 사용
interface Props { result: DiagnosisResult; onRestart: () => void }

export default function ResultPage({ result, onRestart }: Props) {
  const navigate = useNavigate()
  const [reportOpen, setReportOpen] = useState(false)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; message: string } | null>(null)
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 4500); return () => window.clearTimeout(t) }, [toast])

  const { percentage: rawPct, verdict, categoryScores, answers } = result
  const percentage = Math.round(rawPct)
  const text = getVerdictText(verdict)
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
      <div className="flex flex-col items-start gap-3 border border-[#E6E6E6] bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6 no-print">
        <p className="text-[17px] leading-[1.6] text-[#374151]">이 결과지를 바탕으로 계약 구조와 소급 부담을 함께 정리합니다. 상담은 유료 자문입니다.</p>
        <button type="button" onClick={goConsult} className="inline-flex min-h-[54px] shrink-0 items-center bg-[#111] px-6 text-[18px] font-bold text-white hover:bg-[#333]">상담 신청서 작성</button>
      </div>
      {/* 3. 판단을 가른 영역 */}
      <div className="border border-[#E6E6E6] bg-white p-6 md:p-8 print-break">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h3 className="text-[24px] font-bold">판단을 가른 영역</h3><p className="mt-1 text-[16px] text-[#5B6680]">근로자 쪽으로 기운 정도가 큰 영역부터 보여드립니다.</p></div>
          
        </div>
        <div className="mt-6 divide-y divide-[#E6EAF0]">{sorted.map((cs) => <CategoryAnalysisRow key={cs.id} cs={cs} />)}</div>
      </div>

      {/* 2026-10-29 리포트 받기 (기존 노션 전송 모달 대체) */}
      <div className="-mx-4 md:mx-0"><ReportRequest site="free" answers={result.answers} tallyUrl={`/consult?s=${percentage}&g=${encodeURIComponent(text.title)}`} color="#5C4733" /></div>

      {/* 6. 전문가·제안 */}
      <div className="grid items-start gap-6 border border-[#E6E6E6] bg-[#F5F5F4] p-6 md:grid-cols-[150px_1fr] md:p-8 print-break">
        <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={150} height={195} className="h-[156px] w-[120px] object-cover" />
        <div>
          <p className="text-[15px] font-bold text-[#5C4733]">이 결과를 함께 정리할 사람</p>
          <p className="mt-1 text-[26px] font-bold">대기업 인사팀 출신 노무사, 조대진</p>
          <p className="mt-1 text-[16px] text-[#5B6680]">공인노무사 16년 · 안전공학 박사 · 노무법인 위너스 · 현대카드·삼성서울병원 인사 출신</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-[#3D4A63]">카드모집인, 대출모집인, 병원 연구원, 방문 점검원, 헤어 디자이너, 헬스 트레이너까지 직군마다 다른 근로자성 쟁점을 직접 다뤄 왔습니다.</p>
          <div className="mt-4 border-t border-[#111]">
            {[['1', '결과 검토', '진단 결과로 근로자성이 문제 될 인력과 기간을 정리합니다.'], ['2', '소급 부담 산정', '4대보험·퇴직금 등 과거분 규모와 정리 방안을 세웁니다.'], ['3', '계약 구조 정비', '실제 운영과 계약서가 맞도록 구조를 다시 설계합니다.']].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[36px_1fr] gap-2 border-b border-[#DDE2EA] py-3"><span className="text-[20px] font-extrabold text-[#5C4733]">{n}</span><p className="text-[17px] leading-[1.6]"><b>{t}</b> — <span className="text-[#3D4A63]">{d}</span></p></div>
            ))}
          </div>
          <button type="button" onClick={goConsult} className="mt-5 inline-flex min-h-[60px] w-full items-center justify-center bg-[#111] px-7 text-[19px] font-bold text-white hover:bg-[#333] md:w-auto">상담 신청서 작성하기 →</button>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5B6680]">진단 결과는 신청서에 자동으로 담깁니다. 상담은 유료 자문으로 진행되며, 신청서 확인 후 일정과 비용을 안내드립니다. 일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
        </div>
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
              <p className="text-[16px] font-bold"><span className="mr-2 rounded bg-white px-2 py-0.5 text-[13px] text-[#244A40] ring-1 ring-[#B2DFDB]">{ref.badge}</span>{ref.name}</p>
              <p className="mt-1 text-[15px] leading-[1.65] text-[#3D4A63]">{ref.summary}</p>
            </div>
          ))}
        </div>
      </details>

      <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 text-center no-print">
        <p className="mb-4 text-[16px] text-[#5B6680]">진단 요약 리포트를 이메일로 받아보실 수 있습니다.</p>
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
      {/* 2026-10-31 읽기 쉽게: 이름·숫자 한 줄, 막대는 아래 전체 폭, 근로자 쪽으로 기운 영역만 사이트색 */}
      <div className="pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-3">
          <div className={'min-w-0 text-[18px] ' + (cs.pct >= 65 ? 'font-extrabold text-[#111]' : 'font-semibold text-[#333]')}>{cs.name}</div>
          <div className="shrink-0 text-[22px] font-extrabold tabular-nums text-[#5C4733]" data-bar={barColor}>{cs.pct}<span className="text-[14px] font-semibold">%</span></div>
        </div>
        <div className="mt-2.5 h-[8px] bg-[#EEEEEE]"><div className="h-full" style={{ width: `${Math.max(cs.pct, 2)}%`, background: cs.pct >= 65 ? '#5C4733' : '#A39A8A' }} /></div>
      </div>
      {cases.length > 0 ? (
        <div className="pb-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[40px] items-center gap-1 text-[15px] font-semibold text-[#5C4733]"
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
}      {/* 6. 전문가·제안 */}
      <div className="grid items-start gap-6 border border-[#E6E6E6] bg-[#F5F5F4] p-6 md:grid-cols-[150px_1fr] md:p-8 print-break">
        <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={150} height={195} className="h-[156px] w-[120px] object-cover" />
        <div>
          <p className="text-[15px] font-bold text-[#5C4733]">이 결과를 함께 정리할 사람</p>
          <p className="mt-1 text-[26px] font-bold">대기업 인사팀 출신 노무사, 조대진</p>
          <p className="mt-1 text-[16px] text-[#5B6680]">공인노무사 16년 · 안전공학 박사 · 노무법인 위너스 · 현대카드·삼성서울병원 인사 출신</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-[#3D4A63]">카드모집인, 대출모집인, 병원 연구원, 방문 점검원, 헤어 디자이너, 헬스 트레이너까지 직군마다 다른 근로자성 쟁점을 직접 다뤄 왔습니다.</p>
          <div className="mt-4 border-t border-[#111]">
            {[['1', '결과 검토', '진단 결과로 근로자성이 문제 될 인력과 기간을 정리합니다.'], ['2', '소급 부담 산정', '4대보험·퇴직금 등 과거분 규모와 정리 방안을 세웁니다.'], ['3', '계약 구조 정비', '실제 운영과 계약서가 맞도록 구조를 다시 설계합니다.']].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[36px_1fr] gap-2 border-b border-[#DDE2EA] py-3"><span className="text-[20px] font-extrabold text-[#5C4733]">{n}</span><p className="text-[17px] leading-[1.6]"><b>{t}</b> — <span className="text-[#3D4A63]">{d}</span></p></div>
            ))}
          </div>
          <button type="button" onClick={goConsult} className="mt-5 inline-flex min-h-[60px] w-full items-center justify-center bg-[#111] px-7 text-[19px] font-bold text-white hover:bg-[#333] md:w-auto">상담 신청서 작성하기 →</button>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5B6680]">진단 결과는 신청서에 자동으로 담깁니다. 상담은 유료 자문으로 진행되며, 신청서 확인 후 일정과 비용을 안내드립니다. 일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
        </div>
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
              <p className="text-[16px] font-bold"><span className="mr-2 rounded bg-white px-2 py-0.5 text-[13px] text-[#244A40] ring-1 ring-[#B2DFDB]">{ref.badge}</span>{ref.name}</p>
              <p className="mt-1 text-[15px] leading-[1.65] text-[#3D4A63]">{ref.summary}</p>
            </div>
          ))}
        </div>
      </details>

      <div className="rounded-[16px] border border-[#DDE2EA] bg-white p-6 text-center no-print">
        <p className="mb-4 text-[16px] text-[#5B6680]">진단 요약 리포트를 이메일로 받아보실 수 있습니다.</p>
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
      {/* 2026-10-31 읽기 쉽게: 이름·숫자 한 줄, 막대는 아래 전체 폭, 근로자 쪽으로 기운 영역만 사이트색 */}
      <div className="pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-3">
          <div className={'min-w-0 text-[18px] ' + (cs.pct >= 65 ? 'font-extrabold text-[#111]' : 'font-semibold text-[#333]')}>{cs.name}</div>
          <div className="shrink-0 text-[22px] font-extrabold tabular-nums text-[#5C4733]" data-bar={barColor}>{cs.pct}<span className="text-[14px] font-semibold">%</span></div>
        </div>
        <div className="mt-2.5 h-[8px] bg-[#EEEEEE]"><div className="h-full" style={{ width: `${Math.max(cs.pct, 2)}%`, background: cs.pct >= 65 ? '#5C4733' : '#A39A8A' }} /></div>
      </div>
      {cases.length > 0 ? (
        <div className="pb-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[40px] items-center gap-1 text-[15px] font-semibold text-[#5C4733]"
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
