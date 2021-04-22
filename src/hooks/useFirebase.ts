import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

function useFirebase () {
  async function get<T> (path: string, order?: string, equal?: string | number) {
    const ref = firebase.database().ref(path)
    if (order) {
      ref.orderByChild(order)
    }
    if (equal) {
      ref.equalTo(equal)
    }
    const data = await ref.once('value')
    return data.val() as T
  }

  async function recoverPassword (email: string) {
    return await firebase.auth().sendPasswordResetEmail(email)
  }

  async function put<T> (path: string, data: any) {
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
    const ref = firebase.database().ref(path)
    const result = await ref.update(data)
    return result as T
  }

  function uploadToStorage (path: string, file: File) {
    return firebase.storage().ref(path).put(file)
  }

  function getPublicUrlFromStorage (path: string) {
    return firebase.storage().ref(path).getDownloadURL()
  }

  return {
    get,
    put,
    recoverPassword,
    uploadToStorage,
    getPublicUrlFromStorage
  }
}

export default useFirebase()
