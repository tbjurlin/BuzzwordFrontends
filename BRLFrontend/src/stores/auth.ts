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

  // Set authentication token/user data (received from FlowerSSO)
  const setToken = (userData: string) => {
    if (userData) {
      localStorage.setItem('user', userData)
      isAuthenticated.value = true
    }
  }

  // Clear authentication
  const logout = () => {
    localStorage.removeItem('user')
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    checkAuth,
    setToken,
    logout
  }
}
