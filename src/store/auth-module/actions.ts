import { ActionContext, ActionTree } from 'vuex'
import { State } from '../index'
import useAuth from '../../hooks/useAuth'
import { AuthModuleMutations } from './mutations'
import { AuthModuleState } from './state'

type AuthModuleCommit = {
  commit<K extends keyof AuthModuleMutations> (
    key: K,
    payload: Parameters<AuthModuleMutations[K]>[1]
  ): ReturnType<AuthModuleMutations[K]>;
}
type CustomActionContext = Omit<ActionContext<AuthModuleState, State>, 'commit'> & AuthModuleCommit

export type AuthModuleActions = {
  login(context: CustomActionContext, payload: {username: string; password: string}): Promise<void>
  logout(): Promise<boolean>
}

const actions: ActionTree<AuthModuleState, State> & AuthModuleActions = {
  async login (context, {username, password}) {
    const user = await useAuth.login(username, password)
    if (user) {
      context.commit('user', user)
    }
  },
  logout () {
    return useAuth.logout()
  }
}

export default actions
