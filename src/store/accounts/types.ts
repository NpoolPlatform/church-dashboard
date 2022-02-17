import { ReqMessage } from '../notifications/types'

interface CoinAccount {
  ID?: string
  CoinTypeID: string
  Address: string
  PlatformHoldPrivateKey?: boolean
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
  BenefitIntervalHours: number
}

interface GetGoodBenefitByGoodRequest {
  GoodID: string
  Message: ReqMessage
}

interface GetGoodBenefitByGoodResponse {
  Info: GoodBenefit
}

interface CreateGoodBenefitRequest {
  Info: GoodBenefit
  Message: ReqMessage
}

interface CreateGoodBenefitResponse {
  Info: GoodBenefit
}

interface UpdateGoodBenefitRequest {
  Info: GoodBenefit
  Message: ReqMessage
}

interface UpdateGoodBenefitResponse {
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

interface CreatePlatformCoinAccountRequest {
  CoinTypeID: string
  Message: ReqMessage
}

interface CreatePlatformCoinAccountResoponse {
  Info: CoinAccount
}

interface CreateUserCoinAccountRequest {
  Info: CoinAccount
  Message: ReqMessage
}

interface CreateUserCoinAccountResoponse {
  Info: CoinAccount
}

export {
  CoinAccount,
  GetCoinAccountsRequest,
  GetCoinAccountsResponse,
  GoodBenefit,
  GetGoodBenefitByGoodRequest,
  GetGoodBenefitByGoodResponse,
  CreateGoodBenefitRequest,
  CreateGoodBenefitResponse,
  UpdateGoodBenefitRequest,
  UpdateGoodBenefitResponse,
  GoodPayment,
  GetGoodPaymentsByGoodRequest,
  GetGoodPaymentsByGoodResponse,
  CreatePlatformCoinAccountRequest,
  CreatePlatformCoinAccountResoponse,
  CreateUserCoinAccountRequest,
  CreateUserCoinAccountResoponse
}
