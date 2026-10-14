import { apiRequest, clearToken, saveToken } from './api'

export async function login(email, password) {
  const data = await apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  saveToken(data.token)
  return data.user
}

export async function getCurrentUser() {
  const data = await apiRequest('/me')
  return data.user
}

export async function logout() {
  try {
    await apiRequest('/logout', { method: 'POST' })
  } finally {
    clearToken()
  }
}