// Base API response types
export interface ApiResponse<T = unknown> {
  data: T | null
  error: ApiError | null
  success: boolean
}

export interface ApiError {
  message: string
  code?: string | number
  details?: string
  statusCode?: number
}

// Supabase specific response types
export interface SupabaseResponse<T = unknown> {
  data: T | null
  error: SupabaseError | null
  count?: number | null
  status?: number
  statusText?: string
}

export interface SupabaseError {
  message: string
  details?: string
  hint?: string
  code?: string
}

// Auth related types
export interface AuthUser {
  id: string
  email?: string
  phone?: string
  created_at: string
  updated_at: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  last_sign_in_at?: string
  app_metadata: Record<string, unknown>
  user_metadata: Record<string, unknown>
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: AuthUser
}

export interface AuthResponse {
  data: {
    user: AuthUser | null
    session: AuthSession | null
  }
  error: SupabaseError | null
}

// Connection status types
export interface ConnectionStatus {
  isConnected: boolean
  lastChecked: Date | null
  latency?: number
  region?: string
}

// Pagination types
export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Generic CRUD operation types
export type CreateParams<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>
export type UpdateParams<T> = Partial<Omit<T, 'id' | 'created_at'>>

// Utility types for API operations
export type AsyncResult<T> = Promise<ApiResponse<T>>
export type AsyncVoidResult = Promise<ApiResponse<void>>

// Filter and sort types
export interface FilterParams {
  [key: string]: string | number | boolean | null | undefined
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

export interface QueryParams extends PaginationParams {
  filters?: FilterParams
  sort?: SortParams[]
  search?: string
}