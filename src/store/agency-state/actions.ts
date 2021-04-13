import { ActionContext, ActionTree } from 'vuex'
import { State } from '../index'
import { AgencyModuleMutations } from './mutations'
import { AgencyModuleState } from './state'
import { Campaign } from '../../models/campaign'
import { Client } from '../../models/client'
import useApi from '../../hooks/useApi'

type AgencyModuleCommit = {
  commit<K extends keyof AgencyModuleMutations> (
    key: K,
    payload: Parameters<AgencyModuleMutations[K]>[1]
  ): ReturnType<AgencyModuleMutations[K]>;
}
type CustomActionContext = Omit<ActionContext<AgencyModuleState, State>, 'commit'> & AgencyModuleCommit

export type AgencyModuleActions = {
  getCampaigns(context: CustomActionContext): Promise<Campaign[]>
  getClients(context: CustomActionContext): Promise<Client[]>
}

const actions: ActionTree<AgencyModuleState, State> & AgencyModuleActions = {
  getCampaigns (context): Promise<Campaign[]> {
    console.log({context})
    return useApi.getCampaigns()
  },
  getClients (context): Promise<Client[]> {
    console.log({context})
    return useApi.getClients()
  }
}

export default actions
