import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const loadProblems = async () => {
  try {
    const response = await api.get('/problems')
    return response.data
  } catch (error) {
    console.error('Error loading problems:', error)
    // Fallback to localStorage if API fails
    const localData = localStorage.getItem('dsa-problems')
    return localData ? JSON.parse(localData) : []
  }
}

export const saveProblem = async (problem) => {
  try {
    const response = await api.post('/problems', problem)
    return response.data
  } catch (error) {
    console.error('Error saving problem:', error)
    throw error
  }
}

export const updateProblem = async (id, problem) => {
  try {
    const response = await api.put(`/problems/${id}`, problem)
    return response.data
  } catch (error) {
    console.error('Error updating problem:', error)
    throw error
  }
}

export const deleteProblem = async (id) => {
  try {
    await api.delete(`/problems/${id}`)
  } catch (error) {
    console.error('Error deleting problem:', error)
    throw error
  }
}

export const markRevision = async (id, revisionData) => {
  try {
    const response = await api.post(`/problems/${id}/revision`, revisionData)
    return response.data
  } catch (error) {
    console.error('Error marking revision:', error)
    throw error
  }
}

export const exportData = async () => {
  try {
    const response = await api.get('/export')
    return response.data
  } catch (error) {
    console.error('Error exporting data:', error)
    throw error
  }
}

export const importData = async (data) => {
  try {
    const response = await api.post('/import', data)
    return response.data
  } catch (error) {
    console.error('Error importing data:', error)
    throw error
  }
}

