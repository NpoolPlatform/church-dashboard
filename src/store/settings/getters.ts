import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { SettingsState } from './state'
import { CoinSetting, GoodSetting, PlatformSetting } from './types'

type SettingGetters = {
  getPlatformSetting (state: SettingsState): PlatformSetting
  getCoinSettingByCoin (state: SettingsState): (coinID: string) => CoinSetting
  getGoodSettingByGood (state: SettingsState): (goodID: string) => GoodSetting
}

const getters: GetterTree<SettingsState, RootState> & SettingGetters = {
  getPlatformSetting: (state: SettingsState): PlatformSetting => state.PlatformSetting,
  getCoinSettingByCoin: (state: SettingsState): (coinID: string) => CoinSetting => {
    return (coinID: string) => {
      return state.CoinSettings.get(coinID) as CoinSetting
    }
  },
  getGoodSettingByGood: (state: SettingsState): (goodID: string) => GoodSetting => {
    return (goodID: string) => {
      return state.GoodSettings.get(goodID) as GoodSetting
    }
  }
}

export { SettingGetters, getters }
