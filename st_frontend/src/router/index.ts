import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

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
  path: '/product/:id',
  name: 'product',
  component: () => import('@/views/ProductView.vue'),
  meta: {
    title: 'Страница товара'
  }
}бdfd 
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
  },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      meta: {
        title: 'Каталог iPhone | iRefurb'
      }
    },
    // Другие маршруты...
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash }
    } else {
      return { top: 0 }
    }
  }
})

// Обновление заголовка страницы
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string || 'iRefurb'
  document.title = title
  next()
})

export default router