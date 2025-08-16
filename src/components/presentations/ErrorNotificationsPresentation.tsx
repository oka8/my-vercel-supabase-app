import { memo } from 'react'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import type { AppError } from '@/types'

interface ErrorNotificationsPresentationProps {
  errors: AppError[]
  onDismiss: (errorId: string) => void
  showDetails: boolean
}

export const ErrorNotificationsPresentation = memo(function ErrorNotificationsPresentation({
  errors,
  onDismiss,
  showDetails
}: ErrorNotificationsPresentationProps) {
  if (errors.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-full space-y-2">
      {errors.map((error) => (
        <ErrorAlert
          key={error.id}
          error={error}
          onDismiss={() => onDismiss(error.id)}
          showDetails={showDetails}
        />
      ))}
    </div>
  )
})