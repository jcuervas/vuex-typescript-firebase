import { GetterTree } from 'vuex'
import { State } from '../index'
import { AgencyModuleState } from './state'
import { Campaign } from '../../models/campaign'

export type AgencyModuleGetters<S = AgencyModuleState> = {
  getCampaigns(state: S): Campaign[]
}

const getters: GetterTree<AgencyModuleState, State> & AgencyModuleGetters = {
  getCampaigns (state: AgencyModuleState): Campaign[] {
    return state.campaigns
  }
}

export default getters
