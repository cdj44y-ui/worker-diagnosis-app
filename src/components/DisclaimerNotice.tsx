import { AlertTriangle } from 'lucide-react'

type Variant = 'landing' | 'result'

interface Props {
  /** landing: 사건번호 없이 요약 / result: 판례 번호 포함 전체 */
  variant: Variant
  className?: string
}

export default function DisclaimerNotice({ variant, className = '' }: Props) {
  const isLanding = variant === 'landing'

  return (
    <section
      className={`
        rounded-apple-lg border border-amber-200/90 bg-amber-50/80 shadow-apple
        px-5 py-6 sm:px-7 sm:py-8
        ${className}
      `}
      aria-labelledby="disclaimer-heading"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 border border-amber-200">
          <AlertTriangle size={22} className="text-amber-700" strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id="disclaimer-heading"
            className="text-[17px] sm:text-[19px] font-semibold text-apple-text tracking-tight leading-snug"
          >
            면책 고지 및 이용 안내
          </h2>
          <div className="mt-3 space-y-3 text-[15px] sm:text-[16px] text-apple-secondary leading-relaxed">
            {isLanding ? (
              <>
                <p>
                  본 화면은 <span className="text-apple-text font-medium">참고용 자가진단</span>을 안내합니다. 판례·
                  고용노동부 가이드 취지를 바탕으로 한 점검 도구일 뿐,{' '}
                  <span className="text-apple-text font-medium">법적 효력이 있는 공식 판정·법률 자문이 아닙니다</span>.
                </p>
                <p>
                  구체적 분쟁·감독 대응을 위해서는{' '}
                  <span className="text-apple-text font-medium">공인노무사·변호사 등 전문가 상담</span>을 받으시기
                  바랍니다. 진단을 시작하면 문항별 근거·판례 참고가 함께 표시됩니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  본 진단은{' '}
                  <span className="text-apple-text font-medium">
                    대법원 판례(94다22859, 2004다29736, 2024두32973)
                  </span>
                  및 고용노동부 가이드라인을 체계화한{' '}
                  <span className="text-apple-text font-medium">자가진단 도구</span>이며, 법적 효력이 있는 공식 판정이
                  아닙니다.
                </p>
                <p>
                  정확한 판단을 위해서는{' '}
                  <span className="text-apple-text font-medium">공인노무사·변호사 등 전문가 상담</span>을 받으시기
                  바랍니다.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
