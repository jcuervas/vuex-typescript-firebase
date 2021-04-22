import { RouteRecordRaw } from 'vue-router'
import useAuth from '../hooks/useAuth'
import { appStore } from '../store'

export type RoutePath = '/' |
  'dashboard' | '/auth' | 'login' | 'recover' |
  '/:catchAll(.*)*'

export type RouteName = 'Home' |
  'Agency' | 'AgencyDashboard' |
  'Admin' | 'AdminDashboard' |
  'Auth' | 'Login' | 'Recover'

export interface Toolbar {
  label: string
  icon: string
  to: string
}

const toolbars = {
  dashboard: {
    label: 'appName'
  },
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',

    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: async (to, from, next) => {
      const name = (appStore.state.isAdmin && 'Admin') || (appStore.state.isAgency && 'Agency') || 'Login'
      if (name === 'Login') {
        // ensure there is no infinite redirections
        await appStore.dispatch('logout')
      }
      return next({ name })
    }
  },
  {
    path: '/agency',
    name: 'Agency',
    meta: {
      toolbar: toolbars.dashboard
    },
    redirect: { name: 'Campaigns' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AgencyDashboard',
        component: () => import('pages/agency/Dashboard.vue')
      },
    ],
    beforeEnter: (to, from, next) => {
      if (appStore.state.isAgency) {
        return next()
      }
      return next({ name: 'Login' })
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      toolbar: toolbars.dashboard
    },
    redirect: { name: 'AdminDashboard' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('pages/admin/Dashboard.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (appStore.state.isAdmin) {
        return next()
      }
      return next({ name: 'Login' })
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'Login' },
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = useAuth.isAuthenticated()
      const hasClaims = useAuth.hasAnyClaim()
      if (isAuthenticated && hasClaims) {
        return next({ name: 'Home' })
      } else {
        return next()
      }
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/auth/Login.vue')
      },
      {
        path: 'recover',
        name: 'Recover',
        component: () => import('pages/auth/Recover.vue')
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
