import { Check } from 'lucide-react'
import type { Category, Option, Question, ScoreClass } from '../types'

interface Props {
  category: Category
  question: Question
  globalIndex: number
  total: number
  answers: Record<string, number>
  onSelect: (questionId: string, optionIndex: number) => void
}

const SCORE_COLORS: Record<ScoreClass, string> = {
  high: 'bg-rose-50 text-rose-800/90 border border-rose-100',
  mid: 'bg-amber-50 text-amber-900/80 border border-amber-100',
  low: 'bg-emerald-50 text-emerald-900/80 border border-emerald-100',
  zero: 'bg-apple-bg text-apple-secondary border border-apple-border',
}

function WeightDots({ weight }: { weight: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium text-apple-tertiary">중요도</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < weight ? 'bg-brand-blue' : 'bg-apple-border'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function SingleQuestionPanel({
  category,
  question: q,
  globalIndex,
  total,
  answers,
  onSelect,
}: Props) {
  const localNum = category.questions.findIndex((x) => x.id === q.id) + 1

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-apple-surface rounded-apple-lg border border-apple-border overflow-hidden shadow-apple-md">
        <div className="px-4 sm:px-5 py-5 bg-apple-elevated border-b border-apple-border">
          <span className="inline-block text-[11px] font-semibold text-brand-blue tracking-wide mb-2">{category.tag}</span>
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-apple-text tracking-tight leading-snug">{category.title}</h2>
          <p className="text-[13px] sm:text-[14px] text-apple-secondary mt-2 leading-relaxed line-clamp-3">{category.desc}</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white text-[12px] font-semibold flex items-center justify-center shrink-0 shadow-sm border border-neutral-800">
              {globalIndex + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-apple-tertiary mb-1">
                {localNum} / {category.questions.length} · 전체 {globalIndex + 1}/{total}
              </p>
              <span className="text-[15px] font-semibold text-apple-text leading-snug">{q.text}</span>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {q.refs.map((r: string) => (
                <span
                  key={r}
                  className="inline-block text-[11px] font-medium text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-md"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="text-[12px] text-apple-secondary leading-relaxed">{q.hint}</p>
            <WeightDots weight={q.weight} />
          </div>

          <div className="space-y-2">
            {q.options.map((opt: Option, oi: number) => {
              const selected = answers[q.id] === oi
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onSelect(q.id, oi)}
                  className={`
                    w-full flex items-center gap-3 px-4 min-h-[48px] rounded-apple-lg text-left text-[14px] transition-all duration-150
                    ${
                      selected
                        ? 'bg-brand-blue text-white ring-1 ring-brand-blue/40 border border-brand-blue'
                        : 'border border-apple-border bg-apple-surface hover:border-apple-text/20 hover:bg-apple-bg/80'
                    }
                  `}
                >
                  <span
                    className={`
                      w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-all
                      ${selected ? 'border-white bg-white' : 'border-apple-border bg-apple-surface'}
                    `}
                  >
                    {selected ? <Check className="w-3.5 h-3.5 text-brand-blue" strokeWidth={2.5} aria-hidden /> : null}
                  </span>

                  <span className={`flex-1 ${selected ? 'font-medium' : 'text-apple-text'}`}>{opt.label}</span>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                      selected ? 'bg-white/20 text-white border border-white/30' : SCORE_COLORS[opt.cls]
                    }`}
                  >
                    {opt.tag}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
