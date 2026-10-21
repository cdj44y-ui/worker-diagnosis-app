import type { Category, Option, Question } from '../types'

interface Props {
  category: Category
  question: Question
  globalIndex: number
  total: number
  answers: Record<string, number>
  onSelect: (questionId: string, optionIndex: number) => void
}

// 2026-10-18 가독성 개편: 큰 질문·판례 근거 상자·큰 선택지(근로자 쪽/사업자 쪽 저채도 구분)
const TAG_STYLE: Record<string, { c: string; tint: string }> = {
  high: { c: '#1B4F9C', tint: '#EAF1FB' },
  mid: { c: '#7A6A4A', tint: '#F6F2EA' },
  low: { c: '#2F6B4F', tint: '#EDF4EF' },
  zero: { c: '#2F6B4F', tint: '#EDF4EF' },
}

export default function SingleQuestionPanel({ category, question: q, globalIndex, total, answers, onSelect }: Props) {
  const localNum = category.questions.findIndex((x) => x.id === q.id) + 1

  return (
    <div className="w-full [word-break:keep-all]">
      <div className="overflow-hidden rounded-[16px] border border-[#DDE2EA] bg-white">
        <div className="border-b border-[#E6EAF0] bg-[#F7F9FC] px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#14213D] px-2.5 py-1 text-[14px] font-bold text-white">{category.tag}</span>
            <span className="text-[17px] font-bold text-[#14213D]">{category.title}</span>
          </div>
          <p className="mt-2 text-[16px] leading-[1.65] text-[#5B6680]">{category.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-[15px] font-bold text-[#2F5D50]">질문 {localNum} / {category.questions.length} · 전체 {globalIndex + 1} / {total}</p>
          <h2 className="mt-2 text-[24px] font-bold leading-[1.5] tracking-[-0.4px] text-[#14213D] md:text-[28px]">{q.text}</h2>

          <div className="mt-5 rounded-xl border border-[#E6EAF0] bg-[#F8FAFC] px-5 py-4">
            <p className="text-[15px] font-bold text-[#5B6680]">판례 근거</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {q.refs.map((r: string) => (
                <span key={r} className="rounded-md bg-white px-2.5 py-1 text-[14px] font-semibold text-[#244A40] ring-1 ring-[#B2DFDB]">{r}</span>
              ))}
            </div>
            <p className="mt-2.5 text-[16px] leading-[1.7] text-[#3D4A63]">{q.hint}</p>
          </div>

          <div className="mt-6 grid gap-2.5">
            {q.options.map((opt: Option, oi: number) => {
              const sel = answers[q.id] === oi
              const st = TAG_STYLE[opt.cls] || TAG_STYLE.mid
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onSelect(q.id, oi)}
                  aria-pressed={sel}
                  className="flex min-h-[64px] w-full items-center gap-4 rounded-xl border-2 px-5 text-left transition hover:-translate-y-px"
                  style={{ borderColor: sel ? '#2F5D50' : '#E1E6EE', background: sel ? '#E0F2F1' : '#FFFFFF' }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[14px] font-extrabold"
                    style={{ borderColor: sel ? '#2F5D50' : '#C9D1DC', background: sel ? '#2F5D50' : '#FFFFFF', color: sel ? '#FFFFFF' : 'transparent' }} aria-hidden>✓</span>
                  <span className="flex-1 py-3 text-[18px] font-semibold leading-snug text-[#14213D] md:text-[19px]">{opt.label}</span>
                  <span className="shrink-0 rounded-md px-2.5 py-1 text-[14px] font-bold" style={{ color: st.c, background: st.tint }}>{opt.tag}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-4 text-[14px] text-[#8A94A6]">오른쪽 표시는 판례 기준으로 근로자 쪽(근로자↑) 또는 사업자 쪽(사업자↑)으로 기우는 정도입니다.</p>
        </div>
      </div>
    </div>
  )
}
