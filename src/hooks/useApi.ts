import { Campaign } from '../models/campaign'
import { Client } from '../models/client'
import firebase from 'firebase/app'
import { appStore } from '../store'
import { axios } from '../boot/axios'

type DataSource = 'firebase'|'webService'

const endPoints = {
  campaignsUrl: '',
  clientsUrl: ''
}

function useApi () {
  const dataSource: DataSource = process.env.DATA_SOURCE as DataSource || 'firebase'

  async function getCampaigns (): Promise<Campaign[]> {
    const user: firebase.User|null = appStore.getters.getUser
    if (!user) return []
    switch (dataSource) {
      case 'firebase': {
        const ref = await firebase.database().ref(`agencies/${user.uid}/clients`)
          .once('value')
        return (ref.val() as Client[]).map((client: Client) => client.campaigns)
      }
      case 'webService': {
        const response = await axios.get(endPoints.campaignsUrl)
        return response.data as Campaign[]
      }
    }
  }

  async function getClients (): Promise<Client[]> {
    const user: firebase.User|null = appStore.getters.getUser
    if (!user) return []
    switch (dataSource) {
      case 'firebase': {
        const ref = await firebase.database().ref(`agencies/${user.uid}/clients`)
          .once('value')
        return ref.val() as Client[]
      }
      case 'webService': {
        const response = await axios.get(endPoints.clientsUrl)
        return response.data as Client[]
      }
    }
  }

  function recoverPassword (email: string) {
    console.log({email})
  }

  return {
    getCampaigns,
    getClients,
    recoverPassword
  }
}

export default useApi()
