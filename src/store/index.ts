import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, useStore as vuexUseStore, createLogger } from 'vuex'
import authModule from './auth-module'
import VuexPersistence from 'vuex-persist'

export interface State {
  theme: string;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<State>
  }
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<State>> = Symbol('vuex-key')

export default store(() => {
  return createStore<State>({
    modules: {
      authModule
    },
    plugins: [createLogger(), vuexLocal.plugin],
    strict: !!process.env.DEBUGGING
  })
})

export function useStore () {
  return vuexUseStore(storeKey)
}
