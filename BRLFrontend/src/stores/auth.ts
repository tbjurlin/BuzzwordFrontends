import { ref, watch } from 'vue'

// Simple auth store to check if user is authenticated via FlowerSSO
const isAuthenticated = ref(false)

export function useAuth() {
  // Check if user is authenticated from localStorage
  // The FlowerSSO will set this when user logs in
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    const wasAuthenticated = isAuthenticated.value
    isAuthenticated.value = !!storedUser
    
    // If authentication state changed from true to false, user logged out
    if (wasAuthenticated && !isAuthenticated.value) {
      // Dispatch custom event for logout detection
      window.dispatchEvent(new CustomEvent('auth-logout'))
    }
    
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
    // Dispatch custom event for logout detection
    window.dispatchEvent(new CustomEvent('auth-logout'))
  }

  return {
    isAuthenticated,
    checkAuth,
    setToken,
    logout
  }
}
