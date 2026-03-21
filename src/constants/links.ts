/** 비대면 문의 (Notion) */
export const NOTION_REMOTE_CONSULT_URL =
  'https://north-saffron-5b7.notion.site/cc7a5b60e4104ef697435cbf880d8341'

/**
 * 근로감독 자가진단(사업장·노동법 준수 점검) — labor-inspection-app 배포 URL
 * 배포 주소가 다르면 `.env`에 `VITE_LABOR_INSPECTION_URL` 로 지정
 */
export const LABOR_INSPECTION_DIAGNOSIS_URL =
  import.meta.env.VITE_LABOR_INSPECTION_URL ?? 'https://risk119.site'
