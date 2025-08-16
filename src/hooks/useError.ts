import { useErrorStore } from '@/lib/stores/errorStore'
import { AppError, ErrorType, ErrorSeverity } from '@/types'
import { createAppError, parseSupabaseError, parseNetworkError } from '@/utils/errorHandler'

export function useError() {
  const store = useErrorStore()
  
  const handleError = (error: unknown, context?: Record<string, unknown>) => {
    let appError: AppError
    
    const errorMessage = (error as { message?: string })?.message
    
    if (errorMessage && errorMessage.includes('supabase')) {
      appError = parseSupabaseError(error)
    } else if (errorMessage && (errorMessage.includes('fetch') || errorMessage.includes('network'))) {
      appError = parseNetworkError(error)
    } else if (error instanceof Error) {
      appError = createAppError(
        ErrorType.CLIENT,
        ErrorSeverity.MEDIUM,
        error.message,
        {
          ...(error.stack && { stack: error.stack }),
          ...(context && { context })
        }
      )
    } else if (typeof error === 'string') {
      appError = createAppError(
        ErrorType.UNKNOWN,
        ErrorSeverity.LOW,
        error,
        { ...(context && { context }) }
      )
    } else {
      appError = createAppError(
        ErrorType.UNKNOWN,
        ErrorSeverity.MEDIUM,
        'An unknown error occurred',
        { context: { originalError: error, ...context } }
      )
    }
    
    store.addError(appError)
    return appError
  }
  
  const handleSupabaseError = (error: unknown, context?: Record<string, unknown>) => {
    const appError = parseSupabaseError(error)
    if (context) {
      appError.context = { ...appError.context, ...context }
    }
    store.addError(appError)
    return appError
  }
  
  const handleNetworkError = (error: unknown, context?: Record<string, unknown>) => {
    const appError = parseNetworkError(error)
    if (context) {
      appError.context = { ...appError.context, ...context }
    }
    store.addError(appError)
    return appError
  }
  
  const createError = (
    type: ErrorType,
    severity: ErrorSeverity,
    message: string,
    options?: {
      details?: string
      code?: string | number
      context?: Record<string, unknown>
    }
  ) => {
    const appError = createAppError(type, severity, message, options)
    store.addError(appError)
    return appError
  }
  
  return {
    errors: store.errors,
    lastError: store.lastError,
    handleError,
    handleSupabaseError,
    handleNetworkError,
    createError,
    removeError: store.removeError,
    clearErrors: store.clearErrors,
    getErrorsByType: store.getErrorsByType,
    getErrorsBySeverity: store.getErrorsBySeverity,
  }
}