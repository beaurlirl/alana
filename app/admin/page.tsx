'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const authCookie = Cookies.get('admin-auth')
    if (authCookie === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleLogout = () => {
    Cookies.remove('admin-auth')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-6">
        <div className="max-w-md w-full">
          <div className="bg-cream p-8 rounded-lg shadow-lg border border-gray-200">
            <h1 className="font-migra text-3xl font-medium mb-6 text-center">Admin Login</h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal"
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-charcoal text-white py-2 rounded hover:bg-charcoal/80 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-charcoal transition-colors"
              >
                ← Back to site
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}

