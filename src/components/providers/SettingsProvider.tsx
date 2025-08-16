'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface SettingsState {
  autoRefresh: boolean
  refreshInterval: number
  debugMode: boolean
  notifications: boolean
  language: 'ja' | 'en'
}

interface SettingsContextValue extends SettingsState {
  updateSetting: <K extends keyof SettingsState>(
    key: K, 
    value: SettingsState[K]
  ) => void
  resetSettings: () => void
}

const defaultSettings: SettingsState = {
  autoRefresh: true,
  refreshInterval: 30000,
  debugMode: false,
  notifications: true,
  language: 'ja'
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)

  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch {
        // Settings読み込みに失敗した場合はデフォルト値を使用
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = <K extends keyof SettingsState>(
    key: K, 
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('app-settings')
  }

  const contextValue: SettingsContextValue = {
    ...settings,
    updateSetting,
    resetSettings
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}