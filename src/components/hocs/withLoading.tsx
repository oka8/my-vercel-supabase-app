import { ComponentType, ReactNode } from 'react'

interface WithLoadingProps {
  isLoading?: boolean
}

interface WithLoadingOptions {
  fallback?: ReactNode
  delay?: number
}

export function withLoading<P extends object>(
  Component: ComponentType<P>,
  options: WithLoadingOptions = {}
) {
  const { 
    fallback = (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    ),
    delay = 0
  } = options

  const WrappedComponent = (props: P & WithLoadingProps) => {
    const { isLoading, ...componentProps } = props

    if (isLoading) {
      if (delay > 0) {
        // For delayed loading states
        return (
          <div style={{ animationDelay: `${delay}ms` }}>
            {fallback}
          </div>
        )
      }
      return <>{fallback}</>
    }

    return <Component {...(componentProps as P)} />
  }

  WrappedComponent.displayName = `withLoading(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}