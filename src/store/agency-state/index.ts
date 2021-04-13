import { Module } from 'vuex'
import { State } from '../index'
import state, { AgencyModuleState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const agencyModule: Module<AgencyModuleState, State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default agencyModule
