import { CATEGORIES } from '../data/questions'
import { Check } from 'lucide-react'

interface Props {
  step: number
  progressPct: number
  answeredCount: number
  totalQuestions: number
  answers: Record<string, number>
}

export default function ProgressBar({ step, progressPct, answeredCount, totalQuestions, answers }: Props) {
  return (
    <div className="bg-apple-surface rounded-apple-lg border border-apple-border p-5 mb-6 shadow-apple">
      <div className="flex justify-between mb-3 text-[13px]">
        <span className="font-medium text-apple-text">진행률 {progressPct}%</span>
        <span className="text-apple-secondary tabular-nums">
          {answeredCount} / {totalQuestions}
        </span>
      </div>

      <div className="h-1 bg-apple-bg rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-brand-blue rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex gap-1.5">
        {CATEGORIES.map((cat, i) => {
          const done = cat.questions.every((q) => answers[q.id] !== undefined)
          const active = i === step

          return (
            <div
              key={cat.id}
              className={`
                flex-1 h-8 rounded-full flex items-center justify-center gap-1
                text-[11px] font-medium transition-colors
                ${
                  active
                    ? 'bg-neutral-900 text-white shadow-sm border border-neutral-800'
                    : done
                      ? 'bg-apple-bg text-brand-blue border border-apple-border'
                      : 'bg-apple-bg text-apple-tertiary'
                }
              `}
            >
              {done && !active && <Check size={11} strokeWidth={3} />}
              {i + 1}
            </div>
          )
        })}
      </div>
    </div>
  )
}
