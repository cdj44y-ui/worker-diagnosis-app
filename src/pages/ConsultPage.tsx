import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import TallyEmbed from '../components/TallyEmbed'
import { buildTallyEmbedUrl } from '../utils/tally'
import { EXPERT } from '../data/expert'
import DisclaimerNotice from '../components/DisclaimerNotice'

const CONSULT_TITLE = '상담 신청 | 노무법인 위너스 - FREE119'

export default function ConsultPage() {
  const [searchParams] = useSearchParams()
  const score = searchParams.get('score') ?? undefined
  const grade = searchParams.get('grade') ?? undefined

  useEffect(() => {
    const prevTitle = document.title
    document.title = CONSULT_TITLE
    return () => {
      document.title = prevTitle
    }
  }, [])

  const tallySrc = useMemo(
    () =>
      buildTallyEmbedUrl({
        area: '근로자성 자가진단(FREE119)',
        score: score ? `${score}점` : undefined,
        grade: grade ? `[FREE119] ${grade}` : '[FREE119]',
      }),
    [score, grade],
  )

  return (
    <div className="min-h-screen bg-apple-bg">
      <SiteNav />
      <div className="max-w-2xl mx-auto px-4 sm:px-5 pt-8 pb-16">
        <h1 className="text-[24px] sm:text-[28px] font-semibold text-apple-text tracking-tight mb-2">상담 신청</h1>
        <p className="text-[14px] text-apple-secondary leading-relaxed mb-6">
          근로자성 판단·계약 구조 점검이 필요하시면 아래 폼을 남겨 주세요. 담당 노무사에게 바로 접수됩니다.
        </p>

        {score || grade ? (
          <p className="mb-6 rounded-apple-lg border border-brand-blue/25 bg-brand-blue/[0.06] px-4 py-3 text-[13px] text-apple-text">
            방금 진행한 자가진단 결과{score ? ` ${score}점` : ''}
            {grade ? `${score ? ' · ' : ' '}${grade}` : ''}가 문의 내용에 함께 전달됩니다.
          </p>
        ) : null}

        <div className="overflow-hidden rounded-apple-lg border border-apple-border bg-apple-surface shadow-apple-md p-2 sm:p-4">
          <TallyEmbed src={tallySrc} title="노무 상담 문의 · 조대진 노무사" height={760} />
        </div>

        <p className="mt-6 text-center text-[13px] text-apple-secondary">
          폼이 보이지 않으시면 전화{' '}
          <a
            href={`tel:${EXPERT.contact.phone.replace(/-/g, '')}`}
            className="font-medium text-brand-blue hover:underline"
          >
            {EXPERT.contact.phone}
          </a>{' '}
          또는 이메일{' '}
          <a href={`mailto:${EXPERT.contact.email}`} className="font-medium text-brand-blue hover:underline">
            {EXPERT.contact.email}
          </a>
          로 문의해 주세요.
        </p>

        <div className="mt-8">
          <DisclaimerNotice variant="landing" />
        </div>
      </div>
    </div>
  )
}
