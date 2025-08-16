'use client'

import { useEffect } from 'react'
import { trackWebVitals } from '@/utils/performance'

export function PerformanceMonitor() {
  useEffect(() => {
    trackWebVitals()
  }, [])

  return null
}