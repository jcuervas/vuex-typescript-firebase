import {MutationTree} from 'vuex'
import { AuthModuleState } from './state'
import firebase from 'firebase'

export type AuthModuleMutations<S = AuthModuleState> = {
  user (state: S, user: firebase.User): void
}

const mutation: MutationTree<AuthModuleState> & AuthModuleMutations = {
  user (state, user) {
    state.user = user
  }
}

export default mutation
