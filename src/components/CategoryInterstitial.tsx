import { motion } from 'framer-motion'
import { FLAT_QUESTIONS } from '../data/questions'

interface Props {
  nextIndex: number
  onContinue: () => void
}

export default function CategoryInterstitial({ nextIndex, onContinue }: Props) {
  const prevCat = FLAT_QUESTIONS[nextIndex - 1].category
  const nextCat = FLAT_QUESTIONS[nextIndex].category

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md p-8 text-center">
        <p className="text-[15px] font-semibold text-apple-text leading-relaxed mb-2">
          ✓ {prevCat.title} {prevCat.questions.length}문항 완료
        </p>
        <p className="text-[14px] text-apple-secondary mb-6">
          다음: {nextCat.title} ({nextCat.questions.length}문항)
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 rounded-full bg-brand-blue text-white font-semibold text-[15px] hover:bg-brand-blue-dark transition-colors min-h-[48px]"
        >
          계속하기
        </button>
      </div>
    </motion.div>
  )
}
