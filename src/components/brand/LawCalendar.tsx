import { useEffect, useState } from 'react'
import { SITE_COLOR, VERIFIED_DATE } from './brand'

/** D3 법 개정 한 장 — 단일 소스: https://win119.site/data/law-changes.json (실패 시 아래 기본값 사용) */
type Row = { d: string; s: string; tone: 'now' | 'next' | 'pre'; t: string; law: string }
const ROWS: Row[] = [
  { d: '2026.10.08', s: '시행', tone: 'now', t: '임금 정기지급·체불 등 위반 처벌 상향(3년·3천만원 → 5년·5천만원)', law: '근로기준법 제107조(법률 제21533호)' },
  { d: '2026.12.08', s: '시행 예정', tone: 'next', t: '근로감독관 명칭 → 노동감독관', law: '근로기준법 제101조(법률 제21533호)' },
  { d: '입법 전', s: '국회 계류', tone: 'pre', t: '근로자 추정제(일하는 사람을 근로자로 추정, 반증 책임은 사업주)', law: '근로기준법 개정안(2025.12.24 발의 등)' },
]

type Item = { date?: string; status?: string; title?: string; basis?: string; sites?: string[] }

function toTone(status: string): Row['tone'] {
  if (status === '시행') return 'now'
  if (status.includes('예정')) return 'next'
  return 'pre'
}

export default function LawCalendar() {
  const [rows, setRows] = useState<Row[]>(ROWS)
  const [verified, setVerified] = useState<string>(VERIFIED_DATE)

  useEffect(() => {
    let alive = true
    fetch('https://win119.site/data/law-changes.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http'))))
      .then((json: { verifiedAt?: string; items?: Item[] }) => {
        const items = (json.items || []).filter((i) => i.sites?.includes('free') && i.date && i.title)
        if (!alive || items.length === 0) return
        setRows(items.map((i) => ({ d: i.date as string, s: i.status || '', tone: toTone(i.status || ''), t: i.title as string, law: i.basis || '' })))
        if (json.verifiedAt) setVerified(json.verifiedAt)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="border-t border-[#E5E7EB] bg-white py-6 text-[#111827] md:py-8 [word-break:keep-all]">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <details id="law-calendar">
          <summary className="flex min-h-[48px] cursor-pointer items-center text-[19px] font-bold leading-[1.4] md:text-[22px]">
            앞으로 달라지는 노동·안전 법령 · {rows.length}건 (원문 대조 {verified})
          </summary>
          <p className="mt-2 text-[16px] text-[#6B7280]">국가법령정보센터 원문 대조 · 시행 전 법령은 시행일 표기</p>
          <div className="mt-4 border-t-2 border-[#111827]">
            {rows.map((r) => (
              <div key={r.d + r.t} className="grid gap-1.5 border-b border-[#E5E7EB] py-4 md:grid-cols-[140px_150px_1fr] md:items-baseline md:gap-6">
                <p className="text-[18px] font-bold tabular-nums">{r.d}</p>
                <p className="text-[15px] font-bold" style={{ color: r.tone === 'now' ? '#111827' : r.tone === 'next' ? SITE_COLOR : '#6B7280' }}>{r.s}</p>
                <div>
                  <p className="text-[17px] font-semibold leading-[1.55]">{r.t}</p>
                  <p className="mt-0.5 text-[15px] text-[#6B7280]">{r.law}</p>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
