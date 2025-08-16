import { memo, ReactNode, FormEvent } from 'react'
import type { BaseComponentProps } from '@/types/components'

interface FormProps extends BaseComponentProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  loading?: boolean
  disabled?: boolean
}

interface FormFieldProps extends BaseComponentProps {
  label?: string
  error?: string
  required?: boolean
  help?: string
}

interface FormActionsProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right'
}

const FormRoot = memo(function Form({
  children,
  className = '',
  onSubmit,
  loading = false,
  disabled = false
}: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!loading && !disabled) {
      onSubmit(e)
    }
  }

  return (
    <form 
      className={`space-y-4 ${className}`} 
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset disabled={disabled || loading}>
        {children}
      </fieldset>
    </form>
  )
})

const FormField = memo(function FormField({
  children,
  className = '',
  label,
  error,
  required = false,
  help
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div>
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      
      {help && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {help}
        </p>
      )}
    </div>
  )
})

const FormActions = memo(function FormActions({
  children,
  className = '',
  align = 'right'
}: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return (
    <div className={`flex gap-3 pt-4 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  )
})

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Actions: FormActions
})