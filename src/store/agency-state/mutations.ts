import {MutationTree} from 'vuex'
import { AgencyModuleState } from './state'
import { Campaign } from '../../models/campaign'

export type AgencyModuleMutations<S = AgencyModuleState> = {
  setCampaigns (state: S, campaigns: Campaign[]): void
}

const mutation: MutationTree<AgencyModuleState> & AgencyModuleMutations = {
  setCampaigns (state, campaigns) {
    state.campaigns = campaigns
  }
}

export default mutation
