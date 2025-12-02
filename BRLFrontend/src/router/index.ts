import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/flower-sso',
      name: 'flowerSSO',
      beforeEnter: () => {
        // Redirect to Flower SSO (update with actual SSO URL)
        window.location.href = 'https://flower-sso.example.com'
      },
    },
  ],
})

export default router
