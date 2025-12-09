import { ref } from 'vue'

// TEMP CLASS TO SIMULATE AUTHENTICATION

// User role types
export type UserRole = 'user' | 'manager' | 'admin'

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

// Dummy admin user for testing
const DUMMY_USER: User = {
  id: '1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  title: 'System Administrator',
  department: 'IT',
  country: 'United States',
  role: 'admin',
  password: 'password'
}

// TEMPORARY: Regular user for testing (TO BE REMOVED)
const TEMP_ADMIN: User = {
  id: '2',
  email: 'temp.admin@example.com',
  firstName: 'Temp',
  lastName: 'Admin',
  title: 'Temporary Administrator',
  department: 'IT',
  country: 'United States',
  role: 'admin',
  password: 'admin123'
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
const approvedUsers = ref<User[]>([DUMMY_USER, TEMP_ADMIN, TEMP_USER])

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
      // Store user without password
      const { password: _, ...userWithoutPassword } = user
      currentUser.value = user
      isAuthenticated.value = true
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  // Logout current user
  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  // Check if user is authenticated from localStorage
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      // Find full user data from approved users
      const fullUser = approvedUsers.value.find(u => u.id === userData.id)
      if (fullUser) {
        currentUser.value = fullUser
        isAuthenticated.value = true
      }
    }
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

  // Approve a pending user request (admin only)
  const approveRequest = (requestId: string) => {
    const request = pendingRequests.value.find(r => r.id === requestId)
    if (request) {
      // Create new user from request
      const newUser: User = {
        id: Date.now().toString(),
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        title: request.title,
        department: request.department,
        country: request.country,
        role: request.role,
        password: request.password
      }
      
      // Add to approved users
      approvedUsers.value.push(newUser)
      
      // Remove from pending requests
      pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
      
      // Persist changes
      localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests.value))
      localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers.value))
    }
  }

  // Deny a pending user request (admin only)
  const denyRequest = (requestId: string) => {
    pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
    // Persist changes
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests.value))
  }

  // Check if current user is admin
  const isAdmin = () => {
    return currentUser.value?.role === 'admin'
  }

  // Check if current user is manager or admin
  const isManagerOrAdmin = () => {
    return currentUser.value?.role === 'admin' || currentUser.value?.role === 'manager'
  }

  // Load pending requests from localStorage on initialization
  const loadPersistedData = () => {
    const storedRequests = localStorage.getItem('pendingRequests')
    if (storedRequests) {
      pendingRequests.value = JSON.parse(storedRequests)
    }
    
    const storedUsers = localStorage.getItem('approvedUsers')
    if (storedUsers) {
      approvedUsers.value = JSON.parse(storedUsers)
    }
  }

  // Initialize data on first load
  loadPersistedData()

  return {
    currentUser,
    isAuthenticated,
    pendingRequests,
    login,
    logout,
    checkAuth,
    submitProfileRequest,
    approveRequest,
    denyRequest,
    isAdmin,
    isManagerOrAdmin
  }
}
