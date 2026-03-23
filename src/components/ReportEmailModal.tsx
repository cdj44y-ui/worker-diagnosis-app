import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { DiagnosisResult } from '../types'
import { REPORT_INDUSTRY_OPTIONS } from '../data/reportForm'
import { buildReportPayload, submitDiagnosisReport, type ReportUserType } from '../utils/notionSubmit'

interface Props {
  open: boolean
  onClose: () => void
  result: DiagnosisResult
  onSuccess: () => void
  onError: () => void
}

const USER_TYPE_OPTIONS: { label: string; value: ReportUserType }[] = [
  { label: '사업주입니다', value: '사업주' },
  { label: '근로자입니다', value: '근로자' },
  { label: '인사담당자입니다', value: '인사담당자' },
]

export default function ReportEmailModal({ open, onClose, result, onSuccess, onError }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [userType, setUserType] = useState<ReportUserType | ''>('')
  const [emailError, setEmailError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validateEmail(v: string): boolean {
    const t = v.trim()
    if (!t) {
      setEmailError('이메일을 입력해 주세요.')
      return false
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
    setEmailError(ok ? '' : '올바른 이메일 주소를 입력해 주세요.')
    return ok
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateEmail(email)) return

    setSubmitting(true)
    try {
      await submitDiagnosisReport(
        buildReportPayload(result, {
          email: email.trim(),
          name: name.trim() || undefined,
          industry: industry || undefined,
          userType: userType || undefined,
        }),
      )
      onSuccess()
      onClose()
      setEmail('')
      setName('')
      setIndustry('')
      setUserType('')
      setEmailError('')
    } catch {
      onError()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="report-email-modal"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 no-print"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="닫기"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            disabled={submitting}
            onClick={() => onClose()}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="relative z-10 w-full max-w-md bg-apple-surface rounded-apple-lg border border-apple-border shadow-apple-md overflow-hidden max-h-[min(90vh,640px)] flex flex-col"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-apple-border bg-apple-elevated/50 shrink-0">
              <h2 id="report-modal-title" className="text-[16px] font-semibold text-apple-text">
                진단 결과 리포트 받기
              </h2>
              <button
                type="button"
                onClick={() => !submitting && onClose()}
                className="p-2 rounded-full text-apple-secondary hover:bg-apple-bg hover:text-apple-text transition-colors"
                aria-label="모달 닫기"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 py-4 overflow-y-auto space-y-4">
              <div>
                <label htmlFor="report-email" className="block text-[13px] font-medium text-apple-text mb-1.5">
                  이메일 <span className="text-red-600">*</span>
                </label>
                <input
                  id="report-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value)
                    if (emailError) validateEmail(ev.target.value)
                  }}
                  onBlur={() => email && validateEmail(email)}
                  className="w-full rounded-apple border border-apple-border bg-white px-3.5 py-2.5 text-[15px] text-apple-text placeholder:text-apple-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/35 focus:border-brand-blue min-h-[48px]"
                  placeholder="name@example.com"
                  required
                />
                {emailError ? <p className="text-[12px] text-red-600 mt-1">{emailError}</p> : null}
              </div>

              <div>
                <label htmlFor="report-name" className="block text-[13px] font-medium text-apple-text mb-1.5">
                  이름 <span className="text-apple-tertiary font-normal">(선택)</span>
                </label>
                <input
                  id="report-name"
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  className="w-full rounded-apple border border-apple-border bg-white px-3.5 py-2.5 text-[15px] text-apple-text placeholder:text-apple-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/35 focus:border-brand-blue min-h-[48px]"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="report-industry" className="block text-[13px] font-medium text-apple-text mb-1.5">
                  소속 회사 / 업종 <span className="text-apple-tertiary font-normal">(선택)</span>
                </label>
                <select
                  id="report-industry"
                  value={industry}
                  onChange={(ev) => setIndustry(ev.target.value)}
                  className="w-full rounded-apple border border-apple-border bg-white px-3.5 py-2.5 text-[15px] text-apple-text focus:outline-none focus:ring-2 focus:ring-brand-blue/35 focus:border-brand-blue min-h-[48px]"
                >
                  <option value="">선택 안 함</option>
                  {REPORT_INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-[13px] font-medium text-apple-text mb-2">
                  입력자 유형 <span className="text-apple-tertiary font-normal">(선택)</span>
                </legend>
                <div className="space-y-2">
                  {USER_TYPE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 min-h-[48px] px-3 rounded-apple border cursor-pointer transition-colors ${
                        userType === opt.value
                          ? 'border-brand-blue bg-brand-blue/[0.06]'
                          : 'border-apple-border bg-apple-elevated/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={opt.value}
                        checked={userType === opt.value}
                        onChange={() => setUserType(opt.value)}
                        className="h-4 w-4 accent-brand-blue shrink-0"
                      />
                      <span className="text-[14px] text-apple-text">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-brand-blue text-white font-semibold text-[15px] shadow-sm hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:pointer-events-none min-h-[48px]"
                >
                  {submitting ? '전송 중…' : '리포트 신청하기'}
                </button>
                <p className="text-[11px] text-apple-secondary text-center leading-snug">
                  입력하신 정보는 상담·리포트 발송 목적으로만 사용됩니다.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
