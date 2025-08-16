import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AppError, ErrorStore, ErrorState, ErrorSeverity, ErrorType } from '@/types'
import { logError } from '@/utils/errorHandler'

const initialState: ErrorState = {
  errors: [],
  lastError: null,
} as const

export const useErrorStore = create<ErrorStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      addError: (errorData: Omit<AppError, 'id' | 'timestamp'>): void => {
        const error: AppError = {
          ...errorData,
          id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        }
        
        logError(error)
        
        set((state) => ({
          errors: [...state.errors, error],
          lastError: error,
        }), false, 'addError')
        
        if (error.severity === ErrorSeverity.CRITICAL) {
          console.error('Critical error detected:', error)
        }
      },
      
      removeError: (id: string): void => {
        set((state) => ({
          errors: state.errors.filter(error => error.id !== id),
          lastError: state.lastError?.id === id ? null : state.lastError,
        }), false, 'removeError')
      },
      
      clearErrors: (): void => {
        set(initialState, false, 'clearErrors')
      },
      
      getErrorsByType: (type: ErrorType): AppError[] => {
        return get().errors.filter(error => error.type === type)
      },
      
      getErrorsBySeverity: (severity: ErrorSeverity): AppError[] => {
        return get().errors.filter(error => error.severity === severity)
      },
    }),
    {
      name: 'error-store',
    }
  )
)