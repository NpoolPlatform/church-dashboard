import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinAccountsState } from './state'
import { CoinAccount, GoodBenefit, GoodPayment } from './types'

type CoinAccountGetters = {
  getCoinAccounts (state: CoinAccountsState): Array<CoinAccount>
  getGoodBenefitByGood (state: CoinAccountsState): (goodID: string) => GoodBenefit
  getGoodPaymentsByGood (state: CoinAccountsState): (goodID: string) => Array<GoodPayment>
}

const getters: GetterTree<CoinAccountsState, RootState> & CoinAccountGetters = {
  getCoinAccounts: (state: CoinAccountsState): Array<CoinAccount> => state.CoinAccounts,
  getGoodBenefitByGood: (state: CoinAccountsState): (goodID: string) => GoodBenefit => {
    return (goodID: string) => {
      return state.GoodBenefits.get(goodID) as GoodBenefit
    }
  },
  getGoodPaymentsByGood: (state: CoinAccountsState): (goodID: string) => Array<GoodPayment> => {
    return (goodID: string) => {
      return state.GoodPayments.get(goodID) as Array<GoodPayment>
    }
  }
}

export { CoinAccountGetters, getters }
