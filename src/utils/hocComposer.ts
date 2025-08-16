import { ComponentType } from 'react'

type HOC<P = Record<string, unknown>> = (component: ComponentType<Record<string, unknown>>) => ComponentType<P>

/**
 * Compose multiple HOCs into a single HOC
 * Usage: compose(withAuth, withLoading, withErrorBoundary)(Component)
 */
export function compose<P = Record<string, unknown>>(...hocs: HOC<Record<string, unknown>>[]): HOC<P> {
  return (component: ComponentType<Record<string, unknown>>) => {
    return hocs.reduceRight((acc, hoc) => hoc(acc), component) as ComponentType<P>
  }
}

/**
 * Pipe HOCs from left to right (more intuitive order)
 * Usage: pipe(withAuth, withLoading, withErrorBoundary)(Component)
 */
export function pipe<P = Record<string, unknown>>(...hocs: HOC<Record<string, unknown>>[]): HOC<P> {
  return (component: ComponentType<Record<string, unknown>>) => {
    return hocs.reduce((acc, hoc) => hoc(acc), component) as ComponentType<P>
  }
}

/**
 * Apply HOCs conditionally
 * Usage: conditional(shouldUseAuth, withAuth)(Component)
 */
export function conditional<P = Record<string, unknown>>(
  condition: boolean | (() => boolean),
  hoc: HOC<P>
): HOC<P> {
  return (component: ComponentType<Record<string, unknown>>) => {
    const shouldApply = typeof condition === 'function' ? condition() : condition
    return shouldApply ? hoc(component) : component as ComponentType<P>
  }
}

/**
 * Apply HOC only in development
 * Usage: devOnly(withPerformanceTracking)(Component)
 */
export function devOnly<P = Record<string, unknown>>(hoc: HOC<P>): HOC<P> {
  return conditional(process.env.NODE_ENV === 'development', hoc)
}

/**
 * Apply HOC only in production
 * Usage: prodOnly(withErrorReporting)(Component)
 */
export function prodOnly<P = Record<string, unknown>>(hoc: HOC<P>): HOC<P> {
  return conditional(process.env.NODE_ENV === 'production', hoc)
}