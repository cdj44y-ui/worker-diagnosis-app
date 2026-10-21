import { Link } from 'react-router-dom'

/** 홈 15초 소개 영상 — 진단 문항·점수 로직과 무관한 노출용 섹션 */
export default function IntroVideo() {
  return (
    <section id="intro-video" className="mb-4">
            <details className="rounded-apple-lg border border-apple-border bg-apple-surface">
        <summary className="flex min-h-[48px] cursor-pointer items-center px-5 text-[17px] font-semibold text-apple-text">15초 소개 영상 보기</summary>
      <div className="px-3 pb-3 pt-1 rounded-apple-lg border border-apple-border bg-apple-surface overflow-hidden">
        <video
          className="block w-full aspect-video bg-apple-bg"
          src="/video/free119-intro.mp4"
          poster="/video/free119-intro-poster.jpg"
          muted
          loop
          playsInline
          controls
          preload="none"
          aria-label="FREE119 소개 영상: 근로자성 자가진단 안내"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-apple-border px-5 py-4">
          <p className="text-[14px] text-apple-secondary">
            <span className="font-semibold text-apple-text">조대진 대표노무사</span> · 노무법인 위너스 · 근로자성 자문
          </p>
          <Link
            to="/diagnosis"
            className="shrink-0 inline-flex items-center justify-center min-h-[40px] px-5 rounded-full border border-[#2F5D50] text-[#2F5D50] text-[14px] font-semibold transition-colors hover:bg-[#E0F2F1]"
          >
            진단 시작하기 →
          </Link>
        </div>
      </div>
      </details>
    </section>
  )
}
