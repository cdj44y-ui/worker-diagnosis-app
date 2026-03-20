// ═══════════════════════════════════════════════
// 근로자성 판단 진단 시스템 — 타입 정의
// ═══════════════════════════════════════════════

/** 선택지 강도 태그 */
export type ScoreTag =
  | '근로자↑↑'
  | '근로자↑'
  | '중립'
  | '사업자↑'
  | '사업자↑↑'
  | '해당없음'
  | '-'

/** 선택지 색상 클래스 */
export type ScoreClass = 'high' | 'mid' | 'low' | 'zero'

/** 개별 선택지 */
export interface Option {
  label: string
  score: number
  tag: ScoreTag
  cls: ScoreClass
}

/** 개별 문항 */
export interface Question {
  id: string
  text: string
  /** 근거 판례·법령 */
  refs: string[]
  /** 판례 원문 기반 해설 */
  hint: string
  /** 가중치 (1~5, 판례 중요도 반영) */
  weight: number
  options: Option[]
}

/** 진단 카테고리 (STEP) */
export interface Category {
  id: string
  tag: string
  title: string
  desc: string
  questions: Question[]
}

/** 카테고리별 점수 결과 */
export interface CategoryScore {
  id: string
  name: string
  score: number
  max: number
  pct: number
}

/** 판정 등급 */
export type VerdictType = 'worker' | 'gray' | 'freelancer'

/** 종합 판정 결과 */
export interface DiagnosisResult {
  totalScore: number
  maxScore: number
  percentage: number
  verdict: VerdictType
  categoryScores: CategoryScore[]
  /** 근로자 추정제 충족 개수 (0~5) */
  presumptionMet: number
  /** 근로자 추정제 개별 항목 충족 여부 */
  presumptionItems: { label: string; met: boolean }[]
  /** 사용자 응답 맵 */
  answers: Record<string, number>
}

/** 법적 근거 참조 */
export interface LegalReference {
  badge: string
  name: string
  summary: string
}

/** 후속 조치 항목 */
export interface ActionItem {
  bold: string
  detail: string
}
