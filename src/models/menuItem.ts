import { RouteName, RoutePath } from '../router/routes'
import { Role } from '../store/root-state/state'

export interface MenuItem {
  label?: string
  routeName: RouteName
  path: RoutePath
  icon?: string
  caption?: string
  showIf: Role|'none'
}

export const menu: MenuItem[] = [
  {
    path: 'dashboard',
    routeName: 'AgencyDashboard',
    icon: 'dashboard',
    showIf: 'agency'
  },
  {
    path: 'dashboard',
    routeName: 'AdminDashboard',
    icon: 'dashboard',
    showIf: 'admin'
  },
]
