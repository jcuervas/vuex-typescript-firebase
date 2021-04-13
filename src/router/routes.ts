import { RouteRecordRaw } from 'vue-router'
import useAuth from '../hooks/useAuth'
import { appStore } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: async (to, from, next) => {
      console.log('go to home')
      console.log({admin: await appStore.dispatch('authModule/hasRole', 'admin')})
      console.log({agency: await appStore.dispatch('authModule/hasRole', 'agency')})
      console.log({client: await appStore.dispatch('authModule/hasRole', 'client')})
      if (await appStore.dispatch('authModule/hasRole', 'admin')) {
        return next({name: 'Admin'})
      }
      if (await appStore.dispatch('authModule/hasRole', 'agency')) {
        return next({name: 'Agency'})
      }
      if (await appStore.dispatch('authModule/hasRole', 'client')) {
        return next({name: 'Client'})
      }
      return next({name: 'Login'})
    }
  },
  {
    path: '/agency',
    name: 'Agency',
    redirect: {name: 'AgencyDashboard'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AgencyDashboard',
        component: () => import('pages/agency/Dashboard.vue')
      }
    ],
    beforeEnter: async (to, from, next) => {
      if (await appStore.dispatch('authModule/hasRole', 'agency')) {
        return next()
      }
      return next({ name: 'Login' })
    }
  },
  {
    path: '/client',
    name: 'Client',
    redirect: {name: 'ClientDashboard'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'ClientDashboard',
        component: () => import('pages/client/Dashboard.vue')
      }
    ],
    beforeEnter: async (to, from, next) => {
      if (await appStore.dispatch('authModule/hasRole', 'client')) {
        return next()
      }
      return next({ name: 'Login' })
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: {name: 'AdminDashboard'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('pages/admin/Dashboard.vue')
      }
    ],
    beforeEnter: async (to, from, next) => {
      if (await appStore.dispatch('authModule/hasRole', 'admin')) {
        return next()
      }
      return next({ name: 'Login' })
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: {name: 'Login'},
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/auth/Login.vue'),
        beforeEnter: async (to, from, next) => {
          if (await useAuth.isAuthenticated() && await useAuth.hasClaims()) {
            return next({ name: 'Home' })
          } else {
            return next()
          }
        }
      },
      {
        path: 'recover',
        name: 'Recover',
        component: () => import('pages/auth/Recover.vue'),
        beforeEnter: async (to, from, next) => {
          if (await useAuth.isAuthenticated() && await useAuth.hasClaims()) {
            return next({ name: 'Home' })
          } else {
            return next()
          }
        }
      }
    ]
  },
  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
