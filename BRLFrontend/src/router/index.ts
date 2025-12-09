import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '../stores/auth'

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
      path: '/view-resources',
      name: 'viewResources',
      component: () => import('../views/ViewResourcesView.vue'),
    },
    {
      path: '/resource/:id',
      name: 'resource',
      component: () => import('../views/ResourceView.vue'),
    },
    {
      path: '/flower-sso',
      name: 'flowerSSO',
      beforeEnter: () => {
        // Redirect to Flower SSO (update with actual SSO URL)
        window.location.href = 'http://localhost:5174/'
        return false
      },
      component: HomeView, // Dummy component, won't be reached
    },
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth()
  
  // Check if user is authenticated
  const isAuthenticated = checkAuth()
  
  // If not authenticated, redirect to FlowerSSO with return URL
  if (!isAuthenticated) {
    // Build the redirect URL to come back to BRL after login
    const currentUrl = window.location.origin + to.fullPath
    const ssoUrl = `http://localhost:5174/?redirect=${encodeURIComponent(currentUrl)}`
    window.location.href = ssoUrl
    return false
  }
  
  next()
})

export default router
