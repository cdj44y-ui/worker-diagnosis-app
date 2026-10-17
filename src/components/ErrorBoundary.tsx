import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = { hasError: boolean; message: string }

/** 프로덕션에서도 런타임 오류 시 흰 화면 대신 안내 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message || '알 수 없는 오류' }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    if (/dynamically imported module|Importing a module script failed|MIME type|Loading chunk/i.test(err.message) && !sessionStorage.getItem('free119_chunk_reload')) {
      sessionStorage.setItem('free119_chunk_reload', '1')
      window.location.reload()
      return
    }
    console.error('[ErrorBoundary]', err, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[18px] font-semibold mb-2">페이지를 불러오지 못했습니다</p>
          <p className="text-[15px] text-neutral-600 mb-3">사이트가 방금 업데이트되었을 수 있습니다. 새로고침하면 대부분 해결됩니다.</p>
          <p className="text-[13px] text-neutral-600 mb-6 max-w-md break-words">{this.state.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-[#00796B] text-white text-[15px] font-medium"
          >
            새로고침
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
