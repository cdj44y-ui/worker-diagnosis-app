export const CRACKDOWN_DATA = {
  updatedAt: '2026-03-19',
  source: '고용노동부 보도자료',
  sourceUrl: 'https://www.moel.go.kr',

  summary: {
    inspected: 108,
    violated: 72,
    affectedWorkers: 1070,
    unpaidWages: 685_000_000,
    violations: 256,
  },

  industries: [
    { name: '숙박·음식업', count: 39, percentage: 54.2 },
    { name: '제조업', count: 16, percentage: 22.2 },
    { name: '도·소매업', count: 13, percentage: 18.1 },
    { name: '운수·창고업', count: 3, percentage: 4.2 },
    { name: '사업지원서비스', count: 1, percentage: 1.4 },
  ],

  caseTypes: [
    { type: '콜센터 연수생 위장', amount: '2.3억원', workers: 420 },
    { type: '제조업 하도급 3.3% 처리', amount: '1.8억원', workers: 280 },
    { type: '숙박업 일용직 위장', amount: '1.5억원', workers: 210 },
    { type: '음식점 포괄임금 위장', amount: '1.2억원', workers: 160 },
  ],
} as const

/** 표시용: 2026-03-19 → 2026.3.19 */
export function formatCrackdownDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return isoDate
  return `${y}.${Number(m)}.${Number(d)}`
}
