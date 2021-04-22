import { ActionContext, ActionTree } from 'vuex'
import { RootMutations } from './mutations'
import { Role, RootState } from './state'
import useAuth from '../../hooks/useAuth'
import useApi from '../../hooks/useApi'
import useFirebase from 'src/hooks/useFirebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

type RootCommit = {
  commit<K extends keyof RootMutations> (
    key: K,
    payload?: Parameters<RootMutations[K]>[1]
  ): ReturnType<RootMutations[K]>;
}
type RootActionContext = Omit<ActionContext<RootState, RootState>, 'commit'> & RootCommit

export type RootActions = {
  login (context: RootActionContext, payload: { username: string; password: string }): Promise<void>
  logout (context: RootActionContext): Promise<boolean>
  recover (context: RootActionContext, email: string): Promise<void>
  hasRole (context: RootActionContext, role: Role): boolean
  uploadFile (context: RootActionContext, payload: { path: string; file: File }): firebase.storage.UploadTask
  getPublicUrlFromStorage (context: RootActionContext, path: string): Promise<string>
  getData<T> (context: RootActionContext, id: string): Promise<T>
}

const actions: ActionTree<RootState, RootState> & RootActions = {
  async login (context, {
    username,
    password
  }) {
    const user = await useAuth.login(username, password)
    if (user) {
      context.commit('isAuthenticated', true)
      context.commit('user', user)
      const claims = await user.getIdTokenResult();
      (Object.keys(claims.claims) as Role[])
        .filter(claim => ['admin', 'client', 'agency'].includes(claim))
        .forEach(role => {
          context.commit('addRole', role)
          if (role === 'admin') {
            context.commit('isAdmin', true)
          }
          if (role === 'agency') {
            context.commit('isAgency', true)
          }
        })
    }
  },
  logout (context) {
    context.commit('isAuthenticated', false)
    context.commit('isAdmin', false)
    context.commit('isAgency', false)
    context.commit('user', null)
    return useAuth.logout()
  },
  recover (context, email): Promise<void> {
    return useApi.recoverPassword(email)
  },
  hasRole (context, role): boolean {
    return !!context.state.roles.find(r => r === role)
  },
  getData<T>(context: RootActionContext, id: string): Promise<T> {
    return useApi.getData<T>(id)
  },
  uploadFile (context, {
    path,
    file
  }): firebase.storage.UploadTask {
    return useFirebase.uploadToStorage(path, file)
  },
  getPublicUrlFromStorage (context, path) {
    return useFirebase.getPublicUrlFromStorage(path)
  }
}

export default actions
