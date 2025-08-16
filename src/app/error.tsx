'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        
        {error.digest && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  )
}