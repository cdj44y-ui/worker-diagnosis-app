import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

interface Props {
  onShowResult: () => void
}

export default function DiagnosisFinalGate({ onShowResult }: Props) {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/10 text-brand-blue mb-4">
          <Scale size={28} strokeWidth={1.75} />
        </div>
        <h2 className="text-[20px] font-semibold text-apple-text mb-2">모든 문항에 응답했습니다</h2>
        <p className="text-[14px] text-apple-secondary mb-8 leading-relaxed">결과를 확인하시겠습니까?</p>
        <button
          type="button"
          onClick={onShowResult}
          className="w-full py-4 rounded-full bg-neutral-900 text-white font-semibold text-[16px] shadow-sm border border-neutral-800 hover:bg-neutral-800 transition-colors min-h-[52px]"
        >
          진단 결과 보기
        </button>
      </div>
    </motion.div>
  )
}
