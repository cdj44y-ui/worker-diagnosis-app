import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

/** 정적 import 시 진단 번들 오류가 랜딩까지 막을 수 있어 지연 로드 */
const DiagnosisPage = lazy(() => import('./pages/DiagnosisPage'))

function DiagnosisFallback() {
  return (
    <div className="min-h-screen bg-apple-bg flex items-center justify-center px-4">
      <p className="text-[14px] text-apple-secondary">진단 화면을 불러오는 중…</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<DiagnosisFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
