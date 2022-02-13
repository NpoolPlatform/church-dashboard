import { CoinSetting, GoodSetting, PlatformSetting } from './types'

interface SettingsState {
  PlatformSetting: PlatformSetting,
  CoinSettings: Map<string, CoinSetting>
  GoodSettings: Map<string, GoodSetting>
}

function state (): SettingsState {
  return {
    PlatformSetting: {
      WarmAccountUSDAmount: 0
    },
    CoinSettings: new Map<string, CoinSetting>(),
    GoodSettings: new Map<string, GoodSetting>()
  }
}

export {
  state,
  SettingsState
}
