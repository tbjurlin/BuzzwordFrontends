import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '../stores/auth'

const FlowerSSOUrl = import.meta.env.VITE_FLOWER_SSO_URL || 'http://localhost:5174/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-resource',
      name: 'createResource',
      component: () => import('../views/CreateResourceView.vue'),
    },
    {
      path: '/your-resources',
      name: 'yourResources',
      component: () => import('../views/YourResourcesView.vue'),
    },
    {
      path: '/resource/:id',
      name: 'resource',
      component: () => import('../views/ResourceView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchResultView.vue')
    },
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const { checkAuth, setToken } = useAuth()
  
  // Check if there's a token in the URL (coming back from FlowerSSO)
  const urlParams = new URLSearchParams(window.location.search)
  const tokenFromUrl = urlParams.get('token')
  
  if (tokenFromUrl) {
    // Store the token from FlowerSSO
    setToken(tokenFromUrl)
    // Clean up URL to remove token parameter
    const cleanUrl = window.location.origin + to.fullPath.split('?')[0]
    window.history.replaceState({}, '', cleanUrl)
    next()
    return
  }
  
  // Check if user is authenticated
  const isAuthenticated = checkAuth()
  
  // If not authenticated, redirect to FlowerSSO with return URL
  if (!isAuthenticated) {
    // Build the redirect URL to come back to BRL after login
    const currentUrl = window.location.origin + to.fullPath
    const ssoUrl = `${FlowerSSOUrl}?redirect=${encodeURIComponent(currentUrl)}`
    
    // Prevent navigation and redirect to SSO
    window.location.href = ssoUrl
    return // Don't call next(), just redirect
  }
  
  next()
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const { checkAuth, setToken } = useAuth()
  
  // Check if there's a token in the URL (coming back from FlowerSSO)
  const urlParams = new URLSearchParams(window.location.search)
  const tokenFromUrl = urlParams.get('token')
  
  if (tokenFromUrl) {
    // Store the token from FlowerSSO
    setToken(tokenFromUrl)
    // Clean up URL to remove token parameter
    const cleanUrl = window.location.origin + to.fullPath.split('?')[0]
    window.history.replaceState({}, '', cleanUrl)
    next()
    return
  }
  
  // Check if user is authenticated
  const isAuthenticated = checkAuth()
  
  // If not authenticated, redirect to FlowerSSO with return URL
  if (!isAuthenticated) {
    // Build the redirect URL to come back to BRL after login
    const currentUrl = window.location.origin + to.fullPath
    const ssoUrl = `${FlowerSSOUrl}?redirect=${encodeURIComponent(currentUrl)}`
    
    // Prevent navigation and redirect to SSO
    window.location.href = ssoUrl
    return // Don't call next(), just redirect
  }
  
  next()
})

export default router
