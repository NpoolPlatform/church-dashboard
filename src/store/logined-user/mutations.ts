import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState, state as emptyState } from './state'
import { UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo] (state: S, payload: UserInfo): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.Reset] (state: S): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetUserInfo] (state: UserState, payload: UserInfo) {
    state.Info = payload
  },
  [MutationTypes.SetError] (state: UserState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetLoading] (state: UserState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.Reset] (state: UserState) {
    Object.assign(state, { ...emptyState })
  }
}

export { UserMutations, mutations }
