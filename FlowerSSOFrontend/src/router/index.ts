import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
import AdminPendingRequestsView from '../views/AdminPendingRequestsView.vue'
import AdminUserListView from '../views/AdminUserListView.vue'
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
      path: '/create-profile',
      name: 'create-profile',
      component: CreateProfileView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/pending-requests',
      name: 'admin-pending-requests',
      component: AdminPendingRequestsView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUserListView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ],
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const { isAuthenticated, checkAuth, isAdmin } = useAuth()
  
  // Check if user is authenticated from localStorage
  checkAuth()
  
  // Allow home and create-profile routes without authentication
  if (to.name === 'home' || to.name === 'create-profile') {
    next()
    return
  }
  
  // Check authentication requirement
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'home' })
  } 
  // Check admin requirement
  else if (to.meta.requiresAdmin && !isAdmin()) {
    next({ name: 'dashboard' })
  } 
  else {
    next()
  }
})

export default router
