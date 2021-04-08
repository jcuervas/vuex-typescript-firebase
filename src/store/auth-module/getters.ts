import { GetterTree } from 'vuex'
import { State } from '../index'
import { AuthModuleState } from './state'
import firebase from 'firebase/app'

export type AuthModuleGetters = {
  getUser (state: AuthModuleState): firebase.User | null
}

const getters: GetterTree<AuthModuleState, State> & AuthModuleGetters = {
  getUser (state) {
    return state.user
  }
}

export default getters
