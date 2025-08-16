'use client'

import { lazy, Suspense } from 'react'
import type { ErrorNotificationsProps } from '@/types/components'

const ErrorNotifications = lazy(() => 
  import('@/components/features/ErrorNotifications').then(module => ({
    default: module.ErrorNotifications
  }))
)

export function LazyErrorNotifications(props: ErrorNotificationsProps) {
  return (
    <Suspense fallback={null}>
      <ErrorNotifications {...props} />
    </Suspense>
  )
}