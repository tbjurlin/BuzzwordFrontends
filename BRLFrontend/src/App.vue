<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import LayoutWrapper from './components/LayoutWrapper.vue'
import { useAuth } from './stores/auth'

const router = useRouter()
const { checkAuth } = useAuth()
const firstAuth = ref(false)

const FlowerSSOUrl = import.meta.env.VITE_FLOWER_SSO_URL

let authCheckInterval: number | null = null

const redirectToSSO = () => {
  const currentUrl = window.location.origin + router.currentRoute.value.fullPath
  const ssoUrl = `${FlowerSSOUrl}?redirect=${encodeURIComponent(currentUrl)}`
  window.location.href = ssoUrl
}

// Listen for storage changes (e.g., when user logs out from another tab)
const handleStorageChange = (event: StorageEvent) => {
  // Check if the 'user' key was removed
  if (event.key === 'sso-token' && event.newValue === null) {
    redirectToSSO()
    console.log("redirect from storage change")
    console.log(event)
  }
}

const handleTokenInvalid = () => {
  redirectToSSO()
}

// Periodic authentication check
const periodicAuthCheck = () => {
  checkAuth((isAuthed) => {
    if (!isAuthed) {
      redirectToSSO()
      console.log("redirect from period")
    }
  })
}

onMounted(() => {
  // Add storage event listener to detect logout from other tabs/windows
  window.addEventListener('storage', handleStorageChange)

  window.addEventListener('tokenInvalid', handleTokenInvalid)

  
  // Do an initial auth check
  checkAuth((isAuthed) => {
    if (!isAuthed) {
      redirectToSSO()
      console.log("redirect from mount")
    } else {
      firstAuth.value = true
    }
  })
  
  // Set up periodic auth check every 5 seconds
  authCheckInterval = window.setInterval(periodicAuthCheck, 30000)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)

  window.removeEventListener('tokenInvalid', handleTokenInvalid)
  
  if (authCheckInterval !== null) {
    clearInterval(authCheckInterval)
  }
})
</script>

<template>
  <LayoutWrapper v-if="firstAuth">
    <RouterView />
  </LayoutWrapper>
  <h1 v-else>Authenticating</h1>
</template>

<style scoped>
</style>
