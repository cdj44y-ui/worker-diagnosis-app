import AlertBanner from '../components/AlertBanner'
import Hero from '../components/Hero'
import CrackdownStats from '../components/CrackdownStats'
import LaborInspectionLinkCard from '../components/LaborInspectionLinkCard'
import ConsultantProfile from '../components/ConsultantProfile'
import DisclaimerNotice from '../components/DisclaimerNotice'

/** 소개·통계·상담 CTA — 진단 문항·판례 번호는 `/diagnosis`에서만 노출 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-apple-bg">
      <AlertBanner />
      <Hero />
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="mb-10">
          <DisclaimerNotice variant="landing" />
        </div>
        <CrackdownStats />
        <div className="mb-10">
          <LaborInspectionLinkCard variant="landing" />
        </div>
        <ConsultantProfile />
      </div>
    </div>
  )
}
