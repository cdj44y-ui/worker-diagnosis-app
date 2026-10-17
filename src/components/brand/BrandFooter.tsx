import { FAMILY_NAME, FAMILY_LINKS, PROMISE, KAKAO_CHANNEL_URL } from './brand'

/** A5 공통 푸터 — 네 사이트 동일 문구·순서 */
export default function BrandFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-10 text-[14px] leading-[1.75] text-[#4B5563] no-print [word-break:keep-all]">
      <div className="mx-auto max-w-[1120px] space-y-3 px-6 md:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <b className="text-[15px] text-[#1F4E79]">{FAMILY_NAME}</b>
          {FAMILY_LINKS.map((l) => (
            <a key={l.key} href={l.url} className="hover:text-[#1F4E79] hover:underline">{l.label}</a>
          ))}
        </div>
        <p className="font-semibold text-[#111827]">{PROMISE}</p>
        <p>노무법인 위너스 | 대표노무사 조대진 | 사업자등록번호 134-85-60666</p>
        <p>서울시 강서구 마곡중앙로 171, 304호 | Tel. <a href="tel:0221380240" className="hover:underline">02-2138-0240</a> | Email. <a href="mailto:cdj44y@gmail.com" className="hover:underline">cdj44y@gmail.com</a></p>
        <p>본 자가진단은 법령·판례·공개 자료에 근거한 참고용 점검이며 법적 효력이 없습니다. 개별 사안은 전문가 검토가 필요합니다.</p>
        <p><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[#FEE500] px-4 py-1.5 text-[13px] font-bold text-[#391B1B] hover:bg-[#F5D800]">법 바뀌기 전에 먼저 알기 — 카카오 채널 추가</a></p>
        <p className="text-[#6B7280]">© 2026 노무법인 위너스</p>
      </div>
    </footer>
  )
}
