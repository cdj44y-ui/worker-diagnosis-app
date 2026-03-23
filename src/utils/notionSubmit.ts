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

/**
 * 서버리스 `api/submit-diagnosis.ts`로 POST — Notion 키는 서버 `NOTION_API_KEY`만 사용 (클라이언트 env 없음).
 * 로컬은 `vercel dev`로 띄우거나 배포 환경에서 테스트하세요. `npm run dev`만 쓰면 `/api`가 없을 수 있습니다.
 */
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
