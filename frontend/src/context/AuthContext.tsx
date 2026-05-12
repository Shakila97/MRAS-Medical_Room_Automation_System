import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  isDoctor: boolean
  isAdmin: boolean
  isEmployee: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ── Load user on app start if token exists ────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      authApi.getMe()
        .then(setUser)
        .catch(() => localStorage.clear())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const data = await authApi.login({ email, password })
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    setUser(data.user)
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
  }

  const isAuthenticated = !!user
  const isLoading = loading

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated,
      isLoading,
      isDoctor: user?.role === 'doctor',
      isAdmin: user?.role === 'admin',
      isEmployee: user?.role === 'employee',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}