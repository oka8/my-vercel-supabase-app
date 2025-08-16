'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useErrorStore } from '@/lib/stores/errorStore'
import { ErrorType, ErrorSeverity } from '@/types'

interface ErrorContextValue {
  errors: Array<{ id: string; message: string; type: string }>
  addError: (message: string, type?: 'error' | 'warning' | 'info') => void
  removeError: (id: string) => void
  clearErrors: () => void
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

interface ErrorProviderProps {
  children: ReactNode
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const errorStore = useErrorStore()

  const handleAddError = (message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    const severity = type === 'error' ? ErrorSeverity.HIGH : 
                     type === 'warning' ? ErrorSeverity.MEDIUM : 
                     ErrorSeverity.LOW

    errorStore.addError({
      message,
      type: ErrorType.USER,
      severity,
      code: 'USER_ERROR'
    })
  }

  const contextValue: ErrorContextValue = {
    errors: errorStore.errors.map(error => ({
      id: error.id,
      message: error.message,
      type: error.type
    })),
    addError: handleAddError,
    removeError: errorStore.removeError,
    clearErrors: errorStore.clearErrors
  }

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useError() {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}