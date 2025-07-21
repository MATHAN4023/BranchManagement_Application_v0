"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
  token?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('userToken')
      
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser)
        setUser({ ...userData, token: storedToken })
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (userData: User) => {
    try {
      // Validate token
      if (!userData.token || userData.token.trim() === '') {
        console.error('Invalid token in userData:', userData)
        throw new Error('Invalid or missing token')
      }

      // Validate other required fields
      if (!userData.name || !userData.email) {
        console.error('Missing required user data:', userData)
        throw new Error('Missing required user information')
      }

      // Set user in state
      setUser(userData)
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: userData.name,
        email: userData.email
      }))
      localStorage.setItem('userToken', userData.token)
      
      // Set cookie for SSR
      document.cookie = `userToken=${userData.token}; path=/; max-age=2592000`
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Clear state
      setUser(null)
      
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('userToken')
      
      // Clear cookie
      document.cookie = 'userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      
      // Navigate to login
      await router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 