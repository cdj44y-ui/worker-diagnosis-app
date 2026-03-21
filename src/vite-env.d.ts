/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 근로감독 진단 사이트 URL (미설정 시 https://risk119.site) */
  readonly VITE_LABOR_INSPECTION_URL?: string
  /** 비대면 상담 Notion URL (미설정·빈값이면 `constants/notion.ts` 기본값) */
  readonly VITE_NOTION_REMOTE_CONSULT_URL?: string
}
