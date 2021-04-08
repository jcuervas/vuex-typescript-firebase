import { RouteRecordRaw } from 'vue-router'
import useAuth from '../hooks/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }
    ],
    beforeEnter: async (to, from, next) => {
      if (await useAuth.isAuthenticated()) {
        return next()
      } else {
        return next({ name: 'Login' })
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/auth/Login.vue'),
    beforeEnter: async (to, from, next) => {
      if (await useAuth.isAuthenticated()) {
        return next({ name: 'Home' })
      } else {
        return next()
      }
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
