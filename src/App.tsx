import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ConsultPage from './pages/ConsultPage'
import FloatingConsultButton from './components/FloatingConsultButton'
import FamilyBar from './components/brand/FamilyBar'
import BrandFooter from './components/brand/BrandFooter'

/** 정적 import 시 진단 번들 오류가 랜딩까지 막을 수 있어 지연 로드 */
/** 2026-10-18: 새 배포 후 이전 화면에서 진단을 누르면 옛 파일을 찾지 못해 오류가 나던 문제 — 1회 자동 새로고침으로 복구 */
const DiagnosisPage = lazy(() =>
  import('./pages/DiagnosisPage').catch((err) => {
    const key = 'free119_chunk_reload'
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1')
      window.location.reload()
      return new Promise<never>(() => {})
    }
    throw err
  }),
)

function DiagnosisFallback() {
  return (
    <div className="min-h-screen bg-apple-bg flex items-center justify-center px-4">
      <p className="text-[14px] text-apple-secondary">진단 화면을 불러오는 중…</p>
    </div>
  )
}

/** useBlocker는 Data Router(createBrowserRouter) 안에서만 동작 */
const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/consult', element: <ConsultPage /> },
  {
    path: '/diagnosis',
    element: (
      <Suspense fallback={<DiagnosisFallback />}>
        <DiagnosisPage />
      </Suspense>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return (
    <>
      <FamilyBar />
      <RouterProvider router={router} />
      <BrandFooter />
      <FloatingConsultButton />
    </>
  )
}
