import { GetterTree } from 'vuex'
import firebase from 'firebase/compat/app'
import { Role, RootState } from './state'

export type RootGetters<S = RootState> = {
  getUser (state: S): firebase.User | null
  mainRole (state: S): Role
}

const getters: GetterTree<RootState, RootState> & RootGetters = {
  getUser (state) {
    return state.user
  },
  mainRole (state): Role {
    return (state.isAdmin && 'admin') ||
      (state.isAgency && 'agency') || 'none'
  }
}

export default getters
