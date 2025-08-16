import { ReactNode } from 'react'
import { useFormValidation } from '@/hooks/useFormValidation'

type FormValues = Record<string, unknown>

interface FormState<T extends FormValues> {
  values: T
  errors: Record<keyof T, string[]>
  touched: Record<keyof T, boolean>
  isValid: boolean
  setValue: (fieldName: keyof T, value: T[keyof T]) => void
  setTouchedField: (fieldName: keyof T) => void
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => Promise<void>
  reset: () => void
  getFieldProps: (fieldName: keyof T) => {
    value: T[keyof T]
    onChange: (value: T[keyof T]) => void
    onBlur: () => void
    error: string | undefined
    hasError: boolean
  }
}

interface FormProviderProps<T extends FormValues> {
  children: (state: FormState<T>) => ReactNode
  initialValues: T
  validationRules: {
    [K in keyof T]?: Array<{
      validate: (value: T[K]) => boolean
      message: string
    }>
  }
  validateOnChange?: boolean
}

export function FormProvider<T extends FormValues>({
  children,
  initialValues,
  validationRules,
  validateOnChange = true
}: FormProviderProps<T>) {
  const formState = useFormValidation({
    initialValues,
    validationRules,
    validateOnChange
  })

  return <>{children(formState)}</>
}