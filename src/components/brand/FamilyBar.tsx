import { FAMILY_NAME, FAMILY_LINKS, SITE_NAME } from './brand'

/** A1 상단 패밀리 바 — 네 사이트 동일(높이 40px·흰 바탕·14px) */
export default function FamilyBar() {
  return (
    <div className="h-10 border-b border-[#E5E7EB] bg-white text-[14px] no-print [word-break:keep-all]">
      <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-4 md:px-8">
        <p className="truncate text-[#111827]"><a href="https://risk119.site/winners.html" className="font-bold text-[#1F4E79] hover:underline">{FAMILY_NAME}</a> · <b>{SITE_NAME}</b></p>
        <nav className="flex shrink-0 items-center gap-5" aria-label="노무법인 위너스 기준진단 사이트">
          <a href="https://risk119.site/winners.html" className="font-bold text-[#1F4E79] hover:underline">회사 소개</a>
          {FAMILY_LINKS.filter((l) => l.key !== SITE_NAME).map((l) => (
            <a key={l.key} href={l.url} target="_blank" rel="noopener noreferrer" className="hidden text-[#4B5563] hover:text-[#1F4E79] hover:underline md:inline">{l.label}</a>
          ))}
        </nav>
      </div>
    </div>
  )
}
