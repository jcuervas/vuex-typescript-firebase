import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { createLogger, createStore, Store as VuexStore, useStore as vuexUseStore, DispatchOptions, CommitOptions } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { RootState, state } from './root-state/state'
import getters, { RootGetters } from './root-state/getters'
import actions, { RootActions } from './root-state/actions'
import mutations, { RootMutations } from './root-state/mutations'

export type State = RootState

type Actions = RootActions
type Mutations = RootMutations
type Getters = RootGetters

type Store<S = RootState> = Omit<VuexStore<S>, 'dispatch'|'commit'|'getters'> &
  {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  } &
  {
    dispatch<K extends keyof Actions> (
      key: K,
      payload?: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>;
  } &
  {
    getters: {
      [K in keyof Getters]: ReturnType<Getters[K]>;
    }
  }

export const storeKey: InjectionKey<Store> = Symbol('vuex-key')
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})
export let appStore: Store

export default store(() => {
  appStore = createStore<State>({
    state,
    getters,
    mutations,
    actions,
    plugins: [createLogger(), vuexLocal.plugin],
    strict: !!process.env.DEBUGGING
  })
  return appStore
})

export function useStore (): Store {
  return vuexUseStore(storeKey)
}
