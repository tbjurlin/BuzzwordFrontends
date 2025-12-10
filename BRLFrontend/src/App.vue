<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import LayoutWrapper from './components/LayoutWrapper.vue'
import { useAuth } from './stores/auth'

const router = useRouter()
const { checkAuth } = useAuth()

const FlowerSSOUrl = import.meta.env.VITE_FLOWER_SSO_URL || 'http://localhost:5174/'

let authCheckInterval: number | null = null

const redirectToSSO = () => {
  const currentUrl = window.location.origin + router.currentRoute.value.fullPath
  const ssoUrl = `${FlowerSSOUrl}?redirect=${encodeURIComponent(currentUrl)}`
  window.location.href = ssoUrl
}

// Listen for storage changes (e.g., when user logs out from another tab)
const handleStorageChange = (event: StorageEvent) => {
  // Check if the 'user' key was removed
  if (event.key === 'user' && event.newValue === null) {
    redirectToSSO()
  }
}

// Listen for custom logout event
const handleLogout = () => {
  redirectToSSO()
}

// Periodic authentication check
const periodicAuthCheck = () => {
  if (!checkAuth()) {
    redirectToSSO()
  }
}

onMounted(() => {
  // Add storage event listener to detect logout from other tabs/windows
  window.addEventListener('storage', handleStorageChange)
  
  // Add custom logout event listener
  window.addEventListener('auth-logout', handleLogout)
  
  // Do an initial auth check
  if (!checkAuth()) {
    redirectToSSO()
    return
  }
  
  // Set up periodic auth check every 5 seconds
  authCheckInterval = window.setInterval(periodicAuthCheck, 5000)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  window.removeEventListener('auth-logout', handleLogout)
  
  if (authCheckInterval !== null) {
    clearInterval(authCheckInterval)
  }
})
</script>

<template>
  <LayoutWrapper>
    <RouterView />
  </LayoutWrapper>
</template>

<style scoped>
</style>
