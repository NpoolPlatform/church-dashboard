import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinAccountsState } from './state'
import { CoinAccount } from './types'

type CoinAccountGetters = {
  getCoinAccounts (state: CoinAccountsState): Array<CoinAccount>
}

const getters: GetterTree<CoinAccountsState, RootState> & CoinAccountGetters = {
  getCoinAccounts: (state: CoinAccountsState): Array<CoinAccount> => state.CoinAccounts
}

export { CoinAccountGetters, getters }
