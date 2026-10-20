import TrustLanding from '../components/TrustLanding'
import IntroVideo from '../components/IntroVideo'
import DisclaimerNotice from '../components/DisclaimerNotice'
import { Link } from 'react-router-dom'
import { PROMISE } from '../components/brand/brand'

/** 2026-10-18 RISK119 신뢰형 구성 적용 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TrustLanding />
      <div className="border-t border-[#DDE2EA] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <IntroVideo />
          <DisclaimerNotice variant="landing" />
        </div>
      </div>
      <section className="bg-[#14213D] py-16 text-center text-white md:py-[88px] [word-break:keep-all]">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-[30px] font-bold leading-[1.35] md:text-[36px]">감독 통지서가 오기 전에 확인하십시오</h2>
          <p className="mt-2.5 text-[18px] text-[#C9D1E0]">{PROMISE} · 약 5분</p>
          <Link to="/diagnosis" className="mt-9 inline-flex h-[60px] items-center justify-center rounded-[10px] bg-[#00796B] px-8 text-[19px] font-bold text-white hover:bg-[#00695C]">진단 시작하기 →</Link>
        </div>
      </section>
    </div>
  )
}
