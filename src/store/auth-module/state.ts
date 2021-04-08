import firebase from 'firebase/app'

export interface AuthModuleState {
  isAuthenticated: boolean;
  user: firebase.User|null
}

function state (): AuthModuleState {
  return {
    isAuthenticated: false,
    user: null
  }
}

export default state
