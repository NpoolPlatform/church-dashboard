import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CoinAccountsState } from './state'
import { CoinAccount } from './types'

type CoinAccountMutations<S = CoinAccountsState> = {
  [MutationTypes.SetCoinAccounts] (state: S, payload: Array<CoinAccount>): void
}

const mutations: MutationTree<CoinAccountsState> & CoinAccountMutations = {
  [MutationTypes.SetCoinAccounts] (state: CoinAccountsState, payload: Array<CoinAccount>) {
    state.CoinAccounts = payload
  }
}

export { CoinAccountMutations, mutations }
