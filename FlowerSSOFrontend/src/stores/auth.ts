import { useBackend } from '@/composables/useBackend'
import { CrossStorageClient } from 'cross-storage'
import { ref } from 'vue'

const { loginAPICall } = useBackend();

const isAuthenticated = ref(false)

export function useAuth() {
  // Login with email and password
  const login = (email: string, password: string, onSuccess: () => void, onFailure: (reason: any) => void) => {
    
    loginAPICall(
      email,
      password,
      (token) => {
        console.log(token)
        localStorage.setItem('sso-token', token)
        isAuthenticated.value = true
        onSuccess()
      },
      onFailure
    )
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

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth,
    sendTokenTo,
    removeToken,
  }
}
