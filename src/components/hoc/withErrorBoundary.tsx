import { Component, ComponentType, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">エラーが発生しました</h3>
          <p className="text-red-600 text-sm mb-3">
            {this.state.error?.message || '予期しないエラーが発生しました'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            再試行
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends Record<string, unknown>>(
  Component: ComponentType<P>
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundaryWrapper>
        <Component {...props} />
      </ErrorBoundaryWrapper>
    )
  }
}