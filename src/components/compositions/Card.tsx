import { memo, ReactNode } from 'react'
import type { BaseComponentProps } from '@/types/components'

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

interface CardHeaderProps extends BaseComponentProps {
  actions?: ReactNode
}

interface CardContentProps extends BaseComponentProps {
  children: ReactNode
}

interface CardFooterProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right'
}

const CardRoot = memo(function Card({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const baseClasses = 'rounded-lg bg-white dark:bg-gray-800'
  
  const variantClasses = {
    default: '',
    bordered: 'border border-gray-200 dark:border-gray-700',
    elevated: 'shadow-lg border border-gray-200 dark:border-gray-700'
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
})

const CardHeader = memo(function CardHeader({ 
  children, 
  className = '',
  actions
}: CardHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex-1">
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2 ml-4">
          {actions}
        </div>
      )}
    </div>
  )
})

const CardContent = memo(function CardContent({ 
  children, 
  className = ''
}: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
})

const CardFooter = memo(function CardFooter({ 
  children, 
  className = '',
  align = 'right'
}: CardFooterProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return (
    <div className={`flex items-center mt-4 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  )
})

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter
})