import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { ConnectionStore, ConnectionState } from '@/types'

const initialState: ConnectionState = {
  isConnected: false,
  loading: true,
  error: null,
  lastChecked: null,
} as const

export const useConnectionStore = create<ConnectionStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setConnectionState: (state: Partial<ConnectionState>) => {
        set((current) => ({
          ...current,
          ...state,
          lastChecked: new Date(),
        }), false, 'setConnectionState')
      },
      
      checkConnection: async (): Promise<void> => {
        const { setConnectionState } = get()
        
        setConnectionState({ loading: true, error: null })
        
        try {
          await supabase.auth.getSession()
          setConnectionState({ 
            isConnected: true, 
            loading: false,
            error: null 
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          setConnectionState({ 
            isConnected: false, 
            loading: false,
            error: errorMessage 
          })
          
          throw error
        }
      },
      
      reset: (): void => {
        set(initialState, false, 'reset')
      }
    }),
    {
      name: 'connection-store',
    }
  )
)