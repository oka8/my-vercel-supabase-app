// Performance utilities for optimization

type DebounceFunction = (...args: unknown[]) => void
type ThrottleFunction = (...args: unknown[]) => void

export function debounce<T extends DebounceFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  if (wait < 0) {
    throw new Error('Wait time must be non-negative')
  }

  let timeout: NodeJS.Timeout | undefined
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends ThrottleFunction>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  if (limit <= 0) {
    throw new Error('Limit must be positive')
  }

  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Cache with TTL
export class Cache<T> {
  private readonly cache = new Map<string, { readonly value: T; readonly expiry: number }>()
  private readonly defaultTTL: number

  constructor(defaultTTL: number = 60000) {
    if (defaultTTL <= 0) {
      throw new Error('Default TTL must be positive')
    }
    this.defaultTTL = defaultTTL
  }

  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    if (!key.trim()) {
      throw new Error('Cache key cannot be empty')
    }
    if (ttl <= 0) {
      throw new Error('TTL must be positive')
    }

    const expiry = Date.now() + ttl
    this.cache.set(key.trim(), { value, expiry })
  }

  get(key: string): T | null {
    if (!key.trim()) {
      return null
    }

    const item = this.cache.get(key.trim())
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key.trim())
      return null
    }

    return item.value
  }

  has(key: string): boolean {
    if (!key.trim()) {
      return false
    }
    
    const item = this.cache.get(key.trim())
    if (!item) return false

    if (Date.now() > item.expiry) {
      this.cache.delete(key.trim())
      return false
    }

    return true
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): boolean {
    if (!key.trim()) {
      return false
    }
    return this.cache.delete(key.trim())
  }

  get size(): number {
    // Clean up expired entries before returning size
    this.cleanupExpired()
    return this.cache.size
  }

  private cleanupExpired(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Performance measurement
export function measurePerformance(name: string) {
  return {
    start: () => performance.mark(`${name}-start`),
    end: () => {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      const measures = performance.getEntriesByName(name)
      const measure = measures[0]
      if (measure) {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
        return measure.duration
      }
      console.warn(`No performance measure found for ${name}`)
      return 0
    },
  }
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(console.log)
      onINP(console.log)
      onFCP(console.log)
      onLCP(console.log)
      onTTFB(console.log)
    })
  }
}