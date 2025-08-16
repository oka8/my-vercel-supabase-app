'use client'

import { useState, useEffect } from 'react'
import { UserProfilePresentation } from '@/components/presentational/UserProfilePresentation'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  joinedAt: Date
  isOnline: boolean
}

interface UserProfileContainerProps {
  userId: string
}

export function UserProfileContainer({ userId }: UserProfileContainerProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // デモ用のモックデータ
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockProfile: UserProfile = {
          id: userId,
          name: 'デモユーザー',
          email: 'demo@example.com',
          avatar: undefined,
          joinedAt: new Date('2024-01-15'),
          isOnline: Math.random() > 0.5
        }
        
        setProfile(mockProfile)
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserProfile()
    }
  }, [userId])

  const handleRefresh = () => {
    if (userId) {
      const fetchUserProfile = async () => {
        try {
          setLoading(true)
          setError(null)
          
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const mockProfile: UserProfile = {
            id: userId,
            name: 'デモユーザー',
            email: 'demo@example.com', 
            avatar: undefined,
            joinedAt: new Date('2024-01-15'),
            isOnline: Math.random() > 0.5
          }
          
          setProfile(mockProfile)
        } catch (err) {
          setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
        } finally {
          setLoading(false)
        }
      }
      
      fetchUserProfile()
    }
  }

  return (
    <UserProfilePresentation
      profile={profile}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    />
  )
}