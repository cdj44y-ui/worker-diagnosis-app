import type { DiagnosisResult, CategoryScore, VerdictType, VerdictTextResult } from '../types'
import { CATEGORIES, MAX_SCORE, PRESUMPTION_KEYS, PRESUMPTION_LABELS } from '../data/questions'

export const THRESHOLD = {
  WORKER: 65,
  GRAY_MIN: 40,
} as const

export function calculateResult(answers: Record<string, number>): DiagnosisResult {
  let totalScore = 0
  const categoryScores: CategoryScore[] = []

  for (const cat of CATEGORIES) {
    let catScore = 0
    let catMax = 0

    for (const q of cat.questions) {
      const ansIdx = answers[q.id]
      if (ansIdx !== undefined) {
        catScore += q.options[ansIdx].score * q.weight
      }
      catMax += 5 * q.weight
    }

    categoryScores.push({
      id: cat.id,
      name: cat.title,
      score: catScore,
      max: catMax,
      pct: catMax > 0 ? Math.round((catScore / catMax) * 100) : 0,
    })

    totalScore += catScore
  }

  const percentage = parseFloat(((totalScore / MAX_SCORE) * 100).toFixed(1))

  const verdict: VerdictType =
    percentage >= THRESHOLD.WORKER
      ? 'worker'
      : percentage >= THRESHOLD.GRAY_MIN
        ? 'gray'
        : 'freelancer'

  const presumptionItems = PRESUMPTION_KEYS.map((key, i) => {
    const ansIdx = answers[key]
    let met = false
    if (ansIdx !== undefined) {
      const q = findQuestion(key)
      if (q && q.options[ansIdx].score >= 3) {
        met = true
      }
    }
    return { label: PRESUMPTION_LABELS[i] ?? key, met }
  })

  const presumptionMet = presumptionItems.filter((p) => p.met).length

  return {
    totalScore,
    maxScore: MAX_SCORE,
    percentage,
    verdict,
    categoryScores,
    presumptionMet,
    presumptionItems,
    answers,
  }
}

function findQuestion(id: string) {
  for (const cat of CATEGORIES) {
    for (const q of cat.questions) {
      if (q.id === id) return q
    }
  }
  return null
}

/** 애플 톤 — 채도 낮은 시맨틱 액센트 (선명한 원색 지양) */
export function getVerdictColor(verdict: VerdictType): string {
  switch (verdict) {
    case 'worker':
      return '#a85a66'
    case 'gray':
      return '#9a8468'
    case 'freelancer':
      return '#5a8f78'
  }
}

export function getVerdictText(verdict: VerdictType): VerdictTextResult {
  switch (verdict) {
    case 'worker':
      return {
        title: '근로자 가능성 높음',
        icon: '⚖️',
        sub: '대법원 판례가 제시한 사용종속성 판단요소에 비추어, 근로기준법상 근로자에 해당할 가능성이 높습니다. 계약 형식과 무관하게 실질적 근로관계가 인정될 수 있습니다.',
        riskWarning: {
          title: '⚠️ 근로자 판정 가능성이 높습니다',
          description:
            '현재 3.3% 사업소득으로 처리 중이라면, 4대보험 미가입 소급분 + 퇴직금 + 연차수당 미지급분이 발생할 수 있습니다. 근로감독 시 즉시 시정명령 대상이며, 자진신고 시 과태료 50% 감면이 가능합니다.',
          estimatedCost:
            '인건비 대비 연간 약 30% 추가 소요 가능 (국민연금 9% + 건강보험 7.09% + 고용보험 1.8% + 산재보험 업종별 + 퇴직금 8.3%)',
          ctaText: '무료 리스크 산정 상담 신청',
          ctaType: 'urgent',
        },
      }
    case 'gray':
      return {
        title: '판단 유보 (회색지대)',
        icon: '⚠️',
        sub: '근로자·프리랜서 양측 요소가 혼재합니다. 개별 사실관계에 따라 결론이 달라질 수 있어, 노무사·변호사 등 전문가의 정밀 분석이 필요합니다.',
        riskWarning: {
          title: '🔍 회색지대 — 계약서와 실제 근무조건 간 괴리 가능성',
          description:
            '계약 형식은 프리랜서이나 실질적으로 근로자에 해당할 수 있는 요소가 발견되었습니다. 근로감독 시 지적 가능성이 높은 영역이 있으며, 사전 점검으로 리스크를 사전 차단할 수 있습니다.',
          estimatedCost: '소급 적용 시 최대 3년분 4대보험 + 퇴직금 일시 청구 가능',
          ctaText: '무료 사전 점검 신청',
          ctaType: 'moderate',
        },
      }
    case 'freelancer':
      return {
        title: '프리랜서(사업자) 가능성 높음',
        icon: '📋',
        sub: '독립적 사업 수행의 특성이 강하여, 근로기준법상 근로자로 인정되기 어려울 가능성이 높습니다. 다만 실질관계 변동 시 재진단이 필요합니다.',
        riskWarning: {
          title: '✅ 프리랜서(사업자) 판정 가능성이 높습니다',
          description:
            '다만, 형식적 계약과 실질 근무조건이 일치하는지 정기적 점검이 권장됩니다. 근로자 추정제 시행 이후 기준이 강화되고 있어, 현재 계약 구조가 향후에도 유효한지 확인이 필요합니다.',
          estimatedCost: '',
          ctaText: '계약 구조 무료 점검 신청',
          ctaType: 'info',
        },
      }
  }
}

export function getBarColor(pct: number): string {
  if (pct >= 65) return '#a85a66'
  if (pct >= 40) return '#9a8468'
  return '#5a8f78'
}
