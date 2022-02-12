import { Module } from 'vuex'
import { RootState } from '../index'
import { state, CoinAccountsState } from './state'
import { CoinAccountGetters, getters } from './getters'
import { CoinAccountMutations, mutations } from './mutations'
import { CoinAccountActions, actions } from './actions'

const coinAccounts: Module<CoinAccountsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  coinAccounts, CoinAccountsState,
  mutations, CoinAccountMutations,
  getters, CoinAccountGetters,
  actions, CoinAccountActions
}
