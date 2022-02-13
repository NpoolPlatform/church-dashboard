import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { CoinAccount, GoodBenefit, GoodPayment } from './types'

type CoinAccountMutations<S = CoinAccountsState> = {
  [MutationTypes.SetCoinAccounts] (state: S, payload: Array<CoinAccount>): void
  [MutationTypes.SetGoodBenefit] (state: S, payload: GoodBenefit): void
  [MutationTypes.SetGoodPayments] (state: S, payload: Array<GoodPayment>): void
  [MutationTypes.SetCoinAccount] (state: S, payload: CoinAccount): void
}

const mutations: MutationTree<CoinAccountsState> & CoinAccountMutations = {
  [MutationTypes.SetCoinAccounts] (state: CoinAccountsState, payload: Array<CoinAccount>) {
    state.CoinAccounts = payload
  },
  [MutationTypes.SetGoodBenefit] (state: CoinAccountsState, payload: GoodBenefit) {
    state.GoodBenefits.set(payload.GoodID, payload)
  },
  [MutationTypes.SetGoodPayments] (state: CoinAccountsState, payload: Array<GoodPayment>) {
    if (payload.length > 0) {
      state.GoodPayments.set(payload[0].GoodID, payload)
    }
  },
  [MutationTypes.SetCoinAccount] (state: CoinAccountsState, payload: CoinAccount) {
    state.CoinAccounts.splice(0, 0, payload)
  }
}

export { CoinAccountMutations, mutations }
