import { ref } from 'vue'
//TEMP CLASS TO SIMULATE AUTHENTICATION
export interface User {
  companyID: number
  email: string
  firstName: string
  lastName: string
  companyRole: string
  location: string
}

// Dummy user for testing
const DUMMY_USER: User = {
  companyID: 112,
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  companyRole: 'Administrator',
  location: 'New York, USA',
}

const DUMMY_PASSWORD = 'password'

const currentUser = ref<User | null>(null)
const isAuthenticated = ref(false)

export function useAuth() {
  const login = (email: string, password: string): boolean => {
    // Simple dummy authentication
    if (email === DUMMY_USER.email && password === DUMMY_PASSWORD) {
      currentUser.value = DUMMY_USER
      isAuthenticated.value = true
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(DUMMY_USER))
      return true
    }
    return false
  }

  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
