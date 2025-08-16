'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Critical Error
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A critical error occurred that affected the entire application. This may be due to a network issue or server problem.
            </p>
            
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-mono">
                Error ID: {error.digest}
              </p>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Home className="h-4 w-4" />
                Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}