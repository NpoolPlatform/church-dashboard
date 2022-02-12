import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinAccountMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetCoinAccountsRequest, GetCoinAccountsResponse, GetGoodBenefitByGoodRequest, GetGoodBenefitByGoodResponse, GetGoodPaymentsByGoodRequest, GetGoodPaymentsByGoodResponse } from './types'

interface CoinAccountActions {
  [ActionTypes.GetCoinAccounts]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: GetCoinAccountsRequest): void

  [ActionTypes.GetGoodBenefitByGood]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: GetGoodBenefitByGoodRequest): void

  [ActionTypes.GetGoodPaymentsByGood]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: GetGoodPaymentsByGoodRequest): void
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
  },

  [ActionTypes.GetGoodBenefitByGood] ({ commit }, req: GetGoodBenefitByGoodRequest) {
    doAction<GetGoodBenefitByGoodRequest, GetGoodBenefitByGoodResponse>(
      commit,
      API.GET_GOOD_BENEFIT_BY_GOOD,
      req,
      req.Message,
      (resp: GetGoodBenefitByGoodResponse): void => {
        if (resp.Info) {
          commit(MutationTypes.SetGoodBenefit, resp.Info)
        }
      })
  },

  [ActionTypes.GetGoodPaymentsByGood] ({ commit }, req: GetGoodPaymentsByGoodRequest) {
    doAction<GetGoodPaymentsByGoodRequest, GetGoodPaymentsByGoodResponse>(
      commit,
      API.GET_GOOD_PAYMENTS_BY_GOOD,
      req,
      req.Message,
      (resp: GetGoodPaymentsByGoodResponse): void => {
        commit(MutationTypes.SetGoodPayments, resp.Infos)
      })
  }
}

export {
  actions,
  CoinAccountActions
}
