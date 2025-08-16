import { ComponentType, ReactNode } from 'react'
import { useConnection } from '@/hooks/useConnection'

interface WithAuthProps {
  requireAuth?: boolean
}

interface WithAuthOptions {
  fallback?: ReactNode
  redirectTo?: string
  loadingFallback?: ReactNode
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    fallback = (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please connect to Supabase to access this content.
          </p>
        </div>
      </div>
    ),
    loadingFallback = (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  } = options

  const WrappedComponent = (props: P & WithAuthProps) => {
    const { requireAuth = true, ...componentProps } = props
    const { isConnected, loading } = useConnection()

    if (loading) {
      return <>{loadingFallback}</>
    }

    if (requireAuth && !isConnected) {
      return <>{fallback}</>
    }

    return <Component {...(componentProps as P)} />
  }

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}