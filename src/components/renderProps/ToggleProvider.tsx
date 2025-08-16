import { ReactNode } from 'react'
import { useToggle } from '@/hooks/useToggle'

interface ToggleState {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  setValue: (value: boolean) => void
}

interface ToggleProviderProps {
  children: (state: ToggleState) => ReactNode
  initialValue?: boolean
}

export function ToggleProvider({ 
  children, 
  initialValue = false 
}: ToggleProviderProps) {
  const [value, actions] = useToggle(initialValue)

  const toggleState: ToggleState = {
    value,
    ...actions
  }

  return <>{children(toggleState)}</>
}