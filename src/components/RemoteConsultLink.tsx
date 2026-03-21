import { ExternalLink } from 'lucide-react'
import { NOTION_REMOTE_CONSULT_URL } from '../constants/notion'

type Variant = 'headerPrimary' | 'landingOutline'

const sharedRel = 'noopener noreferrer' as const

interface Props {
  variant: Variant
  className?: string
}

/**
 * 문구가 "비대면 상담"인 모든 진입점은 이 컴포넌트만 사용 (href 단일화)
 */
export default function RemoteConsultLink({ variant, className = '' }: Props) {
  if (variant === 'headerPrimary') {
    return (
      <a
        href={NOTION_REMOTE_CONSULT_URL}
        target="_blank"
        rel={sharedRel}
        className={
          className ||
          'flex w-full items-center justify-center gap-2.5 rounded-apple-lg bg-white px-4 py-4 sm:py-[1.125rem] text-[17px] sm:text-[18px] font-bold text-brand-blue shadow-lg hover:bg-zinc-50 active:scale-[0.99] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue'
        }
      >
        비대면 상담
        <ExternalLink size={20} strokeWidth={2.25} aria-hidden />
      </a>
    )
  }

  return (
    <a
      href={NOTION_REMOTE_CONSULT_URL}
      target="_blank"
      rel={sharedRel}
      className={
        className ||
        'flex-1 flex items-center justify-center py-3.5 rounded-full border-2 border-apple-border text-apple-text text-[15px] font-medium hover:bg-apple-bg transition-colors'
      }
    >
      비대면 상담
    </a>
  )
}
