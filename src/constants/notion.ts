/**
 * 비대면 상담(Notion) — 앱 전체에서 이 값만 사용합니다.
 * 배포 후 링크가 다르면: Vercel 등에서 `VITE_NOTION_REMOTE_CONSULT_URL` 이 옛값으로 설정돼 있는지 확인 후 삭제하거나 아래와 동일하게 맞추세요.
 */
export const NOTION_REMOTE_CONSULT_URL_DEFAULT =
  'https://north-saffron-5b7.notion.site/cc7a5b60e4104ef697435cbf880d8341'

function trimUrl(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t.length > 0 ? t : undefined
}

/** 환경 변수가 유효한 http(s)일 때만 사용, 아니면 기본 Notion URL */
export const NOTION_REMOTE_CONSULT_URL: string = (() => {
  const fromEnv = trimUrl(import.meta.env.VITE_NOTION_REMOTE_CONSULT_URL)
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    return fromEnv
  }
  return NOTION_REMOTE_CONSULT_URL_DEFAULT
})()
