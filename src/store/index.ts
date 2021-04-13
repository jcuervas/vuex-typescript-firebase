import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { CommitOptions, createLogger, createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex'
import authModule from './auth-module'
import { AuthModuleState } from './auth-module/state'
import { AuthModuleMutations } from './auth-module/mutations'
import { AuthModuleGetters } from './auth-module/getters'
import { AgencyModuleState } from './agency-state/state'
import { AgencyModuleMutations } from './agency-state/mutations'
import { AgencyModuleGetters } from './agency-state/getters'
import agencyModule from './agency-state'

export type State = AuthModuleState & AgencyModuleState
export type Mutations = AuthModuleMutations & AgencyModuleMutations
export type Getters = AuthModuleGetters & AgencyModuleGetters

type Store<S = State> = Omit<VuexStore<S>, 'commit' | 'getters'>
  & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const storeKey: InjectionKey<Store> = Symbol('vuex-key')

export let appStore: Store

export default store(() => {
  appStore = createStore<State>({
    modules: {
      authModule,
      agencyModule
    },
    plugins: [createLogger()],
    strict: !!process.env.DEBUGGING
  })
  return appStore
})

export function useStore (): Store {
  return vuexUseStore(storeKey)
}
