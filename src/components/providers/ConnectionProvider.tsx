'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useConnection } from '@/hooks/useConnection'
import type { ConnectionState } from '@/types'

interface ConnectionContextValue extends ConnectionState {
  checkConnection: () => Promise<void>
  reset: () => void
}

const ConnectionContext = createContext<ConnectionContextValue | undefined>(undefined)

interface ConnectionProviderProps {
  children: ReactNode
}

export function ConnectionProvider({ children }: ConnectionProviderProps) {
  const connectionState = useConnection()

  return (
    <ConnectionContext.Provider value={connectionState}>
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnectionContext() {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error('useConnectionContext must be used within a ConnectionProvider')
  }
  return context
}