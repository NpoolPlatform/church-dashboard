import { CoinAccount, GoodBenefit } from './types'

interface CoinAccountsState {
  CoinAccounts: Array<CoinAccount>
  GoodBenefits: Map<string, GoodBenefit>
}

function state (): CoinAccountsState {
  return {
    CoinAccounts: [] as Array<CoinAccount>,
    GoodBenefits: new Map<string, GoodBenefit>()
  }
}

export {
  state,
  CoinAccountsState
}
