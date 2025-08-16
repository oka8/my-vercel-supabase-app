import { ReactNode } from 'react'
import { useAsyncOperation } from '@/hooks/useAsyncOperation'

interface AsyncOperationState<T> {
  data: T | null
  loading: boolean
  error: string | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  execute: (...args: Args) => Promise<T | undefined>
  reset: () => void
}

interface AsyncOperationProviderProps<T, Args extends unknown[]> {
  asyncFunction: (...args: Args) => Promise<T>
  children: (state: AsyncOperationState<T>) => ReactNode
  onSuccess?: () => void
  onError?: (error: Error) => void
  initialData?: T
}

export function AsyncOperationProvider<T, Args extends unknown[]>({
  asyncFunction,
  children,
  onSuccess,
  onError,
  initialData
}: AsyncOperationProviderProps<T, Args>) {
  const asyncState = useAsyncOperation(asyncFunction, {
    onSuccess,
    onError,
    initialData
  })

  return <>{children(asyncState)}</>
}