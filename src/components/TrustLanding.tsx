import { Link } from 'react-router-dom'
import { CRACKDOWN_DATA, formatCrackdownDate } from '../data/crackdownData'

// 2026-10-18 RISK119 신뢰형 구성 적용 — 판례·법령·고용노동부 발표로 확인된 내용만 사용, 사업장 실명 미사용
const btnPrimary = 'inline-flex h-[60px] items-center justify-center rounded-[10px] bg-[#3182F6] px-8 text-[19px] font-bold text-white transition hover:bg-[#1B64DA]'
const btnGhost = 'inline-flex h-[60px] items-center justify-center rounded-[10px] border-[1.5px] border-[#14213D] bg-white px-8 text-[19px] font-bold text-[#14213D] transition hover:bg-[#F5F7FA]'

const FIVE = [
  { no: '1', t: '사용종속성 (지휘·감독)', d: '업무 내용을 누가 정하고, 일하는 과정에서 구체적인 지시·감독을 받는지 봅니다.', c: '대법원 94다22859 · 2004다29736' },
  { no: '2', t: '시간·장소 구속', d: '출퇴근 시간과 근무 장소를 회사가 정하고 지키게 하는지 봅니다.', c: '대법원 2015두38092' },
  { no: '3', t: '경제적 종속성', d: '보수를 누가 어떻게 정하는지, 소득을 한 곳에 의존하는지 봅니다.', c: '대법원 2020다267491' },
  { no: '4', t: '플랫폼·간접 통제', d: '앱·알고리즘·평가를 통한 통제와 중간업체 구조 뒤의 실질 사용자를 봅니다.', c: '대법원 2024두32973' },
  { no: '5', t: '형식적 지표', d: '계약서 명칭, 3.3% 원천징수, 4대보험 미가입만으로 근로자성을 부정하지 않습니다.', c: '대법원 2021도11675' },
]

const DUTIES = [
  ['퇴직금', '계속근로 1년에 30일분 이상의 평균임금', '근로자퇴직급여 보장법 제8조'],
  ['연차휴가', '1년간 80% 이상 출근 시 15일의 유급휴가', '근로기준법 제60조'],
  ['가산수당', '연장근로에 통상임금의 50% 이상 가산', '근로기준법 제56조'],
  ['해고 제한', '정당한 이유 없는 해고 금지, 3개월 이내 노동위원회 구제신청', '근로기준법 제23조, 제28조'],
  ['과거분', '임금·퇴직금 채권은 3년간 행사 가능', '근로기준법 제49조, 근로자퇴직급여 보장법 제10조'],
]

export default function TrustLanding() {
  const s = CRACKDOWN_DATA.summary
  return (
    <div className="bg-white text-[#14213D] [word-break:keep-all]">
      <div className="border-b border-[#DDE2EA] bg-[#F5F7FA] text-[15px] text-[#5B6680]">
        <div className="mx-auto flex h-11 max-w-[1120px] items-center justify-between px-6 md:px-8">
          <span>노무법인 위너스가 운영하는 <b className="text-[#14213D]">근로자성 자가진단</b> 서비스</span>
          <span className="hidden md:inline">상담은 신청서 접수 후 순차적으로 안내드립니다</span>
        </div>
      </div>

      {/* 히어로 */}
      <section className="py-14 md:py-[72px]">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-6 md:grid-cols-[1.25fr_0.9fr] md:gap-14 md:px-8">
          <div>
            <p className="text-[17px] font-bold text-[#3182F6]">대법원 판례 기준 · 5개 영역 19문항 · 약 5분</p>
            <h1 className="mt-3.5 text-[38px] font-bold leading-[1.28] tracking-[-1px] md:text-[50px] md:tracking-[-1.2px]">
              프리랜서 계약서가 있어도,<br />일하는 방식이 근로자라면<br />근로자입니다
            </h1>
            <p className="mt-6 max-w-[560px] text-[19px] leading-[1.75] text-[#3D4A63] md:text-[20px]">
              대법원은 계약서 이름이 아니라 실제로 어떻게 일하는지를 봅니다. 3.3%로 계약한 인력이 법적으로 근로자인지, 판례가 쓰는 판단요소 그대로 점검합니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/diagnosis" className={btnPrimary}>무료로 진단 시작하기 →</Link>
              <Link to="/consult" className={btnGhost}>상담 신청서 작성</Link>
            </div>
            <p className="mt-5 text-[16px] text-[#5B6680]">회원가입 없음 · 입력 내용은 서버에 저장되지 않습니다</p>
          </div>
          <div className="self-start overflow-hidden rounded-[14px] border border-[#DDE2EA]">
            <div className="flex justify-between bg-[#14213D] px-6 py-[18px] text-[16px] font-semibold text-white">
              <span>가짜 3.3% 기획감독 결과</span><span>{formatCrackdownDate(CRACKDOWN_DATA.updatedAt)} 발표</span>
            </div>
            <div className="px-6 py-[26px]">
              <p className="text-[38px] font-extrabold leading-[1.2] tracking-[-1px] md:text-[42px]">
                {s.inspected}곳 감독,<br /><span className="text-[#B42318]">{s.violated}곳 적발</span>
              </p>
              <div className="mt-5 grid grid-cols-2 border-t border-[#DDE2EA] pt-4">
                <div><p className="text-[28px] font-extrabold">{s.affectedWorkers.toLocaleString('ko-KR')}명</p><p className="text-[15px] text-[#5B6680]">관련 근로자</p></div>
                <div><p className="text-[28px] font-extrabold">{(s.unpaidWages / 100000000).toFixed(2)}억 원</p><p className="text-[15px] text-[#5B6680]">체불 적발 금액</p></div>
              </div>
              <p className="mt-4 text-[16px] leading-[1.65] text-[#3D4A63]">{CRACKDOWN_DATA.followUp.text}</p>
              <p className="mt-4 border-t border-[#DDE2EA] pt-3 text-[14px] text-[#5B6680]">출처: {CRACKDOWN_DATA.source} ({formatCrackdownDate(CRACKDOWN_DATA.updatedAt)}, 후속조치 {formatCrackdownDate(CRACKDOWN_DATA.followUp.date)})</p>
            </div>
          </div>
        </div>
      </section>

      {/* 전문가 */}
      <section id="expert" className="border-t border-[#DDE2EA] bg-[#F5F7FA] py-16 md:py-[88px]">
        <div className="mx-auto grid max-w-[1120px] items-start gap-10 px-6 md:grid-cols-[260px_1fr] md:gap-14 md:px-8">
          <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={260} height={338} className="h-[338px] w-[260px] rounded-xl object-cover" />
          <div>
            <p className="text-[17px] font-bold text-[#3182F6]">이 진단을 설계한 사람</p>
            <h2 className="mt-2 text-[32px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]">조대진 대표노무사</h2>
            <p className="mt-2 text-[20px] font-semibold leading-[1.6] md:text-[22px]">“근로자성은 계약서가 아니라 매일의 업무 지시와 보수 구조에서 드러납니다.”</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#DDE2EA] bg-white p-6">
                <p className="text-[15px] font-bold text-[#3182F6]">대기업 근로감독, 매년 실전 대응</p>
                <p className="mt-2 text-[17px] leading-[1.7] text-[#3D4A63]">해마다 돌아오는 근로감독을 현장에서 대응하며 감독관이 위장고용을 어떻게 확인하는지 경험해 왔습니다.</p>
              </div>
              <div className="rounded-xl border border-[#DDE2EA] bg-white p-6">
                <p className="text-[15px] font-bold text-[#3182F6]">금융·IT·보건의료·제조 자문사와 함께</p>
                <p className="mt-2 text-[17px] leading-[1.7] text-[#3D4A63]">업종마다 다른 프리랜서·위탁 구조를 자문하며 확인한 쟁점을 문항에 담았습니다.</p>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-1 border-t-2 border-[#14213D] md:grid-cols-2">
              {[['소속', '노무법인 위너스 대표노무사'], ['경력', '공인노무사 16년'], ['학위', '안전공학 박사'], ['실무 이력', '현대카드 · 삼성서울병원 인사 출신']].map(([k, v]) => (
                <div key={k} className="border-b border-[#DDE2EA] py-4 md:pr-6"><p className="text-[15px] font-semibold text-[#5B6680]">{k}</p><p className="text-[17px]">{v}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 대법원 5가지 */}
      <section className="border-t border-[#DDE2EA] py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-8">
          <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]">대법원이 보는 5가지</h2>
          <p className="mt-2.5 text-[18px] text-[#5B6680] md:text-[19px]">진단 문항은 이 판단요소 순서 그대로 구성되어 있습니다. 각 영역마다 근거 판례를 함께 보여드립니다.</p>
          <div className="mt-10 border-t-2 border-[#14213D]">
            {FIVE.map((f) => (
              <div key={f.no} className="grid gap-2 border-b border-[#DDE2EA] py-6 md:grid-cols-[64px_1fr_240px] md:items-baseline md:gap-6">
                <p className="text-[26px] font-extrabold text-[#3182F6]">{f.no}</p>
                <div><h3 className="text-[21px] font-bold">{f.t}</h3><p className="mt-1 text-[17px] leading-[1.7] text-[#3D4A63]">{f.d}</p></div>
                <p className="text-[15px] font-semibold text-[#5B6680] md:text-right">{f.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 근로자로 판단되면 */}
      <section className="border-t border-[#DDE2EA] bg-[#F5F7FA] py-16 md:py-[88px]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-8">
          <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]">근로자로 판단되면 생기는 의무</h2>
          <p className="mt-2.5 text-[18px] text-[#5B6680] md:text-[19px]">계약서 명칭과 관계없이 근로자에게 적용되는 법이 그대로 적용됩니다.</p>
          <div className="mt-10 border-t-2 border-[#14213D] bg-white">
            {DUTIES.map(([t, d, law]) => (
              <div key={t} className="grid gap-1 border-b border-[#DDE2EA] px-1 py-5 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-6 md:px-5">
                <p className="text-[19px] font-bold">{t}</p><p className="text-[17px] text-[#3D4A63]">{d}</p><p className="text-[14px] font-semibold text-[#8A94A6]">{law}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
