import { Campaign } from '../../models/campaign'
import { Client } from '../../models/client'

export type Role = 'admin'|'agency'|'client';

export interface AgencyModuleState {
  campaigns: Campaign[],
  clients: Client[]
}

function state (): AgencyModuleState {
  return {
    campaigns: [],
    clients: []
  }
}

export default state
