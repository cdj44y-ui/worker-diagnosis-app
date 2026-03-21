/** 비대면 상담 Notion URL — `constants/notion.ts` 에서 export */
export { NOTION_REMOTE_CONSULT_URL, NOTION_REMOTE_CONSULT_URL_DEFAULT } from './notion'

/**
 * 근로감독 자가진단(사업장·노동법 준수 점검) — labor-inspection-app 배포 URL
 * 배포 주소가 다르면 `.env`에 `VITE_LABOR_INSPECTION_URL` 로 지정
 */
export const LABOR_INSPECTION_DIAGNOSIS_URL =
  import.meta.env.VITE_LABOR_INSPECTION_URL ?? 'https://risk119.site'
