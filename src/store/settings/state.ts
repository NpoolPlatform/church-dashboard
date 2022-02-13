import { PlatformSetting } from './types'

interface SettingsState {
  PlatformSetting: PlatformSetting
}

function state (): SettingsState {
  return {
    PlatformSetting: {
      WarmAccountUSDAmount: 0
    }
  }
}

export {
  state,
  SettingsState
}
