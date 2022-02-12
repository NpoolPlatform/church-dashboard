import { ReqMessage } from '../notifications/types'

interface CoinAccount {
  ID?: string
  CoinTypeID: string
  Address: string
  PlatformHoldPrivateKey: boolean
}

interface GetCoinAccountsRequest {
  Message: ReqMessage
}

interface GetCoinAccountsResponse {
  Infos: ReadonlyArray<CoinAccount>
}

interface GoodBenefit {
  ID: string
  GoodID: string
  BenefitAccountID: string
  PlatformOfflineAccountID: string
  UserOfflineAccountID: string
  UserOnlineAccountID: string
  BenefitIntervalHours: number
}

interface GetGoodBenefitByGoodRequest {
  GoodID: string
  Message: ReqMessage
}

interface GetGoodBenefitByGoodResponse {
  Info: GoodBenefit
}

interface GoodPayment {
  ID: string
  GoodID: string
  PaymentCoinTypeID: string
  AccountID: string
  Idle: boolean
}

interface GetGoodPaymentsByGoodRequest {
  GoodID: string
  Message: ReqMessage
}

interface GetGoodPaymentsByGoodResponse {
  Infos: Array<GoodPayment>
}

export {
  CoinAccount,
  GetCoinAccountsRequest,
  GetCoinAccountsResponse,
  GoodBenefit,
  GetGoodBenefitByGoodRequest,
  GetGoodBenefitByGoodResponse,
  GoodPayment,
  GetGoodPaymentsByGoodRequest,
  GetGoodPaymentsByGoodResponse
}
