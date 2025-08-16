'use client'

import { useState } from 'react'
import { 
  useError, 
  useTheme, 
  useConnectionContext, 
  useSettings 
} from '@/components/providers'

// Render Props examples
import { AsyncOperationProvider } from '@/components/renderProps/AsyncOperationProvider'
import { ToggleProvider } from '@/components/renderProps/ToggleProvider'
import { MouseProvider } from '@/components/renderProps/MouseProvider'

// HOC examples
import { withLoading } from '@/components/hoc/withLoading'
import { withErrorBoundary } from '@/components/hoc/withErrorBoundary'

// Container/Presentational examples
import { UserProfileContainer } from '@/components/containers/UserProfileContainer'

export function DesignPatternsDemo() {
  const { addError, clearErrors, errors } = useError()
  const { theme, setTheme, actualTheme } = useTheme()
  const { status, checkConnection } = useConnectionContext()
  const { autoRefresh, updateSetting } = useSettings()

  // Provider pattern demo functions
  const handleAddError = () => {
    addError('これはテストエラーです', 'error')
  }

  const handleToggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const handleToggleAutoRefresh = () => {
    updateSetting('autoRefresh', !autoRefresh)
  }

  // Async operation for Render Props demo
  const fetchDemoData = async (count: number): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Array.from({ length: count }, (_, i) => `データ項目 ${i + 1}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <DemoContent
        handleAddError={handleAddError}
        handleToggleTheme={handleToggleTheme}
        handleToggleAutoRefresh={handleToggleAutoRefresh}
        fetchDemoData={fetchDemoData}
        theme={theme}
        actualTheme={actualTheme}
        status={status}
        checkConnection={checkConnection}
        autoRefresh={autoRefresh}
        errors={errors}
        clearErrors={clearErrors}
      />
    </div>
  )
}

// 内部コンポーネントを分離
function DemoContent({
  handleAddError,
  handleToggleTheme,
  handleToggleAutoRefresh,
  fetchDemoData,
  theme,
  actualTheme,
  status,
  checkConnection,
  autoRefresh,
  errors,
  clearErrors
}: {
  handleAddError: () => void
  handleToggleTheme: () => void
  handleToggleAutoRefresh: () => void
  fetchDemoData: (count: number) => Promise<string[]>
  theme: string
  actualTheme: string
  status: string
  checkConnection: () => Promise<void>
  autoRefresh: boolean
  errors: Array<{ id: string; message: string; type: string }>
  clearErrors: () => void
}) {
  // Component with HOC examples
  const LoadingDemo = withLoading(() => (
    <div className="p-4 bg-green-100 rounded">
      読み込み完了！このコンポーネントはwithLoadingでラップされています。
    </div>
  ))

  const ErrorBoundaryDemo = withErrorBoundary(() => {
    const [shouldError, setShouldError] = useState(false)
    
    if (shouldError) {
      throw new Error('意図的なエラー（Error Boundary テスト）')
    }

    return (
      <div className="p-4 bg-blue-100 rounded">
        <p>このコンポーネントはError Boundaryでラップされています。</p>
        <button 
          onClick={() => setShouldError(true)}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          エラーを発生させる
        </button>
      </div>
    )
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">設計パターンデモ</h1>
        <p className="text-gray-600">実装された設計パターンの動作確認</p>
      </div>

      {/* Provider Pattern Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Provider パターン</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">エラー管理</h3>
            <div className="space-y-2">
              <button 
                onClick={handleAddError}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                エラーを追加
              </button>
              <button 
                onClick={clearErrors}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
              >
                エラーをクリア
              </button>
              <p className="text-sm">エラー数: {errors.length}</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">テーマ管理</h3>
            <div className="space-y-2">
              <button 
                onClick={handleToggleTheme}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                テーマ切り替え
              </button>
              <p className="text-sm">現在のテーマ: {theme}</p>
              <p className="text-sm">実際のテーマ: {actualTheme}</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">接続状態</h3>
            <div className="space-y-2">
              <button 
                onClick={checkConnection}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                接続確認
              </button>
              <p className="text-sm">状態: {status}</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">設定管理</h3>
            <div className="space-y-2">
              <button 
                onClick={handleToggleAutoRefresh}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                自動更新切り替え
              </button>
              <p className="text-sm">自動更新: {autoRefresh ? 'ON' : 'OFF'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Render Props Pattern Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Render Props パターン</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">非同期操作</h3>
            <AsyncOperationProvider asyncFunction={fetchDemoData}>
              {({ execute, loading, data, error }) => (
                <div className="space-y-2">
                  <button 
                    onClick={() => execute(3)}
                    disabled={loading}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    {loading ? '読み込み中...' : 'データを取得'}
                  </button>
                  {data && (
                    <ul className="text-sm space-y-1">
                      {data.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              )}
            </AsyncOperationProvider>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">トグル状態</h3>
            <ToggleProvider>
              {({ value, toggle, setTrue, setFalse }) => (
                <div className="space-y-2">
                  <p className="text-sm">状態: {value ? 'ON' : 'OFF'}</p>
                  <div className="space-x-2">
                    <button 
                      onClick={toggle}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      切り替え
                    </button>
                    <button 
                      onClick={setTrue}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      ON
                    </button>
                    <button 
                      onClick={setFalse}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      OFF
                    </button>
                  </div>
                </div>
              )}
            </ToggleProvider>
          </div>

          <div className="p-4 border rounded-lg md:col-span-2">
            <h3 className="font-semibold mb-2">マウストラッキング</h3>
            <MouseProvider>
              {({ x, y, elementX, elementY, isInside }) => (
                <div className="bg-gray-100 p-4 rounded min-h-32 relative">
                  <p className="text-sm">
                    画面座標: ({x}, {y})
                  </p>
                  <p className="text-sm">
                    要素内座標: ({elementX}, {elementY})
                  </p>
                  <p className="text-sm">
                    要素内: {isInside ? 'はい' : 'いいえ'}
                  </p>
                  <div 
                    className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none"
                    style={{
                      left: elementX - 4,
                      top: elementY - 4,
                      opacity: isInside ? 1 : 0
                    }}
                  />
                </div>
              )}
            </MouseProvider>
          </div>
        </div>
      </section>

      {/* HOC Pattern Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Higher-Order Components (HOC) パターン</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">ローディング HOC</h3>
            <LoadingDemo isLoading={false} />
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">エラーバウンダリ HOC</h3>
            <ErrorBoundaryDemo />
          </div>
        </div>
      </section>

      {/* Container/Presentational Pattern Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Container/Presentational パターン</h2>
        
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">ユーザープロフィール</h3>
          <UserProfileContainer userId="demo-user" />
        </div>
      </section>
    </div>
  )
}