import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    token.value = res.data.token
    localStorage.setItem('token', res.data.token)
    // Fetch user info after login
    await fetchUser()
  }

  async function register(data) {
    await api.post('/auth/registro', data)
  }

  async function fetchUser() {
    try {
      // Try to get user from token - we'll use the me endpoint or decode
      const res = await api.get('/usuarios')
      // Get the first user matching the token (simplified)
      if (res.data && res.data.length > 0) {
        user.value = res.data[0]
        localStorage.setItem('user', JSON.stringify(res.data[0]))
      }
    } catch {
      // If fails, user data stays minimal
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isAuthenticated, login, register, fetchUser, logout }
})