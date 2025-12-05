import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Profile from '../views/Profile.vue'
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  // Check if user is authenticated from localStorage
  checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
