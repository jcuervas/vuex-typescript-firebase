import firebase from 'firebase/app'

export type Role = 'admin'|'agency'|'client';

export interface AuthModuleState {
  isAuthenticated: boolean;
  user: firebase.User|null;
  roles: Role[];
}

function state (): AuthModuleState {
  return {
    isAuthenticated: false,
    user: null,
    roles: []
  }
}

export default state
