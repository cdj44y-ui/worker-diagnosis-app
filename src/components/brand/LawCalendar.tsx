import { SITE_COLOR, VERIFIED_DATE } from './brand'

/** D3 법 개정 한 장 — 네 사이트 공통 데이터·모양 */
const ROWS: { d: string; s: string; tone: 'now' | 'next' | 'pre'; t: string; law: string }[] = [
  { d: '2026.10.08', s: '시행', tone: 'now', t: '임금 정기지급·체불 등 위반 처벌 상향(3년·3천만원 → 5년·5천만원)', law: '근로기준법 제107조(법률 제21533호)' },
  { d: '2026.10.01', s: '국회 통과 · 공포 전', tone: 'pre', t: '반복 산재 사망 사업장 영업이익 최대 5% 과징금', law: '산업안전보건법 개정안' },
  { d: '2026.12.08', s: '시행 예정', tone: 'next', t: '근로감독관 명칭 → 노동감독관', law: '근로기준법 제101조(법률 제21533호)' },
  { d: '2027.01.01', s: '시행 예정', tone: 'next', t: '위험성평가 미이행 과태료(상시 50명 이상, 건설업 공사금액 50억원 이상)', law: '산업안전보건법 제175조, 시행령 [별표 35]' },
  { d: '2027.01.08', s: '시행 예정', tone: 'next', t: '외국인 근로자 기초안전보건교육 의무화', law: '산업안전보건법 제31조의2' },
  { d: '2028.01.01', s: '시행 예정', tone: 'next', t: '위험성평가 미이행 과태료(상시 50명 미만)', law: '산업안전보건법 제175조, 시행령 [별표 35]' },
  { d: '입법 전', s: '국회 계류', tone: 'pre', t: '근로자 추정제(일하는 사람을 근로자로 추정, 반증 책임은 사업주)', law: '근로기준법 개정안(2025.12.24 발의 등)' },
]

export default function LawCalendar() {
  return (
    <section className="border-t border-[#E5E7EB] bg-white py-16 text-[#111827] md:py-[88px] [word-break:keep-all]">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]">앞으로 달라지는 노동·안전 법령</h2>
        <p className="mt-2.5 text-[17px] text-[#6B7280]">국가법령정보센터 원문 대조 {VERIFIED_DATE} · 시행 전 법령은 시행일 표기</p>
        <div className="mt-9 border-t-2 border-[#111827]">
          {ROWS.map((r) => (
            <div key={r.d + r.t} className="grid gap-1.5 border-b border-[#E5E7EB] py-5 md:grid-cols-[140px_150px_1fr] md:items-baseline md:gap-6">
              <p className="text-[19px] font-bold tabular-nums">{r.d}</p>
              <p className="text-[15px] font-bold" style={{ color: r.tone === 'now' ? '#111827' : r.tone === 'next' ? SITE_COLOR : '#6B7280' }}>{r.s}</p>
              <div>
                <p className="text-[18px] font-semibold leading-[1.55]">{r.t}</p>
                <p className="mt-0.5 text-[15px] text-[#6B7280]">{r.law}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
