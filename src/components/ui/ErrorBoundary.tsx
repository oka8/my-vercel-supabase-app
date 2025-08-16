'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false })
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex items-center justify-center p-4 min-h-[200px]">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Component Error
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              This component encountered an error and couldn&apos;t render properly.
            </p>
            
            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Component
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}