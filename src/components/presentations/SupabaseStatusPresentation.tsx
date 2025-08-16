import { memo } from 'react'
import { StatusIndicator } from '@/components/ui/StatusIndicator'

interface SupabaseStatusPresentationProps {
  isConnected: boolean
  loading: boolean
  error: string | null
  serviceName: string
}

export const SupabaseStatusPresentation = memo(function SupabaseStatusPresentation({
  isConnected,
  loading,
  error,
  serviceName
}: SupabaseStatusPresentationProps) {
  return (
    <StatusIndicator
      loading={loading}
      isConnected={isConnected}
      service={serviceName}
    />
  )
})