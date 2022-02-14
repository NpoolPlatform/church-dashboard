import { CoinSetting, GoodIncoming, PlatformSetting } from './types'

interface SettingsState {
  PlatformSetting: PlatformSetting,
  CoinSettings: Map<string, CoinSetting>
  GoodIncomings: Map<string, Array<GoodIncoming>>
}

function state (): SettingsState {
  return {
    PlatformSetting: {
      WarmAccountUSDAmount: 0
    },
    CoinSettings: new Map<string, CoinSetting>(),
    GoodIncomings: new Map<string, Array<GoodIncoming>>()
  }
}

export {
  state,
  SettingsState
}
