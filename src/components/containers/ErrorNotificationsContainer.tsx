'use client'

import { useError } from '@/hooks/useError'
import { ErrorNotificationsPresentation } from '@/components/presentations/ErrorNotificationsPresentation'
import type { ErrorSeverity } from '@/types'

interface ErrorNotificationsContainerProps {
  maxVisible?: number
  showDetails?: boolean
  severityFilter?: ErrorSeverity[]
}

export function ErrorNotificationsContainer({
  maxVisible = 3,
  showDetails = false,
  severityFilter
}: ErrorNotificationsContainerProps) {
  const { errors, removeError } = useError()

  const filteredErrors = severityFilter
    ? errors.filter(error => severityFilter.includes(error.severity))
    : errors

  const visibleErrors = filteredErrors
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, maxVisible)

  const handleDismiss = (errorId: string) => {
    removeError(errorId)
  }

  return (
    <ErrorNotificationsPresentation
      errors={visibleErrors}
      onDismiss={handleDismiss}
      showDetails={showDetails}
    />
  )
}