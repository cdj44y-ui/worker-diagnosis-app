import { Link } from 'react-router-dom'

/** 홈 15초 소개 영상 — 진단 문항·점수 로직과 무관한 노출용 섹션 */
export default function IntroVideo() {
  return (
    <section id="intro-video" className="mb-10">
      <p className="text-[11px] font-semibold text-apple-secondary uppercase tracking-[0.18em] text-center mb-1">Intro</p>
      <h2 className="text-[22px] sm:text-[26px] font-semibold text-apple-text tracking-tight text-center">
        15초로 보는 FREE119
      </h2>
      <p className="text-[14px] sm:text-[15px] text-apple-secondary leading-relaxed text-center mt-2">
        프리랜서인가, 근로자인가. 막막함에서 기준으로, 스스로 점검해 보세요.
      </p>
      <div className="mt-6 rounded-apple-lg border border-apple-border bg-apple-surface shadow-apple-md overflow-hidden">
        <video
          className="block w-full aspect-video bg-apple-bg"
          src="/video/free119-intro.mp4"
          poster="/video/free119-intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="FREE119 소개 영상: 근로자성 자가진단 안내"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-apple-border px-5 py-4">
          <p className="text-[13px] text-apple-secondary">
            <span className="font-semibold text-apple-text">조대진 대표노무사</span> · 노무법인 위너스 · 근로자성 자문
          </p>
          <Link
            to="/diagnosis"
            className="shrink-0 inline-flex items-center justify-center min-h-[40px] px-5 rounded-full border border-[#00796B] text-[#00796B] text-[14px] font-semibold transition-colors hover:bg-[#E0F2F1]"
          >
            바로 진단 시작하기 →
          </Link>
        </div>
      </div>
    </section>
  )
}
