import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { SettingsState } from './state'
import { CoinSetting, PlatformSetting } from './types'

type SettingGetters = {
  getPlatformSetting (state: SettingsState): PlatformSetting
  getCoinSettingByCoin (state: SettingsState): (coinID: string) => CoinSetting
}

const getters: GetterTree<SettingsState, RootState> & SettingGetters = {
  getPlatformSetting: (state: SettingsState): PlatformSetting => state.PlatformSetting,
  getCoinSettingByCoin: (state: SettingsState): (coinID: string) => CoinSetting => {
    return (coinID: string) => {
      return state.CoinSettings.get(coinID) as CoinSetting
    }
  }
}

export { SettingGetters, getters }
