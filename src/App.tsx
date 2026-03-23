import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'

/** 정적 import 시 진단 번들 오류가 랜딩까지 막을 수 있어 지연 로드 */
const DiagnosisPage = lazy(() => import('./pages/DiagnosisPage'))

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
  return <RouterProvider router={router} />
}
