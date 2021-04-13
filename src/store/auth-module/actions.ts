import { ActionContext, ActionTree } from 'vuex'
import { State } from '../index'
import useAuth from '../../hooks/useAuth'
import { AuthModuleMutations } from './mutations'
import { AuthModuleState, Role } from './state'
import useApi from '../../hooks/useApi'

type AuthModuleCommit = {
  commit<K extends keyof AuthModuleMutations> (
    key: K,
    payload: Parameters<AuthModuleMutations[K]>[1]
  ): ReturnType<AuthModuleMutations[K]>;
}
type CustomActionContext = Omit<ActionContext<AuthModuleState, State>, 'commit'> & AuthModuleCommit

export type AuthModuleActions = {
  login (context: CustomActionContext, payload: {username: string; password: string}): Promise<void>
  logout (): Promise<boolean>
  recover (context: CustomActionContext, email: string): void
  hasRole (context: CustomActionContext, role: Role): boolean
}

const actions: ActionTree<AuthModuleState, State> & AuthModuleActions = {
  async login (context, {username, password}) {
    const user = await useAuth.login(username, password)
    if (user) {
      context.commit('user', user)
      const claims = await user.getIdTokenResult();
      (Object.keys(claims.claims) as Role[]).forEach(role => {
        context.commit('addRole', role)
      })
    }
  },
  logout () {
    return useAuth.logout()
  },
  recover (context, email): void {
    return useApi.recoverPassword(email)
  },
  hasRole (context, role): boolean {
    return !!context.state.roles.find(r => r === role)
  }
}

export default actions
