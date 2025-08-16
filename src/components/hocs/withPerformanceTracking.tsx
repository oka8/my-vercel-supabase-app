import { ComponentType, useEffect, useMemo } from 'react'
import { measurePerformance } from '@/utils/performance'

interface WithPerformanceTrackingOptions {
  componentName?: string
  enableInProduction?: boolean
  logRenders?: boolean
}

export function withPerformanceTracking<P extends object>(
  Component: ComponentType<P>,
  options: WithPerformanceTrackingOptions = {}
) {
  const {
    componentName = Component.displayName || Component.name || 'Component',
    enableInProduction = false,
    logRenders = false
  } = options

  const WrappedComponent = (props: P) => {
    // Only track performance in development or when explicitly enabled
    const shouldTrack = process.env.NODE_ENV === 'development' || enableInProduction

    const performance = useMemo(() => {
      if (!shouldTrack) return null
      return measurePerformance(`${componentName}-render`)
    }, [shouldTrack])

    useEffect(() => {
      if (!shouldTrack || !performance) return

      performance.start()
      
      return () => {
        performance.end()
      }
    })

    useEffect(() => {
      if (logRenders && shouldTrack) {
        console.log(`🔄 ${componentName} rendered with props:`, props)
      }
    })

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withPerformanceTracking(${componentName})`

  return WrappedComponent
}