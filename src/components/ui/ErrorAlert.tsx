import { AlertTriangle, X, Info, AlertCircle, XCircle } from 'lucide-react'
import { ErrorSeverity } from '@/types'
import { getErrorDisplayMessage } from '@/utils/errorHandler'
import type { ErrorAlertProps } from '@/types/components'

export function ErrorAlert({ error, onDismiss, showDetails = false }: ErrorAlertProps) {
  const getSeverityStyles = (severity: ErrorSeverity) => {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return {
          container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          icon: 'text-red-500',
          text: 'text-red-800 dark:text-red-200'
        }
      case ErrorSeverity.HIGH:
        return {
          container: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
          icon: 'text-orange-500',
          text: 'text-orange-800 dark:text-orange-200'
        }
      case ErrorSeverity.MEDIUM:
        return {
          container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-500',
          text: 'text-yellow-800 dark:text-yellow-200'
        }
      case ErrorSeverity.LOW:
        return {
          container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          icon: 'text-blue-500',
          text: 'text-blue-800 dark:text-blue-200'
        }
      default:
        return {
          container: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
          icon: 'text-gray-500',
          text: 'text-gray-800 dark:text-gray-200'
        }
    }
  }

  const getSeverityIcon = (severity: ErrorSeverity) => {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return XCircle
      case ErrorSeverity.HIGH:
        return AlertTriangle
      case ErrorSeverity.MEDIUM:
        return AlertCircle
      case ErrorSeverity.LOW:
        return Info
      default:
        return AlertCircle
    }
  }

  const styles = getSeverityStyles(error.severity)
  const IconComponent = getSeverityIcon(error.severity)
  const displayMessage = getErrorDisplayMessage(error)

  return (
    <div className={`rounded-lg border p-4 ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${styles.icon}`} />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${styles.text}`}>
            {error.severity === ErrorSeverity.CRITICAL ? 'Critical Error' : 
             error.severity === ErrorSeverity.HIGH ? 'Error' :
             error.severity === ErrorSeverity.MEDIUM ? 'Warning' : 'Notice'}
          </h3>
          <div className={`mt-2 text-sm ${styles.text}`}>
            <p>{displayMessage}</p>
            {showDetails && error.details && (
              <p className="mt-1 text-xs opacity-75">{error.details}</p>
            )}
            {showDetails && error.code && (
              <p className="mt-1 text-xs font-mono opacity-75">Code: {error.code}</p>
            )}
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-75 ${styles.text}`}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}