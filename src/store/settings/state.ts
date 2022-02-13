import { CoinSetting, GoodIncoming, GoodSetting, PlatformSetting } from './types'

interface SettingsState {
  PlatformSetting: PlatformSetting,
  CoinSettings: Map<string, CoinSetting>
  GoodSettings: Map<string, GoodSetting>
  GoodIncomings: Map<string, Array<GoodIncoming>>
}

function state (): SettingsState {
  return {
    PlatformSetting: {
      WarmAccountUSDAmount: 0
    },
    CoinSettings: new Map<string, CoinSetting>(),
    GoodSettings: new Map<string, GoodSetting>(),
    GoodIncomings: new Map<string, Array<GoodIncoming>>()
  }
}

export {
  state,
  SettingsState
}
