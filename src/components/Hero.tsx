import { Link } from 'react-router-dom'
import { ChevronRight, Shield } from 'lucide-react'
import SiteNav from './SiteNav'

/** 랜딩 전용 — 판례 사건번호는 노출하지 않음 */
const HIGHLIGHTS = ['5개 영역', '19문항', '추정제 대비 판례 지표', '결과 리포트', '약 5분']

export default function Hero() {
  return (
    <>
      <SiteNav />

      <section className="relative bg-apple-bg pt-14 pb-16 px-5 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[12px] font-semibold text-brand-blue mb-3 tracking-wide uppercase">
            가짜 3.3% · 근로자 추정제 점검
          </p>

          <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-apple-text leading-[1.1] mb-4">
            근로자인가,
            <br />
            프리랜서인가
          </h1>

          <p className="text-[17px] text-apple-secondary leading-relaxed mb-3 max-w-md mx-auto">
            최근 고용부 감독에서도 지적된 <span className="text-apple-text font-semibold">3.3% 사업소득</span>·
            위장고용 이슈. <span className="text-apple-text font-medium">숙박·음식·제조·유통</span> 등 보도상 비중이 큰
            업종을 중심으로, 실무 기준으로{' '}
            <span className="text-apple-text font-medium">5분 안에</span> 스스로 점검해 보세요.
          </p>

          <div className="flex items-start justify-center gap-2 max-w-md mx-auto mb-8 px-3 py-3 rounded-apple-lg bg-brand-blue/[0.07] border border-brand-blue/20 text-left">
            <Shield size={18} className="text-brand-blue shrink-0 mt-0.5" strokeWidth={2} aria-hidden />
            <p className="text-[13px] text-apple-secondary leading-relaxed">
              <span className="text-apple-text font-semibold">근로자 추정제</span> 논의에 대비해, 판례상 자주 쓰이는
              핵심 판단요소 5가지 충족 여부를 결과에서 함께 확인할 수 있습니다. (추정제 법안 요건과 동일하지 않음)
            </p>
          </div>

          <p className="text-[14px] text-apple-tertiary mb-10 max-w-sm mx-auto leading-relaxed">
            진단을 시작하면 문항별 근거·판례 참고가 함께 표시됩니다. (참고용, 법률 자문 아님)
          </p>

          <Link
            to="/diagnosis"
            className="group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white text-[17px] font-medium px-8 py-3.5 rounded-full shadow-apple transition-colors duration-200"
          >
            자가진단 시작하기
            <ChevronRight size={18} className="opacity-80 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <div className="flex flex-wrap gap-2 justify-center mt-10">
            {HIGHLIGHTS.map((b) => (
              <span
                key={b}
                className="text-[11px] font-medium text-apple-secondary bg-apple-surface border border-apple-border px-3 py-1.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
