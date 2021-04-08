import firebase from 'firebase/app'
import 'firebase/auth'
import { UserLoginError } from '../errors/userLoginError'

function useAuth () {
  function isAuthenticated () {
    return firebase.auth().currentUser
  }

  function canUserAccess () {
    return true
  }

  async function login (username: string, password: string): Promise<firebase.User|null> {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      const credential = await firebase.auth().signInWithEmailAndPassword(username, password)
      return credential.user
    } catch (e) {
      throw new UserLoginError(e)
    }
  }

  return {
    isAuthenticated,
    canUserAccess,
    login
  }
}

export default useAuth()
