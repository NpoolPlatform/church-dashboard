import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { BillingsState } from './state'
import { CoinAccountTransaction, Payment, PlatformBenefit, UserBenefit, UserWithdraw } from './types'

type BillingMutations<S = BillingsState> = {
  [MutationTypes.SetPlatformBenefits] (state: S, payload: Array<PlatformBenefit>): void
  [MutationTypes.SetUserBenefits] (state: S, payload: Array<UserBenefit>): void
  [MutationTypes.SetCoinAccountTransactions] (state: S, payload: Array<CoinAccountTransaction>): void
  [MutationTypes.SetUserWithdrawItems] (state: S, payload: Array<UserWithdraw>): void
  [MutationTypes.SetPayments] (state: S, payload: Array<Payment>): void
}

const mutations: MutationTree<BillingsState> & BillingMutations = {
  [MutationTypes.SetPlatformBenefits] (state: BillingsState, payload: Array<PlatformBenefit>): void {
    state.PlatformBenefits = payload
  },
  [MutationTypes.SetUserBenefits] (state: BillingsState, payload: Array<UserBenefit>): void {
    state.UserBenefits = payload
  },
  [MutationTypes.SetCoinAccountTransactions] (state: BillingsState, payload: Array<CoinAccountTransaction>): void {
    state.Transactions = payload
  },
  [MutationTypes.SetUserWithdrawItems] (state: BillingsState, payload: Array<UserWithdraw>): void {
    state.UserWithdraws = payload
  },
  [MutationTypes.SetPayments] (state: BillingsState, payload: Array<Payment>): void {
    state.Payments = payload
  }
}

export { BillingMutations, mutations }
