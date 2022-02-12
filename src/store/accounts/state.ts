import { CoinAccount, GoodBenefit, GoodPayment } from './types'

interface CoinAccountsState {
  CoinAccounts: Array<CoinAccount>
  GoodBenefits: Map<string, GoodBenefit>
  GoodPayments: Map<string, Array<GoodPayment>>
}

function state (): CoinAccountsState {
  return {
    CoinAccounts: [] as Array<CoinAccount>,
    GoodBenefits: new Map<string, GoodBenefit>(),
    GoodPayments: new Map<string, Array<GoodPayment>>()
  }
}

export {
  state,
  CoinAccountsState
}
