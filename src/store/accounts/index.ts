import { Module } from 'vuex'
import { RootState } from '../index'
import { state, CoinAccountsState } from './state'
import { CoinAccountGetters, getters } from './getters'
import { CoinAccountMutations, mutations } from './mutations'
import { CoinAccountActions, actions } from './actions'

const accounts: Module<CoinAccountsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  accounts, CoinAccountsState,
  mutations, CoinAccountMutations,
  getters, CoinAccountGetters,
  actions, CoinAccountActions
}
