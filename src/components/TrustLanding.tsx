import { PROMISE } from './brand/brand'
import { Link } from 'react-router-dom'
import { CRACKDOWN_DATA, formatCrackdownDate } from '../data/crackdownData'

// 2026-10-31 색 정리: 남색·녹색 → 흑백+모카(#5C4733)
// 2026-10-18 RISK119 신뢰형 구성 적용 — 판례·법령·고용노동부 발표로 확인된 내용만 사용, 사업장 실명 미사용
const btnPrimary = 'inline-flex h-[60px] items-center justify-center rounded-[10px] bg-[#5C4733] px-8 text-[19px] font-bold text-white transition hover:bg-[#4A3929]'
const btnGhost = 'inline-flex h-[60px] items-center justify-center rounded-[10px] bg-[#111111] px-8 text-[19px] font-bold text-white transition hover:bg-[#333333]'

const JOBS = [
  { job: '카드모집인', point: '실적 수수료 구조인데 영업 목표·출근·교육 지시가 있는 경우' },
  { job: '대출모집인', point: '금융회사 위탁계약이지만 업무 방식과 실적 관리를 회사가 정하는 경우' },
  { job: '병원 연구원', point: '연구과제 계약 형식이지만 근무시간·장소와 업무 지시가 정해진 경우' },
  { job: '방문 점검원', point: '건별 수수료인데 점검 일정·구역 배정과 앱 업무 지시가 있는 경우' },
  { job: '헤어 디자이너', point: '매출 배분(수수료) 구조이지만 매장 출근·근무 규칙을 따르는 경우' },
  { job: '헬스 트레이너', point: '수업료 배분 계약이지만 수업 배정·회원 관리·근무시간 지시가 있는 경우' },
]



export default function TrustLanding() {
  const s = CRACKDOWN_DATA.summary
  return (
    <div className="bg-white text-[#111111] [word-break:keep-all]">
      {/* 히어로 */}
      <section className="py-14 md:py-[72px]">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-6 md:grid-cols-[1.25fr_0.9fr] md:gap-14 md:px-8">
          <div>
            <p className="text-[17px] font-bold text-[#5C4733]">대법원 판례 기준 · 5개 영역 19문항 · 약 5분</p>
            <h1 className="mt-3.5 text-[38px] font-bold leading-[1.28] tracking-[-1px] md:text-[50px] md:tracking-[-1.2px]">
              프리랜서 계약서가 있어도,<br />일하는 방식이 근로자라면<br />근로자입니다
            </h1>
            <p className="mt-6 max-w-[560px] text-[19px] leading-[1.75] text-[#333333] md:text-[20px]">
              대법원이 보는 5가지 기준으로, 3.3% 계약 인력이 근로자로 판단될지 5분 만에 점검합니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/diagnosis" className={btnPrimary}>진단 시작하기 →</Link>
              <Link to="/consult" className={btnGhost}>상담 신청</Link>
            </div>
            <p className="mt-5 text-[16px] text-[#666666]">{PROMISE}</p>
          </div>
          {/* 2026-10-31 lean: 진단에서 드리는 것 / 상담에서 하는 것 */}
          <div className="self-start border border-[#111111] bg-white">
            <div className="border-b border-[#E6E6E6] px-6 py-5">
              <p className="text-[15px] font-bold text-[#5C4733]">진단에서 바로 확인</p>
              <ul className="mt-2 space-y-1.5 text-[17px] leading-[1.6]"><li>근로자성 점수와 판단</li><li>판단을 가른 영역과 근거 판례</li><li>메일 리포트</li></ul>
            </div>
            <div className="bg-[#F5F5F4] px-6 py-5">
              <p className="text-[15px] font-bold text-[#666666]">상담에서 함께</p>
              <ul className="mt-2 space-y-1.5 text-[17px] leading-[1.6] text-[#333333]"><li>4대보험·퇴직금 소급 규모 산정</li><li>계약 구조와 운영 방식 재설계</li><li>감독·분쟁 대비 자료 정리</li></ul>
            </div>
            <p className="border-t border-[#E6E6E6] px-6 py-3 text-[14px] text-[#666666]">지난 기획감독 {s.inspected}곳 중 {s.violated}곳 적발 · <a href={CRACKDOWN_DATA.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">고용노동부 {formatCrackdownDate(CRACKDOWN_DATA.updatedAt)}</a></p>
          </div>
        </div>
      </section>


      {/* 전문가 */}
      <section id="expert" className="border-t border-[#E6E6E6] bg-[#F5F5F4] py-10 md:py-14">
        <div className="mx-auto grid max-w-[1120px] items-start gap-10 px-6 md:grid-cols-[260px_1fr] md:gap-14 md:px-8">
          <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={260} height={338} className="h-[338px] w-[260px] rounded-xl object-cover" />
          <div>
            <p className="text-[17px] font-bold text-[#5C4733]">이 진단을 설계한 사람</p>
            <h2 className="mt-2 text-[32px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]">대기업 인사팀 출신 노무사, 조대진</h2>
            <p className="mt-1 text-[18px] font-semibold text-[#666666]">공인노무사 16년 · 안전공학 박사</p>
            <p className="mt-2 text-[20px] font-semibold leading-[1.6] md:text-[22px]">“근로자성은 계약서가 아니라 매일의 업무 지시와 보수 구조에서 드러납니다.”</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#E6E6E6] bg-white p-6">
                <p className="text-[15px] font-bold text-[#5C4733]">대기업 근로감독, 매년 실전 대응</p>
                <p className="mt-2 text-[17px] leading-[1.7] text-[#333333]">해마다 근로감독에 대응하며, 감독관이 위장고용을 확인하는 방식을 현장에서 봐 왔습니다.</p>
              </div>
              <div className="rounded-xl border border-[#E6E6E6] bg-white p-6">
                <p className="text-[15px] font-bold text-[#5C4733]">금융·IT·보건의료·제조 자문사와 함께</p>
                <p className="mt-2 text-[17px] leading-[1.7] text-[#333333]">업종마다 다른 프리랜서·위탁 구조를 자문하며 확인한 쟁점을 문항에 담았습니다.</p>
              </div>
            </div>
            <details className="mt-6 rounded-xl border border-[#E6E6E6] bg-white">
              <summary className="flex min-h-[52px] cursor-pointer list-none flex-col justify-center gap-1 px-5 py-3 md:flex-row md:items-center md:justify-between">
                <span className="text-[17px] font-bold text-[#111111]">근로자성 쟁점을 직접 다뤄 온 직군 6종</span>
                <span className="text-[15px] text-[#666666]">{JOBS.map((j) => j.job).join(' · ')} ▾</span>
              </summary>
              <div className="border-t border-[#E6E6E6] px-5 pb-4">
                <p className="pt-3 text-[15px] text-[#666666]">같은 프리랜서 계약도 직군마다 근로자성이 갈리는 지점이 다릅니다. 이 경험이 진단 문항의 바탕입니다.</p>
                {JOBS.map((j) => (
                  <div key={j.job} className="grid gap-1 border-b border-[#F2F2F0] py-3 last:border-b-0 md:grid-cols-[140px_1fr] md:gap-4">
                    <p className="text-[17px] font-bold text-[#111111]">{j.job}</p>
                    <p className="text-[15px] leading-[1.6] text-[#333333]">{j.point}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

    </div>
  )
}
