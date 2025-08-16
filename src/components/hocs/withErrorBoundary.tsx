import { ComponentType, ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

interface WithErrorBoundaryOptions {
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) {
  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary 
        fallback={options.fallback}
        onError={options.onError}
      >
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  // Preserve display name for debugging
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}