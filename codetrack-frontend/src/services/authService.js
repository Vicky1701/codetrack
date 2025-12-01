import axios from 'axios'

const API_BASE_URL = '/api/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password })
    const { token, username: user, email, userId } = response.data
    
    // Store token and user info
    localStorage.setItem('token', token)
    localStorage.setItem('username', user)
    localStorage.setItem('email', email)
    localStorage.setItem('userId', userId)
    
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password })
    // Don't store token after registration - user needs to login
    return response.data
  } catch (error) {
    console.error('Error registering:', error)
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  localStorage.removeItem('userId')
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const getCurrentUser = () => {
  return {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    userId: localStorage.getItem('userId'),
  }
}

