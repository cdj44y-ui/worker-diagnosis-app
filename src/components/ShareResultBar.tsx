import { useState } from 'react'
import { Share2, Link2, Check } from 'lucide-react'
import type { VerdictType } from '../types'

const SHARE_SITE = 'https://worker-diagnosis.vercel.app'

function verdictShareLabel(v: VerdictType): string {
  switch (v) {
    case 'worker':
      return '근로자 판정 가능성 높음'
    case 'gray':
      return '회색지대'
    case 'freelancer':
      return '프리랜서(사업자) 가능성 높음'
  }
}

function buildShareText(percentage: number, verdict: VerdictType): string {
  return `근로자성 자가진단 결과: ${percentage}점 (${verdictShareLabel(verdict)})\n나도 진단해보기 → ${SHARE_SITE}`
}

interface Props {
  percentage: number
  verdict: VerdictType
}

export default function ShareResultBar({ percentage, verdict }: Props) {
  const [copied, setCopied] = useState(false)
  const shareText = buildShareText(percentage, verdict)
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function handleNativeShare() {
    try {
      await navigator.share({
        title: '근로자성 자가진단 결과',
        text: shareText,
        url: SHARE_SITE,
      })
    } catch {
      /* 사용자 취소 등 */
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md p-5 sm:p-6 text-center no-print">
      <p className="text-[13px] font-semibold text-apple-text mb-3">결과 공유하기</p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {canNativeShare ? (
          <button
            type="button"
            onClick={() => void handleNativeShare()}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full bg-brand-blue text-white font-semibold text-[14px] hover:bg-brand-blue-dark transition-colors"
          >
            <Share2 size={18} strokeWidth={2} aria-hidden />
            공유하기
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full border-2 border-brand-blue/35 bg-brand-blue/[0.06] text-brand-blue font-semibold text-[14px] hover:bg-brand-blue/10 transition-colors"
        >
          {copied ? <Check size={18} strokeWidth={2} aria-hidden /> : <Link2 size={18} strokeWidth={2} aria-hidden />}
          {copied ? '복사됨' : '링크·요약 복사'}
        </button>
      </div>
      {!canNativeShare ? (
        <p className="text-[11px] text-apple-tertiary mt-3 leading-snug">
          카카오톡 등은 복사한 내용을 채팅창에 붙여넣어 공유할 수 있습니다.
        </p>
      ) : (
        <p className="text-[11px] text-apple-tertiary mt-3 leading-snug">카카오톡·메시지 등 기기 공유 시트에서 선택할 수 있습니다.</p>
      )}
    </div>
  )
}
