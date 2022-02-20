import { CoinAccountTransaction, Payment, PlatformBenefit, UserBenefit, UserWithdraw } from './types'

interface BillingsState {
  PlatformBenefits: Array<PlatformBenefit>
  UserWithdraws: Array<UserWithdraw>
  Transactions: Array<CoinAccountTransaction>
  UserBenefits: Array<UserBenefit>
  Payments: Array<Payment>
}

function state (): BillingsState {
  return {
    PlatformBenefits: [],
    UserWithdraws: [],
    Transactions: [],
    UserBenefits: [],
    Payments: []
  }
}

export {
  state,
  BillingsState
}
