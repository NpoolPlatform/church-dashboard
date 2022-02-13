import { ReqMessage } from '../notifications/types'

interface PlatformSetting {
  ID?: string
  WarmAccountUSDAmount: number
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
  ID: string
  CoinTypeID: string
  WarmAccountCoinAmount: number
}

interface GoodSetting {
  ID: string
  GoodID: string
  WarmAccountCoinAmount: number
  WarmAccountUSDAmount: number
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
  GoodSetting
}
