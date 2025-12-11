import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
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
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUserListView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ],
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const { checkAuth, isAdmin } = useAuth()

  // Check if user is authenticated from localStorage
  checkAuth((isAuthed) => {
    if (isAuthed) {
      if (to.name === 'home') {
        next({ name: 'dashboard' })
      } else {
        next()
      }
    } else {
      if (to.name === 'home') {
        next()
      } else {
        console.log("not authed")
        next({ name: 'home', query: to.query })
      }
    }
  })
})

export default router
