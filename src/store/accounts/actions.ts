import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinAccountMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { CreateGoodBenefitRequest, CreateGoodBenefitResponse, CreatePlatformCoinAccountRequest, CreatePlatformCoinAccountResoponse, CreateUserCoinAccountRequest, CreateUserCoinAccountResoponse, GetCoinAccountsRequest, GetCoinAccountsResponse, GetGoodBenefitByGoodRequest, GetGoodBenefitByGoodResponse, GetGoodPaymentsByGoodRequest, GetGoodPaymentsByGoodResponse, UpdateGoodBenefitRequest, UpdateGoodBenefitResponse } from './types'

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

  [ActionTypes.CreateGoodBenefit]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: CreateGoodBenefitRequest): void

  [ActionTypes.UpdateGoodBenefit]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: UpdateGoodBenefitRequest): void

  [ActionTypes.CreatePlatformCoinAccount]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: CreatePlatformCoinAccountRequest): void

  [ActionTypes.CreateUserCoinAccount]({
    commit
  }: AugmentedActionContext<
  CoinAccountsState,
    RootState,
    CoinAccountMutations<CoinAccountsState>>,
    req: CreateUserCoinAccountRequest): void
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
  },

  [ActionTypes.CreateGoodBenefit] ({ commit }, req: CreateGoodBenefitRequest) {
    doAction<CreateGoodBenefitRequest, CreateGoodBenefitResponse>(
      commit,
      API.CREATE_GOOD_BENEFIT,
      req,
      req.Message,
      (resp: CreateGoodBenefitResponse): void => {
        commit(MutationTypes.SetGoodBenefit, resp.Info)
      })
  },

  [ActionTypes.UpdateGoodBenefit] ({ commit }, req: UpdateGoodBenefitRequest) {
    doAction<UpdateGoodBenefitRequest, UpdateGoodBenefitResponse>(
      commit,
      API.UPDATE_GOOD_BENEFIT,
      req,
      req.Message,
      (resp: UpdateGoodBenefitResponse): void => {
        commit(MutationTypes.SetGoodBenefit, resp.Info)
      })
  },

  [ActionTypes.CreatePlatformCoinAccount] ({ commit }, req: CreatePlatformCoinAccountRequest) {
    doAction<CreatePlatformCoinAccountRequest, CreatePlatformCoinAccountResoponse>(
      commit,
      API.CREATE_PLATFORM_COIN_ACCOUNT,
      req,
      req.Message,
      (resp: CreatePlatformCoinAccountResoponse): void => {
        commit(MutationTypes.SetCoinAccount, resp.Info)
      })
  },

  [ActionTypes.CreateUserCoinAccount] ({ commit }, req: CreateUserCoinAccountRequest) {
    doAction<CreateUserCoinAccountRequest, CreateUserCoinAccountResoponse>(
      commit,
      API.CREATE_PLATFORM_COIN_ACCOUNT,
      req,
      req.Message,
      (resp: CreateUserCoinAccountResoponse): void => {
        commit(MutationTypes.SetCoinAccount, resp.Info)
      })
  }
}

export {
  actions,
  CoinAccountActions
}
