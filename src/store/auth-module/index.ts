import { Module } from 'vuex'
import { State } from '../index'
import state, { AuthModuleState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const authModule: Module<AuthModuleState, State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default authModule
