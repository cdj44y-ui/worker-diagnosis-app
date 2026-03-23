import type { DiagnosisResult, VerdictType } from '../types'

export type ReportUserType = '사업주' | '근로자' | '인사담당자'

export interface DiagnosisReportPayload {
  email: string
  name?: string
  industry?: string
  userType?: ReportUserType
  totalScore: number
  percentage: number
  verdict: VerdictType
  presumptionMet: number
  categoryScores: { category: string; score: number; max: number }[]
  submittedAt: string
}

/** Vercel 배포 시 `/api/submit-diagnosis` 로 전달 (로컬 `vite` 단독 실행 시 404 가능) */
export async function submitDiagnosisReport(payload: DiagnosisReportPayload): Promise<void> {
  const res = await fetch('/api/submit-diagnosis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(typeof err === 'object' && err && 'error' in err ? String((err as { error: string }).error) : 'Request failed')
  }
}

export function buildReportPayload(
  result: DiagnosisResult,
  form: {
    email: string
    name?: string
    industry?: string
    userType?: ReportUserType
  },
): DiagnosisReportPayload {
  return {
    email: form.email,
    name: form.name,
    industry: form.industry,
    userType: form.userType,
    totalScore: result.totalScore,
    percentage: result.percentage,
    verdict: result.verdict,
    presumptionMet: result.presumptionMet,
    categoryScores: result.categoryScores.map((c) => ({
      category: c.name,
      score: c.score,
      max: c.max,
    })),
    submittedAt: new Date().toISOString(),
  }
}
