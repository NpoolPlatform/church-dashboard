import { ReqMessage } from '../notifications/types'

interface Coin {
  ID?: string
  Name: string
  PreSale: boolean
  Unit: string
  Logo: string
  ReservedAmount: number
  ENV: string
}

interface GetCoinsResponse {
  Infos: ReadonlyArray<Coin>
}

interface GetCoinsRequest {
  Message: ReqMessage
}

interface CreateCoinRequest extends Coin {
  Message: ReqMessage
}

interface CreateCoinResponse {
  Info: Coin
}

interface UpdateCoinRequest {
  ID: string
  PreSale: boolean
  Logo: string
  ReservedAmount: number
  Message: ReqMessage
}

interface UpdateCoinResponse {
  Info: Coin
}

export {
  Coin,
  GetCoinsRequest,
  GetCoinsResponse,
  CreateCoinRequest,
  CreateCoinResponse,
  UpdateCoinRequest,
  UpdateCoinResponse
}
