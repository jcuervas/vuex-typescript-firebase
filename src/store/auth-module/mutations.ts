import {MutationTree} from 'vuex'
import { AuthModuleState, Role } from './state'
import firebase from 'firebase'

export type AuthModuleMutations<S = AuthModuleState> = {
  user (state: S, user: firebase.User): void
  addRole (state: S, role: Role): void
}

const mutation: MutationTree<AuthModuleState> & AuthModuleMutations = {
  user (state, user) {
    state.user = user
  },
  addRole (state, role) {
    if (!state.roles.find(r => r === role)) {
      state.roles.push(role)
    }
  }
}

export default mutation
