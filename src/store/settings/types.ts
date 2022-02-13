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

interface GoodSetting {
  ID: string
  GoodID: string
  WarmAccountCoinAmount: number
  WarmAccountUSDAmount: number
}

interface GetGoodSettingByGoodRequest {
  GoodID: string
  Message: ReqMessage
}

interface GetGoodSettingByGoodResponse {
  Info: GoodSetting
}

interface CreateGoodSettingRequest {
  Info: GoodSetting
  Message: ReqMessage
}

interface CreateGoodSettingResponse {
  Info: GoodSetting
}

interface UpdateGoodSettingRequest {
  Info: GoodSetting
  Message: ReqMessage
}

interface UpdateGoodSettingResponse {
  Info: GoodSetting
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
  UpdateCoinSettingResponse,
  GoodSetting,
  GetGoodSettingByGoodRequest,
  GetGoodSettingByGoodResponse,
  CreateGoodSettingRequest,
  CreateGoodSettingResponse,
  UpdateGoodSettingRequest,
  UpdateGoodSettingResponse
}
