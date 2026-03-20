import { Info, Shield } from 'lucide-react'

export default function InfoBanner() {
  return (
    <div className="space-y-3 mb-6 no-print">
      <div className="bg-apple-surface border border-brand-blue/25 rounded-apple-lg p-4 flex gap-3 items-start shadow-apple ring-1 ring-brand-blue/10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/15">
          <Shield size={18} className="text-brand-blue" strokeWidth={2} />
        </div>
        <p className="text-[13px] text-apple-secondary leading-relaxed pt-1">
          결과 화면에서 <span className="text-apple-text font-semibold">근로자 추정제</span> 핵심 지표 충족 여부를 함께
          확인할 수 있습니다. 도입·적용 시기는 법령·정책에 따르며, 본 진단은 참고용입니다.
        </p>
      </div>

      <div className="bg-apple-surface border border-apple-border rounded-apple-lg p-4 flex gap-3 items-start shadow-apple">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
          <Info size={16} className="text-brand-blue" strokeWidth={2} />
        </div>
        <p className="text-[13px] text-apple-secondary leading-relaxed pt-0.5">
          본 진단은{' '}
          <span className="text-apple-text font-medium">대법원 판례(94다22859, 2004다29736, 타다 2024두32973)</span>와
          고용노동부 가이드 취지를 참고한 <span className="text-apple-text font-medium">자가진단</span>입니다. 문항
          가중치는 판례상 중요도를 반영한 참고치이며, 법적 효력이 없습니다.
        </p>
      </div>
    </div>
  )
}
