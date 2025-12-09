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
      // Store user without password
      const { password: _, ...userWithoutPassword } = user
      currentUser.value = user
      isAuthenticated.value = true
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      
      // Check if there's a redirect URL (for SSO flow)
      const urlParams = new URLSearchParams(window.location.search)
      const redirectUrl = urlParams.get('redirect')
      
      if (redirectUrl) {
        // Redirect back to the requesting application
        // Add a small delay to ensure state is saved
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 100)
      }
      
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
    // Check if this is an external SSO request
    const urlParams = new URLSearchParams(window.location.search)
    const isExternalRequest = urlParams.get('external') === 'true'
    
    if (isExternalRequest) {
      // Clear any existing session for external SSO requests
      // This ensures the user must log in again for external apps
      logout()
      return
    }
    
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
    approvedUsers,
    login,
    logout,
    checkAuth,
    submitProfileRequest,
    approveRequest,
    denyRequest,
    isAdmin,
    isContributorOrManager,
    deleteUser
  }
}
