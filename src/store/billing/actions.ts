import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { BillingsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { BillingMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateUserPaymentBalanceForOtherAppUserRequest,
  CreateUserPaymentBalanceForOtherAppUserResponse,
  GetCoinAccountTransactionsRequest,
  GetCoinAccountTransactionsResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetPlatformBenefitsRequest,
  GetPlatformBenefitsResponse,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  GetUserPaymentBalancesByOtherAppRequest,
  GetUserPaymentBalancesByOtherAppResponse,
  GetUserWithdrawsRequest,
  GetUserWithdrawsResponse,
  UpdateCoinAccountTransactionRequest,
  UpdateCoinAccountTransactionResponse
} from './types'

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

  [ActionTypes.CreateUserPaymentBalanceForOtherAppUser]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: CreateUserPaymentBalanceForOtherAppUserRequest): void

  [ActionTypes.GetUserPaymentBalancesByOtherApp]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: GetUserPaymentBalancesByOtherAppRequest): void

  [ActionTypes.UpdateCoinAccountTransaction]({
    commit
  }: AugmentedActionContext<
    BillingsState,
    RootState,
    BillingMutations<BillingsState>>,
    req: UpdateCoinAccountTransactionRequest): void
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
  },

  [ActionTypes.CreateUserPaymentBalanceForOtherAppUser] ({ commit }, req: CreateUserPaymentBalanceForOtherAppUserRequest) {
    doAction<CreateUserPaymentBalanceForOtherAppUserRequest, CreateUserPaymentBalanceForOtherAppUserResponse>(
      commit,
      API.CREATE_USER_PAYMENT_BALANCE_FOR_OTHER_APP_USER,
      req,
      req.Message,
      (resp: CreateUserPaymentBalanceForOtherAppUserResponse): void => {
        commit(MutationTypes.SetUserPaymentBalances, [resp.Info])
      })
  },

  [ActionTypes.GetUserPaymentBalancesByOtherApp] ({ commit }, req: GetUserPaymentBalancesByOtherAppRequest) {
    doAction<GetUserPaymentBalancesByOtherAppRequest, GetUserPaymentBalancesByOtherAppResponse>(
      commit,
      API.GET_USER_PAYMENT_BALANCES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetUserPaymentBalancesByOtherAppResponse): void => {
        commit(MutationTypes.SetUserPaymentBalances, resp.Infos)
      })
  },

  [ActionTypes.UpdateCoinAccountTransaction] ({ commit }, req: UpdateCoinAccountTransactionRequest) {
    doAction<UpdateCoinAccountTransactionRequest, UpdateCoinAccountTransactionResponse>(
      commit,
      API.UPDATE_COIN_ACCOUNT_TRANSACTION,
      req,
      req.Message,
      (resp: UpdateCoinAccountTransactionResponse): void => {
        commit(MutationTypes.UpdateCoinAccountTransaction, resp.Info)
      })
  }
}

export {
  actions,
  BillingActions
}
