import type { StatusIndicatorProps } from '@/types/components'

export function StatusIndicator({ loading, isConnected, service }: StatusIndicatorProps) {
  const getStatusColor = () => {
    if (loading) return 'bg-yellow-500'
    return isConnected ? 'bg-green-500' : 'bg-red-500'
  }

  const getStatusText = () => {
    if (loading) return 'Checking...'
    return isConnected ? 'Connected' : 'Disconnected'
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
        <span className="text-sm font-medium">
          {service} Status: {getStatusText()}
        </span>
      </div>
      {!loading && !isConnected && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Make sure to set your Supabase URL and API key in .env.local
        </p>
      )}
    </div>
  )
}