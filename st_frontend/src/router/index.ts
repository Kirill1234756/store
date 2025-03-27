import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    props: true
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    props: route => ({ type: route.query.type || 'login' })
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router