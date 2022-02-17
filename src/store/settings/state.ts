import { CoinSetting, PlatformSetting } from './types'

interface SettingsState {
  PlatformSetting: PlatformSetting,
  CoinSettings: Map<string, CoinSetting>
}

function state (): SettingsState {
  return {
    PlatformSetting: {
      WarmAccountUSDAmount: 0,
      PaymentAccountUSDAmount: 0,
      WithdrawAutoReviewUSDAmount: 0
    },
    CoinSettings: new Map<string, CoinSetting>()
  }
}

export {
  state,
  SettingsState
}
