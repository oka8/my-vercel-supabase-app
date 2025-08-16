import { useState, useCallback, useRef, useEffect } from 'react'
import { useError } from '@/hooks/useError'
import { ErrorType, ErrorSeverity } from '@/types'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseAsyncOperationOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  initialData?: unknown
}

export function useAsyncOperation<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOperationOptions = {}
) {
  const { handleError } = useError()
  const [state, setState] = useState<AsyncState<T>>({
    data: (options.initialData as T) || null,
    loading: false,
    error: null
  })

  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const execute = useCallback(async (...args: Args): Promise<T | undefined> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await asyncFunction(...args)
      
      if (mountedRef.current) {
        setState({ data: result, loading: false, error: null })
        options.onSuccess?.()
      }
      
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (mountedRef.current) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }))
      }

      // Add to global error store
      handleError(error, {
        context: 'async_operation',
        function: asyncFunction.name
      })

      options.onError?.(error as Error)
      throw error
    }
  }, [asyncFunction, handleError, options])

  const reset = useCallback(() => {
    setState({
      data: (options.initialData as T) || null,
      loading: false,
      error: null
    })
  }, [options.initialData])

  return {
    ...state,
    execute,
    reset,
    isLoading: state.loading,
    isError: !!state.error,
    isSuccess: !state.loading && !state.error && state.data !== null
  }
}