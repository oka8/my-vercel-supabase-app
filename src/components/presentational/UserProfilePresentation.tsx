'use client'

import { UserProfile } from '@/components/containers/UserProfileContainer'

interface UserProfilePresentationProps {
  profile: UserProfile | null
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export function UserProfilePresentation({ 
  profile, 
  loading, 
  error, 
  onRefresh 
}: UserProfilePresentationProps) {
  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-600 mb-2">エラー: {error}</p>
        <button 
          onClick={onRefresh}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          再試行
        </button>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-4 border rounded-lg text-gray-500">
        プロフィールが見つかりません
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{profile.name}</h3>
          <p className="text-gray-600 text-sm">{profile.email}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          profile.isOnline 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {profile.isOnline ? 'オンライン' : 'オフライン'}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">ユーザーID:</span> {profile.id}
        </p>
        <p>
          <span className="font-medium">参加日:</span> {profile.joinedAt.toLocaleDateString('ja-JP')}
        </p>
      </div>

      <button 
        onClick={onRefresh}
        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        更新
      </button>
    </div>
  )
}