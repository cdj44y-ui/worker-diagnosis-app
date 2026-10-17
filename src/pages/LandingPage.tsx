import AlertBanner from '../components/AlertBanner'
import TrustLanding from '../components/TrustLanding'
import CrackdownStats from '../components/CrackdownStats'
import IntroVideo from '../components/IntroVideo'
import DisclaimerNotice from '../components/DisclaimerNotice'
import LaborInspectionLinkCard from '../components/LaborInspectionLinkCard'
import { Link } from 'react-router-dom'

/** 2026-10-18 RISK119 신뢰형 구성 적용 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <AlertBanner />
      <TrustLanding />
      <div className="border-t border-[#DDE2EA] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <CrackdownStats />
          <IntroVideo />
          <div className="mb-10"><LaborInspectionLinkCard variant="landing" /></div>
          <DisclaimerNotice variant="landing" />
        </div>
      </div>
      <section className="bg-[#14213D] py-16 text-center text-white md:py-[88px] [word-break:keep-all]">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-[30px] font-bold leading-[1.35] md:text-[36px]">감독 통지서가 오기 전에 확인하십시오</h2>
          <p className="mt-2.5 text-[18px] text-[#C9D1E0]">무료 진단 · 회원가입 없음 · 약 5분<br />상담은 유료 자문으로 진행되며, 신청서 확인 후 일정과 비용을 안내드립니다.</p>
          <Link to="/diagnosis" className="mt-9 inline-flex h-[60px] items-center justify-center rounded-[10px] bg-[#3182F6] px-8 text-[19px] font-bold text-white hover:bg-[#1B64DA]">무료로 진단 시작하기 →</Link>
        </div>
      </section>
    </div>
  )
}
