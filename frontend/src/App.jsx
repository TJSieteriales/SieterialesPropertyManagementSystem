import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RecordsPage from './pages/RecordsPage'
import { getCurrentUser, logout } from './services/authService'
import { clearToken, getToken } from './services/api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    restoreLogin()
  }, [])

  async function restoreLogin() {
    if (!getToken()) {
      setLoading(false)
      return
    }

    try {
      setUser(await getCurrentUser())
    } catch {
      clearToken()
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
    setUser(null)
  }

  if (loading) {
    return <div className="screen-message">Loading...</div>
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  return <RecordsPage user={user} onLogout={handleLogout} />
}

export default App
