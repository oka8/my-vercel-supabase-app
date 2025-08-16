import { useEffect, useCallback } from 'react'
import { useConnection } from '@/hooks/useConnection'
import { useError } from '@/hooks/useError'

export function useSupabaseConnection() {
  const { isConnected, loading, error, checkConnection } = useConnection()
  const { handleSupabaseError } = useError()

  const performCheck = useCallback(async () => {
    try {
      await checkConnection()
    } catch (error) {
      handleSupabaseError(error, { 
        context: 'connection_check',
        component: 'useSupabaseConnection'
      })
    }
  }, [checkConnection, handleSupabaseError])

  useEffect(() => {
    performCheck()
  }, [performCheck])

  return { isConnected, loading, error }
}