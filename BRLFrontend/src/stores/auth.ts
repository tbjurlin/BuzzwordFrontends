import { ref } from 'vue'

// Simple auth store to check if user is authenticated via FlowerSSO
const isAuthenticated = ref(false)

export function useAuth() {
  // Check if user is authenticated from localStorage
  // The FlowerSSO will set this when user logs in
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    isAuthenticated.value = !!storedUser
    return isAuthenticated.value
  }

  // Clear authentication
  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  return {
    isAuthenticated,
    checkAuth,
    logout
  }
}
