import type { ReactNode, ComponentProps } from 'react'
import type { AppError, ErrorSeverity } from './index'

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  testId?: string
}

// Button component props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

// Input component props
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  sidebar?: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

// Error display component props
export interface ErrorAlertProps extends BaseComponentProps {
  error: AppError
  onDismiss?: () => void
  showDetails?: boolean
  compact?: boolean
}

export interface ErrorNotificationsProps extends BaseComponentProps {
  maxVisible?: number
  showDetails?: boolean
  severityFilter?: ErrorSeverity[]
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

// Status indicator props
export interface StatusIndicatorProps extends BaseComponentProps {
  loading: boolean
  isConnected: boolean
  service: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// Modal component props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

// Form component props
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>
  loading?: boolean
  disabled?: boolean
  validationSchema?: Record<string, unknown>
}

// Image component props (extending Next.js Image)
export interface OptimizedImageProps extends ComponentProps<'img'> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

// Link component props
export interface LinkProps extends BaseComponentProps {
  href: string
  external?: boolean
  newTab?: boolean
  prefetch?: boolean
  scroll?: boolean
}

// Icon component props
export interface IconProps extends BaseComponentProps {
  name: string
  size?: number | string
  color?: string
  strokeWidth?: number
}

// Generic list component props
export interface ListProps<T> extends BaseComponentProps {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  loading?: boolean
  empty?: ReactNode
  keyExtractor?: (item: T, index: number) => string | number
}

// Search component props
export interface SearchProps extends BaseComponentProps {
  placeholder?: string
  value?: string
  onSearch: (query: string) => void
  debounceMs?: number
  loading?: boolean
  clearable?: boolean
}

// Pagination component props
export interface PaginationProps extends BaseComponentProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
}

// Tooltip component props
export interface TooltipProps extends BaseComponentProps {
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
}

// Generic table component props
export interface TableColumn<T> {
  key: keyof T
  title: string
  render?: (value: T[keyof T], record: T, index: number) => ReactNode
  sortable?: boolean
  width?: string | number
}

export interface TableProps<T> extends BaseComponentProps {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  sortBy?: keyof T
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void
  rowKey?: keyof T | ((record: T, index: number) => string | number)
  emptyState?: ReactNode
}