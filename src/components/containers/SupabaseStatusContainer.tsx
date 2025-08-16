'use client'

import { useSupabaseConnection } from '@/hooks/useSupabaseConnection'
import { SupabaseStatusPresentation } from '@/components/presentations/SupabaseStatusPresentation'

export function SupabaseStatusContainer() {
  const { isConnected, loading, error } = useSupabaseConnection()

  return (
    <SupabaseStatusPresentation
      isConnected={isConnected}
      loading={loading}
      error={error}
      serviceName="Supabase"
    />
  )
}