import { CrossStorageClient } from 'cross-storage'
import { ref } from 'vue'

// TEMP CLASS TO SIMULATE AUTHENTICATION

// User role types
export type UserRole = 'user' | 'contributor' | 'manager'

// User interface with role
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  title: string
  department: string
  country: string
  role: UserRole
  password: string
}

// Pending user request interface
export interface PendingUserRequest {
  id: string
  email: string
  firstName: string
  lastName: string
  title: string
  department: string
  country: string
  role: UserRole
  password: string
  requestDate: Date
}

// Dummy manager user for testing (manager acts as admin)
const DUMMY_USER: User = {
  id: '1',
  email: 'manager@example.com',
  firstName: 'Manager',
  lastName: 'User',
  title: 'System Manager',
  department: 'IT',
  country: 'United States',
  role: 'manager',
  password: 'password'
}

// TEMPORARY: Contributor user for testing (TO BE REMOVED)
const TEMP_CONTRIBUTOR: User = {
  id: '2',
  email: 'temp.contributor@example.com',
  firstName: 'Temp',
  lastName: 'Contributor',
  title: 'Content Contributor',
  department: 'Operations',
  country: 'United States',
  role: 'contributor',
  password: 'contributor123'
}

// TEMPORARY: Regular user for testing (TO BE REMOVED)
const TEMP_USER: User = {
  id: '3',
  email: 'temp.user@example.com',
  firstName: 'Temp',
  lastName: 'User',
  title: 'Temporary Employee',
  department: 'Operations',
  country: 'United States',
  role: 'user',
  password: 'user123'
}

// Store for approved users (simulating database)
const approvedUsers = ref<User[]>([DUMMY_USER, TEMP_CONTRIBUTOR, TEMP_USER])

// Store for pending user requests
const pendingRequests = ref<PendingUserRequest[]>([])

const currentUser = ref<User | null>(null)
const isAuthenticated = ref(false)

export function useAuth() {
  // Login with email and password
  const login = (email: string, password: string): boolean => {
    // Find user in approved users list
    const user = approvedUsers.value.find(
      u => u.email === email && u.password === password
    )

    if (user) {
      // Store in localStorage for persistence
      localStorage.setItem('sso-token', import.meta.env.VITE_TOKEN)
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const sendTokenTo = (url: string, next: () => void) => {
    const storage = new CrossStorageClient(url, {})
    const token = window.localStorage.getItem('sso-token')
    storage.onConnect().then(function () {
      console.log('connected')
      return storage.set('sso-token', token)
    }).then(() => next())

  }

  const removeToken = (url: string) => {
    const storage = new CrossStorageClient(url, {})
    storage.onConnect().then(function () {
      console.log('connected')
      return storage.del('sso-token')
    })
  }


  // Logout current user
  const logout = () => {
    localStorage.removeItem('sso-token')
    removeToken(import.meta.env.VITE_BRL_URL)
  }

  // Get current user profile
  const getUser = () => {
    currentUser.value = DUMMY_USER
  }

  // Check if user is authenticated from localStorage
  const checkAuth = (onComplete: (isAuthed: boolean) => void) => {
    const token = localStorage.getItem('sso-token')
    if (token) {
      isAuthenticated.value = true
      onComplete(true)
    } else {
      isAuthenticated.value = false
      onComplete(false)
    }
    // const storedUser = localStorage.getItem('user')
    // if (storedUser) {
    //   const userData = JSON.parse(storedUser)
    //   // Find full user data from approved users
    //   const fullUser = approvedUsers.value.find(u => u.id === userData.id)
    //   if (fullUser) {
    //     currentUser.value = fullUser
        
    //   }
    // }
  }

  // Submit a profile creation request
  const submitProfileRequest = (userData: Omit<PendingUserRequest, 'id' | 'requestDate'>) => {
    const newRequest: PendingUserRequest = {
      ...userData,
      id: Date.now().toString(),
      requestDate: new Date()
    }
    pendingRequests.value.push(newRequest)
    // Persist to localStorage
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests.value))
  }

  // Check if current user is admin (manager role acts as admin)
  const isAdmin = () => {
    return currentUser.value?.role === 'manager'
  }

  // Check if current user is contributor or manager
  const isContributorOrManager = () => {
    return currentUser.value?.role === 'contributor' || currentUser.value?.role === 'manager'
  }

  // Delete a user (manager can delete any user, users can delete themselves)
  const deleteUser = (userId: string) => {
    const userToDelete = approvedUsers.value.find(u => u.id === userId)
    if (!userToDelete) {
      return false
    }

    // Remove user from approved users list
    approvedUsers.value = approvedUsers.value.filter(u => u.id !== userId)

    // Persist changes
    localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers.value))

    // If user deleted their own account, log them out
    if (currentUser.value?.id === userId) {
      logout()
    }

    return true
  }

  return {
    currentUser,
    isAuthenticated,
    pendingRequests,
    approvedUsers,
    login,
    logout,
    getUser,
    checkAuth,
    submitProfileRequest,
    isAdmin,
    isContributorOrManager,
    deleteUser,
    sendTokenTo,
    removeToken,
  }
}
