import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { SettingsState } from './state'
import { CoinSetting, GoodIncoming, PlatformSetting } from './types'

type SettingGetters = {
  getPlatformSetting (state: SettingsState): PlatformSetting
  getCoinSettingByCoin (state: SettingsState): (coinID: string) => CoinSetting
  getGoodIncomingsByGood (state: SettingsState): (goodID: string) => Array<GoodIncoming>
}

const getters: GetterTree<SettingsState, RootState> & SettingGetters = {
  getPlatformSetting: (state: SettingsState): PlatformSetting => state.PlatformSetting,
  getCoinSettingByCoin: (state: SettingsState): (coinID: string) => CoinSetting => {
    return (coinID: string) => {
      return state.CoinSettings.get(coinID) as CoinSetting
    }
  },
  getGoodIncomingsByGood: (state: SettingsState): (goodID: string) => Array<GoodIncoming> => {
    return (goodID: string) => {
      return state.GoodIncomings.get(goodID) as Array<GoodIncoming>
    }
  }
}

export { SettingGetters, getters }
