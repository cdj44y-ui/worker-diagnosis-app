/** 리포트 신청 — 업종 드롭다운 옵션 */
export const REPORT_INDUSTRY_OPTIONS = [
  '숙박·음식',
  '제조',
  '도소매',
  '운수',
  'IT·소프트웨어',
  '건설',
  '기타',
] as const

export type ReportIndustry = (typeof REPORT_INDUSTRY_OPTIONS)[number]
