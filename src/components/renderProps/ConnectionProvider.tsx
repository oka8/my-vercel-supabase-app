import { ReactNode } from 'react'
import { useConnection } from '@/hooks/useConnection'
import type { ConnectionState } from '@/types'

interface ConnectionProviderProps {
  children: (state: ConnectionState & {
    checkConnection: () => Promise<void>
    reset: () => void
  }) => ReactNode
}

export function ConnectionProvider({ children }: ConnectionProviderProps) {
  const connectionState = useConnection()
  
  return <>{children(connectionState)}</>
}