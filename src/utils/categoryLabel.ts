import type { Category } from '../types'

/** 진행 바 등 — 괄호 앞 짧은 이름 (예: "사용종속성 (지휘·감독)" → "사용종속성") */
export function shortCategoryTitle(cat: Category): string {
  const m = cat.title.match(/^([^(]+)/)
  return (m ? m[1] : cat.title).trim()
}
