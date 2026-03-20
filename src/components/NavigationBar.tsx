import { ChevronLeft, ChevronRight, Scale } from 'lucide-react'

interface Props {
  step: number
  isCategoryComplete: boolean
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function NavigationBar({ step, isCategoryComplete, onPrev, onNext, onSubmit }: Props) {
  return (
    <div className="flex gap-3 mt-2 no-print">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0}
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-full border border-apple-border bg-apple-surface text-apple-text text-[15px] font-medium transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-apple-bg"
      >
        <ChevronLeft size={18} strokeWidth={2} />
        이전
      </button>

      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!isCategoryComplete}
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-3.5 rounded-full bg-brand-blue text-white text-[15px] font-medium transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand-blue-dark"
        >
          다음
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isCategoryComplete}
          className="flex-[1.6] flex items-center justify-center gap-2 py-3.5 rounded-full bg-neutral-900 text-white text-[15px] font-medium shadow-sm border border-neutral-800 transition-colors disabled:opacity-35 disabled:cursor-not-allowed hover:bg-neutral-800"
        >
          <Scale size={17} strokeWidth={2} />
          결과 보기
        </button>
      )}
    </div>
  )
}
