import { useConnectionStore } from '@/lib/stores/connectionStore'

export function useConnection() {
  const store = useConnectionStore()
  
  return {
    isConnected: store.isConnected,
    loading: store.loading,
    error: store.error,
    lastChecked: store.lastChecked,
    checkConnection: store.checkConnection,
    reset: store.reset
  }
}

export function useConnectionActions() {
  const checkConnection = useConnectionStore(state => state.checkConnection)
  const reset = useConnectionStore(state => state.reset)
  
  return {
    checkConnection,
    reset
  }
}

export function useConnectionState() {
  return useConnectionStore(state => ({
    isConnected: state.isConnected,
    loading: state.loading,
    error: state.error,
    lastChecked: state.lastChecked
  }))
}