import { ReqMessage } from '../notifications/types'

interface PlatformSetting {
  ID?: string
  WarmAccountUSDAmount: number
  PaymentAccountUSDAmount: number
  WithdrawAutoReviewUSDAmount: number
}

interface GetPlatformSettingRequest {
  Message: ReqMessage
}

interface GetPlatformSettingResponse {
  Info: PlatformSetting
}

interface CreatePlatformSettingRequest {
  Info: PlatformSetting
  Message: ReqMessage
}

interface CreatePlatformSettingResponse {
  Info: PlatformSetting
}

interface UpdatePlatformSettingRequest {
  Info: PlatformSetting
  Message: ReqMessage
}

interface UpdatePlatformSettingResponse {
  Info: PlatformSetting
}

interface CoinSetting {
  ID?: string
  CoinTypeID: string
  WarmAccountCoinAmount: number
  PaymentAccountCoinAmount: number
  GoodIncomingAccountID?: string
  PlatformOfflineAccountID?: string
  UserOfflineAccountID?: string
  UserOnlineAccountID?: string
}

interface GetCoinSettingByCoinRequest {
  CoinTypeID: string
  Message: ReqMessage
}

interface GetCoinSettingByCoinResponse {
  Info: CoinSetting
}

interface CreateCoinSettingRequest {
  Info: CoinSetting
  Message: ReqMessage
}

interface CreateCoinSettingResponse {
  Info: CoinSetting
}

interface UpdateCoinSettingRequest {
  Info: CoinSetting
  Message: ReqMessage
}

interface UpdateCoinSettingResponse {
  Info: CoinSetting
}

export {
  PlatformSetting,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  UpdatePlatformSettingRequest,
  UpdatePlatformSettingResponse,
  CoinSetting,
  GetCoinSettingByCoinRequest,
  GetCoinSettingByCoinResponse,
  CreateCoinSettingRequest,
  CreateCoinSettingResponse,
  UpdateCoinSettingRequest,
  UpdateCoinSettingResponse
}
