import { useEffect, useState } from 'react'

/**
 * 전체 페이지 공통 고정(floating) 상담 신청 버튼 — 애플 블루 CTA, 우하단 고정
 * App.tsx가 createBrowserRouter(RouterProvider)를 사용해 이 컴포넌트는 Router 컨텍스트
 * 밖(형제 노드)에 렌더링되므로, react-router-dom의 Link 대신 일반 <a> 태그와
 * window.location 기반 경로 추적을 사용한다(라우터 구조 변경 없이 안전하게 추가하기 위함).
 */
export default function FloatingConsultButton() {
  const [pathname, setPathname] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/',
  )

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', updatePathname)
    // 클라이언트 라우팅(pushState)도 감지하기 위해 주기적으로 짧게 체크
    const interval = setInterval(updatePathname, 500)
    return () => {
      window.removeEventListener('popstate', updatePathname)
      clearInterval(interval)
    }
  }, [])

  // 상담 신청 페이지 자체에서는 숨김(이미 해당 페이지에 있으므로 중복 방지)
  if (pathname === '/consult') return null

  return (
    <a
      href="/consult"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(49,130,246,0.4)] transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-[0_10px_28px_rgba(49,130,246,0.45)] sm:bottom-6 sm:right-6 sm:px-6 sm:py-4 sm:text-base"
      aria-label="상담 신청하기"
    >
      <span aria-hidden>💬</span>
      <span>상담 신청</span>
    </a>
  )
}
