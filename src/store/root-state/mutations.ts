import { MutationTree } from 'vuex'
import { Role, RootState } from './state'
import firebase from 'firebase/compat/app'

export type RootMutations<S = RootState> = {
  user (state: S, user: firebase.User|null): void
  addRole (state: S, role: Role): void
  isAdmin (state: S, value: boolean): void
  isAgency (state: S, value: boolean): void
  isAuthenticated (state: S, authenticated: boolean): void
}

const mutation: MutationTree<RootState> & RootMutations = {
  user (state, user) {
    state.user = user
  },
  addRole (state, role) {
    if (!state.roles.find(r => r === role)) {
      state.roles.push(role)
    }
  },
  isAdmin (state, value) {
    state.isAdmin = value
  },
  isAgency (state, value) {
    state.isAgency = value
  },
  isAuthenticated (state, authenticated) {
    state.isAuthenticated = authenticated
  }
}

export default mutation
