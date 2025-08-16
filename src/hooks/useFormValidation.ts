import { useState, useCallback, useMemo } from 'react'

type ValidationRule<T> = {
  validate: (value: T) => boolean
  message: string
}

type FormValues = Record<string, unknown>
type ValidationRules<T extends FormValues> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

type FormErrors<T extends FormValues> = {
  [K in keyof T]?: string[]
}

interface UseFormValidationOptions<T extends FormValues> {
  initialValues: T
  validationRules: ValidationRules<T>
  validateOnChange?: boolean
}

export function useFormValidation<T extends FormValues>({
  initialValues,
  validationRules,
  validateOnChange = true
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)

  const validateField = useCallback((fieldName: keyof T, value: T[keyof T]): string[] => {
    const rules = validationRules[fieldName] || []
    const fieldErrors: string[] = []

    for (const rule of rules) {
      if (!rule.validate(value)) {
        fieldErrors.push(rule.message)
      }
    }

    return fieldErrors
  }, [validationRules])

  const validateForm = useCallback((): FormErrors<T> => {
    const formErrors: FormErrors<T> = {}

    for (const fieldName in validationRules) {
      const fieldErrors = validateField(fieldName, values[fieldName])
      if (fieldErrors.length > 0) {
        formErrors[fieldName] = fieldErrors
      }
    }

    return formErrors
  }, [values, validateField, validationRules])

  const setValue = useCallback((fieldName: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [fieldName]: value }))

    if (validateOnChange) {
      const fieldErrors = validateField(fieldName, value)
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldErrors.length > 0 ? fieldErrors : undefined
      }))
    }
  }, [validateField, validateOnChange])

  const setTouchedField = useCallback((fieldName: keyof T) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }, [])

  const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => {
    return async (e?: React.FormEvent) => {
      e?.preventDefault()

      const formErrors = validateForm()
      setErrors(formErrors)

      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce((acc, key) => {
        acc[key as keyof T] = true
        return acc
      }, {} as Record<keyof T, boolean>)
      setTouched(allTouched)

      const hasErrors = Object.keys(formErrors).length > 0
      if (!hasErrors) {
        await onSubmit(values)
      }
    }
  }, [values, validateForm, validationRules])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({} as Record<keyof T, boolean>)
  }, [initialValues])

  const isValid = useMemo(() => {
    const formErrors = validateForm()
    return Object.keys(formErrors).length === 0
  }, [validateForm])

  const getFieldProps = useCallback((fieldName: keyof T) => {
    return {
      value: values[fieldName],
      onChange: (value: T[keyof T]) => setValue(fieldName, value),
      onBlur: () => setTouchedField(fieldName),
      error: touched[fieldName] ? errors[fieldName]?.[0] : undefined,
      hasError: touched[fieldName] && !!errors[fieldName]?.length
    }
  }, [values, errors, touched, setValue, setTouchedField])

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setTouchedField,
    handleSubmit,
    reset,
    getFieldProps,
    validateForm
  }
}