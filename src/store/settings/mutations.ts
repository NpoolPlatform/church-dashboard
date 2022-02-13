import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { SettingsState } from './state'
import { CoinSetting, GoodSetting, PlatformSetting } from './types'

type SettingMutations<S = SettingsState> = {
  [MutationTypes.SetPlatformSetting] (state: S, payload: PlatformSetting): void
  [MutationTypes.SetCoinSetting] (state: S, payload: CoinSetting): void
  [MutationTypes.SetGoodSetting] (state: S, payload: GoodSetting): void
}

const mutations: MutationTree<SettingsState> & SettingMutations = {
  [MutationTypes.SetPlatformSetting] (state: SettingsState, payload: PlatformSetting) {
    state.PlatformSetting = payload
  },
  [MutationTypes.SetCoinSetting] (state: SettingsState, payload: CoinSetting) {
    state.CoinSettings.set(payload.CoinTypeID, payload)
  },
  [MutationTypes.SetGoodSetting] (state: SettingsState, payload: GoodSetting) {
    state.GoodSettings.set(payload.GoodID, payload)
  }
}

export { SettingMutations, mutations }
