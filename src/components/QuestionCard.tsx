import type { Category, ScoreClass } from '../types'

interface Props {
  category: Category
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

export default function QuestionCard({ category, answers, onSelect }: Props) {
  return (
    <div className="bg-apple-surface rounded-apple-lg border border-apple-border overflow-hidden mb-6 animate-slide-up shadow-apple-md">
      <div className="px-5 py-6 bg-apple-elevated border-b border-apple-border">
        <span className="inline-block text-[11px] font-semibold text-brand-blue tracking-wide mb-2">{category.tag}</span>
        <h2 className="text-[20px] font-semibold text-apple-text tracking-tight leading-snug">{category.title}</h2>
        <p className="text-[14px] text-apple-secondary mt-2 leading-relaxed">{category.desc}</p>
      </div>

      <div className="p-5 sm:p-6 space-y-8">
        {category.questions.map((q, qi) => (
          <div key={q.id} className={qi < category.questions.length - 1 ? 'pb-8 border-b border-apple-border' : ''}>
            <div className="flex items-start gap-3 mb-2">
              <span className="w-7 h-7 rounded-lg bg-apple-text text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
                {qi + 1}
              </span>
              <span className="text-[15px] font-semibold text-apple-text leading-snug pt-0.5">{q.text}</span>
            </div>

            <div className="ml-10 mb-4 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {q.refs.map((r) => (
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

            <div className="ml-0 sm:ml-10 space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => onSelect(q.id, oi)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5 rounded-apple-lg text-left text-[14px] transition-all duration-150
                      ${
                        selected
                          ? 'bg-brand-blue/8 ring-1 ring-brand-blue/35 border border-brand-blue/40'
                          : 'border border-apple-border bg-apple-surface hover:border-apple-text/20 hover:bg-apple-bg/80'
                      }
                    `}
                  >
                    <span
                      className={`
                      w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-all
                      ${selected ? 'border-brand-blue bg-brand-blue' : 'border-apple-border bg-apple-surface'}
                    `}
                    >
                      {selected && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>

                    <span className={`flex-1 ${selected ? 'font-medium text-apple-text' : 'text-apple-text'}`}>
                      {opt.label}
                    </span>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${SCORE_COLORS[opt.cls]}`}>
                      {opt.tag}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
