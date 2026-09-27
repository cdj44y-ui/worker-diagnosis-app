// Tally 문의 폼 연동 헬퍼 (RISK119·SAFE119와 동일한 공용 폼을 사용해 상담 접수를 한 곳에서 관리)
// 폼: https://tally.so/forms/GxZyzz (노무 상담 문의 · 조대진 노무사)
export const TALLY_FORM_ID = 'GxZyzz'

function buildParams(prefill: Record<string, string | undefined> = {}) {
  const params = new URLSearchParams()
  Object.entries(prefill).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    params.set(key, String(value))
  })
  return params
}

/** 새 탭에서 여는 Tally 응답 URL (score/area/grade 값을 hidden field로 전달) */
export function buildTallyUrl(prefill: Record<string, string | undefined> = {}): string {
  const params = buildParams(prefill)
  const qs = params.toString()
  return `https://tally.so/r/${TALLY_FORM_ID}${qs ? `?${qs}` : ''}`
}

/** 페이지에 인라인으로 삽입할 Tally 임베드 URL */
export function buildTallyEmbedUrl(prefill: Record<string, string | undefined> = {}): string {
  const params = buildParams({
    alignLeft: '1',
    hideTitle: '1',
    transparentBackground: '1',
    dynamicHeight: '1',
    ...prefill,
  })
  return `https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}`
}
