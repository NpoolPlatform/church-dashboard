import { CoinAccount } from './types'

interface CoinAccountsState {
  CoinAccounts: Array<CoinAccount>
}

function state (): CoinAccountsState {
  return {
    CoinAccounts: [] as Array<CoinAccount>
  }
}

export {
  state,
  CoinAccountsState
}
