import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { SettingsState } from './state'
import { PlatformSetting } from './types'

type SettingGetters = {
  getPlatformSetting (state: SettingsState): PlatformSetting
}

const getters: GetterTree<SettingsState, RootState> & SettingGetters = {
  getPlatformSetting: (state: SettingsState): PlatformSetting => state.PlatformSetting
}

export { SettingGetters, getters }
