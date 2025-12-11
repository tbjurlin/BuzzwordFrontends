import { useInfoEndpoints } from '@/composables/useInfoEndpoints'
import { constructGetCall, getSSOToken } from '@/composables/util'
import { ref, watch } from 'vue'

// Simple auth store to check if user is authenticated via FlowerSSO

export function useAuth() {
  const { getUserName } = useInfoEndpoints();

  // Check if user is authenticated from localStorage
  // The FlowerSSO will set this when user logs in
  const checkAuth = (onComplete: (result: boolean) => void) => {

    const token = getSSOToken()
    if (token && typeof token == 'string') {
      getUserName(
        (_firstName, _lastName) => {
          onComplete(true)
        },
        (_reason) => {
          console.log(_reason)
          window.dispatchEvent(new CustomEvent('tokenInvalid'))
          onComplete(false)
        }
      )
    } else {
      onComplete(false)
    }
    
    // // If authentication state changed from true to false, user logged out
    // if (wasAuthenticated && !isAuthenticated.value) {
    //   // Dispatch custom event for logout detection
    //   window.dispatchEvent(new CustomEvent('auth-logout'))
    // }
  }


  return {
    checkAuth,
  }
}
