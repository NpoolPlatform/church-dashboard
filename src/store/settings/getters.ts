import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { SettingsState } from './state'
import { CoinSetting, GoodIncoming, GoodSetting, PlatformSetting } from './types'

type SettingGetters = {
  getPlatformSetting (state: SettingsState): PlatformSetting
  getCoinSettingByCoin (state: SettingsState): (coinID: string) => CoinSetting
  getGoodSettingByGood (state: SettingsState): (goodID: string) => GoodSetting
  getGoodIncomingsByGood (state: SettingsState): (goodID: string) => Array<GoodIncoming>
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
  },
  getGoodIncomingsByGood: (state: SettingsState): (goodID: string) => Array<GoodIncoming> => {
    return (goodID: string) => {
      return state.GoodIncomings.get(goodID) as Array<GoodIncoming>
    }
  }
}

export { SettingGetters, getters }
