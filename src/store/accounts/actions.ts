import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinAccountMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetCoinAccountsRequest, GetCoinAccountsResponse } from './types'

interface CoinAccountActions {
  [ActionTypes.GetCoinAccounts]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: GetCoinAccountsRequest): void
}

const actions: ActionTree<CoinAccountsState, RootState> = {
  [ActionTypes.GetCoinAccounts] ({ commit }, req: GetCoinAccountsRequest) {
    doAction<GetCoinAccountsRequest, GetCoinAccountsResponse>(
      commit,
      API.GET_COIN_ACCOUNTS,
      req,
      req.Message,
      (resp: GetCoinAccountsResponse): void => {
        commit(MutationTypes.SetCoinAccounts, resp.Infos)
      })
  }
}

export {
  actions,
  CoinAccountActions
}
