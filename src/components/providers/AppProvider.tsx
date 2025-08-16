'use client'

import { ReactNode } from 'react'
import { ErrorProvider } from './ErrorProvider'
import { ThemeProvider } from './ThemeProvider'
import { ConnectionProvider } from './ConnectionProvider'
import { SettingsProvider } from './SettingsProvider'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <SettingsProvider>
          <ConnectionProvider>
            {children}
          </ConnectionProvider>
        </SettingsProvider>
      </ThemeProvider>
    </ErrorProvider>
  )
}