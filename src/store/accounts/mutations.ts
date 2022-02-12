import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { CoinAccount, GoodBenefit } from './types'

type CoinAccountMutations<S = CoinAccountsState> = {
  [MutationTypes.SetCoinAccounts] (state: S, payload: Array<CoinAccount>): void
  [MutationTypes.SetGoodBenefit] (state: S, payload: GoodBenefit): void
}

const mutations: MutationTree<CoinAccountsState> & CoinAccountMutations = {
  [MutationTypes.SetCoinAccounts] (state: CoinAccountsState, payload: Array<CoinAccount>) {
    state.CoinAccounts = payload
  },
  [MutationTypes.SetGoodBenefit] (state: CoinAccountsState, payload: GoodBenefit) {
    state.GoodBenefits.set(payload.GoodID, payload)
  }
}

export { CoinAccountMutations, mutations }
