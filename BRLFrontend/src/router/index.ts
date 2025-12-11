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
      path: '/edit-resource/:id',
      name: 'editResource',
      component: () => import('../views/EditResourceView.vue'),
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
    {
      path: '/about-us',
      name: 'aboutUs',
      component: () => import('../views/AboutUsView.vue')
    }
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth()
  
  checkAuth((_) => {})
  
  next()
})

export default router
