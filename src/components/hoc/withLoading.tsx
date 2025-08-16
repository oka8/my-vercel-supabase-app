import { ComponentType } from 'react'

interface WithLoadingProps {
  isLoading: boolean
}

export function withLoading<P extends Record<string, unknown>>(
  Component: ComponentType<P>
) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, ...componentProps } = props

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">読み込み中...</span>
        </div>
      )
    }

    return <Component {...componentProps as P} />
  }
}