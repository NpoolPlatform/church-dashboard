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

export {
  CoinAccount,
  GetCoinAccountsRequest,
  GetCoinAccountsResponse
}
