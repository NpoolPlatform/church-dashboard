import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { BillingsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { BillingMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetCoinAccountTransactionsRequest, GetCoinAccountTransactionsResponse, GetPaymentsRequest, GetPaymentsResponse, GetPlatformBenefitsRequest, GetPlatformBenefitsResponse, GetUserBenefitsRequest, GetUserBenefitsResponse, GetUserWithdrawsRequest, GetUserWithdrawsResponse } from './types'

interface BillingActions {
  [ActionTypes.GetPlatformBenefits]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetPlatformBenefitsRequest): void

  [ActionTypes.GetUserBenefits]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetUserBenefitsRequest): void

  [ActionTypes.GetUserWithdrawItems]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetUserWithdrawsRequest): void

  [ActionTypes.GetCoinAccountTransactions]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetCoinAccountTransactionsRequest): void

  [ActionTypes.GetPayments]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetPaymentsRequest): void
}

const actions: ActionTree<BillingsState, RootState> = {
  [ActionTypes.GetPlatformBenefits] ({ commit }, req: GetPlatformBenefitsRequest) {
    doAction<GetPlatformBenefitsRequest, GetPlatformBenefitsResponse>(
      commit,
      API.GET_PLATFORM_BENEFITS,
      req,
      req.Message,
      (resp: GetPlatformBenefitsResponse): void => {
        commit(MutationTypes.SetPlatformBenefits, resp.Infos)
      })
  },

  [ActionTypes.GetUserBenefits] ({ commit }, req: GetUserBenefitsRequest) {
    doAction<GetUserBenefitsRequest, GetUserBenefitsResponse>(
      commit,
      API.GET_USER_BENEFITS,
      req,
      req.Message,
      (resp: GetUserBenefitsResponse): void => {
        commit(MutationTypes.SetUserBenefits, resp.Infos)
      })
  },

  [ActionTypes.GetCoinAccountTransactions] ({ commit }, req: GetCoinAccountTransactionsRequest) {
    doAction<GetCoinAccountTransactionsRequest, GetCoinAccountTransactionsResponse>(
      commit,
      API.GET_COIN_ACCOUNT_TRANSACTIONS,
      req,
      req.Message,
      (resp: GetCoinAccountTransactionsResponse): void => {
        commit(MutationTypes.SetCoinAccountTransactions, resp.Infos)
      })
  },

  [ActionTypes.GetUserWithdrawItems] ({ commit }, req: GetUserWithdrawsRequest) {
    doAction<GetUserWithdrawsRequest, GetUserWithdrawsResponse>(
      commit,
      API.GET_USER_WITHDRAW_ITEMS,
      req,
      req.Message,
      (resp: GetUserWithdrawsResponse): void => {
        commit(MutationTypes.SetUserWithdrawItems, resp.Infos)
      })
  },

  [ActionTypes.GetPayments] ({ commit }, req: GetPaymentsRequest) {
    doAction<GetPaymentsRequest, GetPaymentsResponse>(
      commit,
      API.GET_PAYMENTS,
      req,
      req.Message,
      (resp: GetPaymentsResponse): void => {
        commit(MutationTypes.SetPayments, resp.Infos)
      })
  }
}

export {
  actions,
  BillingActions
}
