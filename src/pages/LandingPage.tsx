import TrustLanding from '../components/TrustLanding'
import DisclaimerNotice from '../components/DisclaimerNotice'
import { Link } from 'react-router-dom'
import { PROMISE } from '../components/brand/brand'

/** 2026-10-18 RISK119 신뢰형 구성 적용 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TrustLanding />
      <div className="border-t border-[#DDE2EA] py-6">
        <div className="max-w-3xl mx-auto px-4">
          <DisclaimerNotice variant="landing" />
        </div>
      </div>
      <section className="bg-[#111111] py-10 text-center text-white md:py-14 [word-break:keep-all]">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-[30px] font-bold leading-[1.35] md:text-[36px]">감독 통지서가 오기 전에 확인하십시오</h2>
          <p className="mt-2.5 text-[18px] text-[#CFCFCF]">{PROMISE} · 약 5분</p>
          <Link to="/diagnosis" className="mt-9 inline-flex h-[60px] items-center justify-center bg-white px-8 text-[19px] font-bold text-[#111111] hover:bg-[#F5F5F4]">진단 시작하기 →</Link>
        </div>
      </section>
    </div>
  )
}
