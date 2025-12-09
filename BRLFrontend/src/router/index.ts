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

export default router
