import firebase from 'firebase/app'
import 'firebase/auth'
import GenericError from '../errors/generic-error'
import UserLoginError from '../errors/user-login-error'

function useAuth () {
  if (process.env.NODE_ENV === 'dev') {
    firebase.auth().useEmulator("http://localhost:9099");
  }

  function isAuthenticated () {
    return new Promise<boolean>(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user !== null)
      })
    })
  }

  function canUserAccess () {
    return true
  }

  async function login (username: string, password: string): Promise<firebase.User|null> {
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
    login,
    logout
  }
}

export default useAuth()
