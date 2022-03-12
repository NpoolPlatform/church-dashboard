import { ReqMessage } from '../notifications/types'

interface PlatformBenefit {
  ID: string
  GoodID: string
  BenefitAccountID: string
  Amount: number
  CreateAt: number
  ChainTransactionID: string
  LastBenefitTimestamp: number
}

interface GetPlatformBenefitsRequest {
  Message: ReqMessage
}

interface GetPlatformBenefitsResponse {
  Infos: Array<PlatformBenefit>
}

interface UserWithdraw {
  ID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  WithdrawToAccountID: string
  Amount: number
  PlatformTransactionID: string
}

interface GetUserWithdrawsRequest {
  Message: ReqMessage
}

interface GetUserWithdrawsResponse {
  Infos: Array<UserWithdraw>
}

interface CoinAccountTransaction {
  ID: string
  AppID: string
  UserID: string
  FromAddressID: string
  ToAddressID: string
  CoinTypeID: string
  Amount: number
  Message: string
  CreateAt: number
  State: string
  ChainTransactionID: string
  FailHold: boolean
}

interface GetCoinAccountTransactionsRequest {
  Message: ReqMessage
}

interface GetCoinAccountTransactionsResponse {
  Infos: Array<CoinAccountTransaction>
}

interface UpdateCoinAccountTransactionRequest {
  Info: CoinAccountTransaction
  Message: ReqMessage
}

interface UpdateCoinAccountTransactionResponse {
  Info: CoinAccountTransaction
}

interface UserBenefit {
  ID: string
  AppID: string
  UserID: string
  GoodID: string
  CoinTypeID: string
  Amount: string
  CreateAt: number
  OrderID: string
  LastBenefitTimestamp: number
}

interface GetUserBenefitsRequest {
  Message: ReqMessage
}

interface GetUserBenefitsResponse {
  Infos: Array<UserBenefit>
}

interface Payment {
  ID: string
  AppID: string
  UserID: string
  GoodID: string
  OrderID: string
  AccountID: string
  StartAmount: number
  FinishAmount: number
  Amount: number
  CoinInfoID: string
  State: string
  ChainTransactionID: string
  PlatformTransactionID: string
  CreateAt: number
  CoinUSDCurrency: number
}

interface GetPaymentsRequest {
  Message: ReqMessage
}

interface GetPaymentsResponse {
  Infos: Array<Payment>
}

interface UserPaymentBalance {
  ID?: string
  AppID?: string
  UserID?: string
  PaymentID: string
  Amount: number
}

interface CreateUserPaymentBalanceForOtherAppUserRequest {
  TargetAppID: string
  TargetUserID: string
  Info: UserPaymentBalance
  Message: ReqMessage
}

interface CreateUserPaymentBalanceForOtherAppUserResponse {
  Info: UserPaymentBalance
}

interface GetUserPaymentBalancesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetUserPaymentBalancesByOtherAppResponse {
  Infos: Array<UserPaymentBalance>
}

export {
  PlatformBenefit,
  GetPlatformBenefitsRequest,
  GetPlatformBenefitsResponse,
  UserWithdraw,
  GetUserWithdrawsRequest,
  GetUserWithdrawsResponse,
  CoinAccountTransaction,
  GetCoinAccountTransactionsRequest,
  GetCoinAccountTransactionsResponse,
  UpdateCoinAccountTransactionRequest,
  UpdateCoinAccountTransactionResponse,
  UserBenefit,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  Payment,
  GetPaymentsRequest,
  GetPaymentsResponse,
  UserPaymentBalance,
  CreateUserPaymentBalanceForOtherAppUserRequest,
  CreateUserPaymentBalanceForOtherAppUserResponse,
  GetUserPaymentBalancesByOtherAppRequest,
  GetUserPaymentBalancesByOtherAppResponse
}
