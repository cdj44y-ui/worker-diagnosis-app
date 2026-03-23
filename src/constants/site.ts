/**
 * 프로덕션 공개 URL (OG·공유·사이트맵과 동일하게 유지)
 * Vercel 등에서 다른 도메인을 쓰면 VITE_SITE_URL 로 덮어쓸 수 있음.
 */
const trimmed = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')

export const SITE_ORIGIN = trimmed && trimmed.length > 0 ? trimmed : 'https://free119.site'
