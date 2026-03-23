import { useEffect } from 'react'
import SiteNav from '../components/SiteNav'
import HeroSection from '../components/about/HeroSection'
import ProblemFraming from '../components/about/ProblemFraming'
import SpecialtyCards from '../components/about/SpecialtyCards'
import AchievementStats from '../components/about/AchievementStats'
import ApproachSection from '../components/about/ApproachSection'
import CaseKeywords from '../components/about/CaseKeywords'
import TestimonialSlider from '../components/about/TestimonialSlider'
import LaborInspectionLinkCard from '../components/LaborInspectionLinkCard'
import AboutCTA from '../components/about/AboutCTA'
import { SITE_ORIGIN } from '../constants/site'

const ABOUT_TITLE = '조대진 노무사 | 근로자성 판단 전문 · 노무법인 위너스 - FREE119'
const ABOUT_DESC =
  '근로자인가 프리랜서인가? 대법원 판례 기준 7대 판단요소를 실무에 적용하는 근로자성 판단 전문 노무사. 특수고용·플랫폼 노동·위탁직 근로자성 자문.'

export default function AboutPage() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = ABOUT_TITLE

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    if (metaDesc) metaDesc.setAttribute('content', ABOUT_DESC)

    const upsertOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    upsertOg('og:title', '조대진 노무사 | 근로자성 판단 전문')
    upsertOg('og:description', '계약서 제목이 아니라 실질로 판단합니다. 대법원 7대 판단요소 기반 근로자성 전문 자문.')
    upsertOg('og:url', `${SITE_ORIGIN}/about`)
    upsertOg('og:image', `${SITE_ORIGIN}/og/about.png`)

    return () => {
      document.title = prevTitle
      if (metaDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [])

  return (
    <div className="min-h-screen bg-apple-bg animate-fade-in">
      <SiteNav />
      <main>
        <HeroSection />
        <ProblemFraming />
        <SpecialtyCards />
        <AchievementStats />
        <ApproachSection />
        <CaseKeywords />
        <TestimonialSlider />
        <section className="px-4 sm:px-5 py-6 max-w-3xl mx-auto">
          <LaborInspectionLinkCard variant="about" />
        </section>
        <AboutCTA />
      </main>
    </div>
  )
}
