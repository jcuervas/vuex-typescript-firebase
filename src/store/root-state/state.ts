import firebase from 'firebase/compat'
import { MenuItem } from 'src/models/menuItem'

export type Role = 'admin' | 'Admin' | 'agency' | 'Agency' | 'none';

export interface RootState {
  isAuthenticated: boolean
  user: firebase.User | null
  roles: Role[]
  isAdmin: boolean
  isAgency: boolean
  menu: MenuItem[]
}

export function state (): RootState {
  return {
    isAuthenticated: false,
    user: null,
    roles: [],
    isAdmin: false,
    isAgency: false,
    menu: []
  }
}
