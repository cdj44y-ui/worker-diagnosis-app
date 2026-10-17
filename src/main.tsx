import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/globals.css'

// 배포 교체 시 옛 파일 로딩 실패 → 1회 새로고침
window.addEventListener('vite:preloadError', (e) => {
  if (!sessionStorage.getItem('free119_chunk_reload')) {
    e.preventDefault()
    sessionStorage.setItem('free119_chunk_reload', '1')
    window.location.reload()
  }
})
window.setTimeout(() => sessionStorage.removeItem('free119_chunk_reload'), 10000)

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('root 요소(#root)가 없습니다. index.html을 확인하세요.')
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
