import type { DiagnosisResult } from '../../types'
import { CATEGORIES } from '../../data/questions'
import { SITE_NAME, SITE_COLOR, VERIFIED_DATE, KAKAO_CHANNEL_URL } from './brand'

/** A4 결과지 — 네 사이트 공통 형식(①결론 ②먼저 고칠 3가지 ③항목별 근거 ④확인 필요 ⑤다음 점검일). 인쇄·PDF 없음 */
interface Props { result: DiagnosisResult; title: string; percentage: number }

const pad = (n: number) => String(n).padStart(2, '0')
const fmt = (d: Date) => `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
const ymd = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`

const FIX: Record<string, string> = {
  subordination: '업무 내용·방법을 누가 정하는지, 실제 지시·보고 방식을 계약 구조와 맞춰 점검하십시오.',
  time_place: '출퇴근 시간·근무 장소 지정이 실제로 있는지 확인하고, 근로자로 처우할지 함께 검토하십시오.',
  economic: '보수 결정 방식과 소득 의존도를 점검하고, 근로자로 판단될 경우의 소급 부담을 미리 확인하십시오.',
  platform: '앱·평가·페널티를 통한 간접 통제와 중간업체 구조 뒤의 실질 사용자를 점검하십시오.',
  formal: '계약서 명칭·3.3% 처리만으로는 근로자성이 부정되지 않으므로, 실제 운영과 함께 정비하십시오.',
}

function Head({ no, title, right }: { no: string; title: string; right?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="text-[18px] font-bold text-[#111827]"><span className="mr-1.5" style={{ color: SITE_COLOR }}>{no}</span>{title}</h3>
      {right ? <span className="text-[14px] text-[#6B7280]">{right}</span> : null}
    </div>
  )
}

export default function ResultSheet({ result, title, percentage }: Props) {
  const today = new Date()
  const next = new Date(today); next.setMonth(next.getMonth() + 6)
  const catOf = (qid: string) => CATEGORIES.find((c) => c.questions.some((q) => q.id === qid))

  const rows = CATEGORIES.flatMap((c) => c.questions.map((q) => {
    const idx = result.answers[q.id]
    const opt = idx !== undefined ? q.options[idx] : undefined
    return { c, q, opt, w: opt ? opt.score * q.weight : 0 }
  }))
  const fixes = rows.filter((r) => r.opt && r.opt.score >= 3.5).sort((a, b) => b.w - a.w).slice(0, 3)
  const unsure = rows.filter((r) => r.opt && r.opt.tag === '해당없음')
  const shortTitle = (t: string) => t.replace(/ \(.*\)$/, '')

  const downloadIcs = () => {
    const d = ymd(next)
    const e = new Date(next); e.setDate(e.getDate() + 1)
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Winners//119//KO', 'BEGIN:VEVENT',
      `UID:${SITE_NAME}-${d}-${Date.now()}@free119.site`, `DTSTAMP:${ymd(today)}T000000Z`,
      `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${ymd(e)}`,
      `SUMMARY:${SITE_NAME} 반기 재진단`, 'DESCRIPTION:같은 문항으로 다시 점검하면 달라진 점을 바로 확인할 수 있습니다. https://free119.site/diagnosis',
      'URL:https://free119.site/diagnosis', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
    const a = document.createElement('a'); a.href = url; a.download = 'free119-recheck.ics'; a.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const sec = 'border-t border-[#E5E7EB] pt-6 mt-6'
  return (
    <section className="rounded-[12px] border border-[#D1D5DB] bg-white p-5 text-[17px] leading-[1.7] text-[#374151] md:p-8 [word-break:keep-all]" aria-label="진단 결과지">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[22px] font-bold text-[#111827]">{SITE_NAME} 진단 결과지</h2>
        <p className="text-[15px] text-[#6B7280]">진단일 {fmt(today)}</p>
      </div>

      <div className="mt-6">
        <Head no="①" title="결론" />
        <p className="mt-2 text-[22px] font-bold text-[#111827]">{title} <span style={{ color: SITE_COLOR }}>({percentage}점)</span></p>
        <p className="text-[15px] text-[#6B7280]">100점에 가까울수록 근로자로 판단될 가능성이 큽니다.</p>
      </div>

      <div className={sec}>
        <Head no="②" title="먼저 고칠 3가지" />
        {fixes.length === 0 ? <p className="mt-2">지금 응답 기준으로 급히 고칠 항목은 없습니다.</p> : (
          <ol className="mt-3 space-y-3">
            {fixes.map((f, i) => (
              <li key={f.q.id} className="grid grid-cols-[24px_1fr] gap-2">
                <b style={{ color: SITE_COLOR }}>{i + 1}</b>
                <div>
                  <p className="font-semibold text-[#111827]">{f.q.text} <span className="font-normal text-[#6B7280]">— {f.opt?.label}</span></p>
                  <p>{FIX[catOf(f.q.id)?.id ?? ''] ?? '근로자 쪽으로 기우는 요소입니다. 실제 운영을 계약 구조와 맞춰 점검하십시오.'}</p>
                  <p className="text-[14px] text-[#6B7280]">근거: {f.q.refs.join(', ')}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className={sec}>
        <Head no="③" title="항목별 근거" right={`원문 대조일 ${VERIFIED_DATE}`} />
        <div className="mt-3 divide-y divide-[#E5E7EB]">
          {result.categoryScores.map((cs) => {
            const cat = CATEGORIES.find((c) => c.id === cs.id)
            const refs = cat ? [...new Set(cat.questions.flatMap((q) => q.refs))].slice(0, 3) : []
            return (
              <div key={cs.id} className="grid gap-1 py-3 md:grid-cols-[1fr_auto] md:gap-6">
                <div>
                  <p className="font-semibold text-[#111827]">{shortTitle(cs.name)}</p>
                  <p className="text-[15px] text-[#6B7280]">{refs.join(' · ')}</p>
                </div>
                <p className="font-bold tabular-nums md:text-right">근로자 쪽 {cs.pct}%</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className={sec}>
        <Head no="④" title="확인 필요" />
        <ul className="mt-2 space-y-1.5">
          {unsure.map((u) => <li key={u.q.id}>· {u.q.text} — '해당 없음'으로 답해 판단에서 제외했습니다. 실제 운영을 확인해 주십시오.</li>)}
          <li>· 근로자 추정제는 입법 전(국회 계류)입니다. 통과되면 근로자가 아님을 회사가 증명해야 할 수 있습니다.</li>
        </ul>
      </div>

      <div className={sec}>
        <Head no="⑤" title="다음 점검일" />
        <p className="mt-2 text-[20px] font-bold text-[#111827]">{fmt(next)}</p>
        <p>결과는 저장되지 않습니다. 6개월 뒤 같은 문항으로 다시 점검하시면 달라진 점을 바로 확인할 수 있습니다.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button type="button" onClick={downloadIcs} className="inline-flex min-h-[48px] items-center rounded-[10px] border border-[#D1D5DB] bg-white px-5 text-[16px] font-bold text-[#111827] hover:border-[#111827]">캘린더에 추가</button>
          <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center rounded-[10px] bg-[#FEE500] px-5 text-[16px] font-bold text-[#391B1B] hover:bg-[#F5D800]">법 바뀌기 전에 먼저 알기</a>
        </div>
      </div>

      <p className="mt-8 border-t border-[#E5E7EB] pt-5 text-center text-[15px] font-semibold text-[#6B7280]">형식은 같고, 내용은 귀사뿐입니다</p>
    </section>
  )
}
