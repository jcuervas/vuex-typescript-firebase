import GenericError from '../errors/generic-error'
import UserLoginError from '../errors/user-login-error'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { appStore } from '../store'

function useAuth () {
  function isAuthenticated () {
    return appStore.state.isAuthenticated
  }

  function hasAnyClaim () {
    return appStore.state.isClient ||
      appStore.state.isAgency ||
      appStore.state.isAdmin
  }

  function canUserAccess () {
    return true
  }

  async function login (username: string, password: string): Promise<firebase.User | null> {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const credential = await firebase.auth().signInWithEmailAndPassword(username, password)
      return credential.user
    } catch (e) {
      throw new UserLoginError(e)
    }
  }

  async function logout (): Promise<boolean> {
    try {
      await firebase.auth().signOut()
      return true
    } catch (e) {
      throw new GenericError(e)
    }
  }

  return {
    isAuthenticated,
    canUserAccess,
    hasAnyClaim,
    login,
    logout
  }
}

export default useAuth()
