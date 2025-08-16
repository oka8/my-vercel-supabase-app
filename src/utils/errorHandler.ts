import { AppError, ErrorType, ErrorSeverity } from '@/types'

export function createErrorId(): string {
  return `error_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

interface CreateAppErrorOptions {
  readonly details?: string
  readonly code?: string | number
  readonly stack?: string
  readonly context?: Readonly<Record<string, unknown>>
}

export function createAppError(
  type: ErrorType,
  severity: ErrorSeverity,
  message: string,
  options?: CreateAppErrorOptions
): AppError {
  if (!message.trim()) {
    throw new Error('Error message cannot be empty')
  }

  return {
    id: createErrorId(),
    type,
    severity,
    message: message.trim(),
    timestamp: new Date(),
    ...options
  }
}

export function parseSupabaseError(error: unknown): AppError {
  const errorWithMessage = error as { 
    message?: string
    code?: string | number
    details?: string
    stack?: string
  }
  
  if (errorWithMessage?.message) {
    let errorType = ErrorType.UNKNOWN
    let severity = ErrorSeverity.MEDIUM
    
    if (errorWithMessage.message.includes('network') || errorWithMessage.message.includes('fetch')) {
      errorType = ErrorType.NETWORK
      severity = ErrorSeverity.HIGH
    } else if (errorWithMessage.message.includes('auth') || errorWithMessage.message.includes('session')) {
      errorType = ErrorType.AUTHENTICATION
      severity = ErrorSeverity.MEDIUM
    } else if (errorWithMessage.message.includes('permission') || errorWithMessage.message.includes('unauthorized')) {
      errorType = ErrorType.AUTHORIZATION
      severity = ErrorSeverity.MEDIUM
    }
    
    return createAppError(
      errorType,
      severity,
      errorWithMessage.message,
      {
        ...(errorWithMessage.code && { code: errorWithMessage.code }),
        ...(errorWithMessage.details && { details: errorWithMessage.details }),
        ...(errorWithMessage.stack && { stack: errorWithMessage.stack }),
        context: {
          supabaseError: true,
          originalError: error
        }
      }
    )
  }
  
  return createAppError(
    ErrorType.UNKNOWN,
    ErrorSeverity.MEDIUM,
    'An unknown Supabase error occurred',
    {
      context: { originalError: error }
    }
  )
}

export function parseNetworkError(error: unknown): AppError {
  const errorWithMessage = error as { message?: string }
  
  return createAppError(
    ErrorType.NETWORK,
    ErrorSeverity.HIGH,
    'Network connection failed',
    {
      details: errorWithMessage?.message || 'Unable to connect to the server',
      context: { originalError: error }
    }
  )
}

export function logError(error: AppError): void {
  const logLevel = getLogLevel(error.severity)
  const message = `[${error.type.toUpperCase()}] ${error.message}`
  
  switch (logLevel) {
    case 'error':
      console.error(message, error)
      break
    case 'warn':
      console.warn(message, error)
      break
    case 'info':
      console.info(message, error)
      break
    default:
      console.log(message, error)
  }
}

function getLogLevel(severity: ErrorSeverity): 'error' | 'warn' | 'info' | 'log' {
  switch (severity) {
    case ErrorSeverity.CRITICAL:
    case ErrorSeverity.HIGH:
      return 'error'
    case ErrorSeverity.MEDIUM:
      return 'warn'
    case ErrorSeverity.LOW:
      return 'info'
    default:
      return 'log'
  }
}

export function getErrorDisplayMessage(error: AppError): string {
  switch (error.type) {
    case ErrorType.NETWORK:
      return 'Connection problem. Please check your internet connection and try again.'
    case ErrorType.AUTHENTICATION:
      return 'Authentication failed. Please log in again.'
    case ErrorType.AUTHORIZATION:
      return 'You don\'t have permission to perform this action.'
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.'
    case ErrorType.SERVER:
      return 'Server error. Please try again later.'
    default:
      return error.message || 'An unexpected error occurred.'
  }
}