// Re-export API types
export type * from './api'
export type * from './database'

export interface ConnectionState {
  isConnected: boolean
  loading: boolean
  error: string | null
  lastChecked: Date | null
}

export interface ConnectionStore extends ConnectionState {
  setConnectionState: (state: Partial<ConnectionState>) => void
  checkConnection: () => Promise<void>
  reset: () => void
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ErrorType {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}

export interface AppError {
  id: string
  type: ErrorType
  severity: ErrorSeverity
  message: string
  details?: string
  code?: string | number
  timestamp: Date
  stack?: string
  context?: Record<string, unknown>
}

export interface ErrorState {
  errors: AppError[]
  lastError: AppError | null
}

export interface ErrorStore extends ErrorState {
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void
  removeError: (id: string) => void
  clearErrors: () => void
  getErrorsByType: (type: ErrorType) => AppError[]
  getErrorsBySeverity: (severity: ErrorSeverity) => AppError[]
}