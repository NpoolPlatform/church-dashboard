import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { SettingsState } from './state'
import { PlatformSetting } from './types'

type SettingMutations<S = SettingsState> = {
  [MutationTypes.SetPlatformSetting] (state: S, payload: PlatformSetting): void
}

const mutations: MutationTree<SettingsState> & SettingMutations = {
  [MutationTypes.SetPlatformSetting] (state: SettingsState, payload: PlatformSetting) {
    state.PlatformSetting = payload
  }
}

export { SettingMutations, mutations }
