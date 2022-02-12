import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinAccountsState } from './state'
import { CoinAccount, GoodBenefit } from './types'

type CoinAccountGetters = {
  getCoinAccounts (state: CoinAccountsState): Array<CoinAccount>
  getGoodBenefitByGood (state: CoinAccountsState): (goodID: string) => GoodBenefit
}

const getters: GetterTree<CoinAccountsState, RootState> & CoinAccountGetters = {
  getCoinAccounts: (state: CoinAccountsState): Array<CoinAccount> => state.CoinAccounts,
  getGoodBenefitByGood: (state: CoinAccountsState): (goodID: string) => GoodBenefit => {
    return (goodID: string) => {
      return state.GoodBenefits.get(goodID) as GoodBenefit
    }
  }
}

export { CoinAccountGetters, getters }
