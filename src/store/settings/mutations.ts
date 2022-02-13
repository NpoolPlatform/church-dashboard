import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { SettingsState } from './state'
import { CoinSetting, GoodIncoming, GoodSetting, PlatformSetting } from './types'

type SettingMutations<S = SettingsState> = {
  [MutationTypes.SetPlatformSetting] (state: S, payload: PlatformSetting): void
  [MutationTypes.SetCoinSetting] (state: S, payload: CoinSetting): void
  [MutationTypes.SetGoodSetting] (state: S, payload: GoodSetting): void
  [MutationTypes.SetGoodIncomings] (state: S, payload: Array<GoodIncoming>): void
  [MutationTypes.SetGoodIncoming] (state: S, payload: GoodIncoming): void
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
  },
  [MutationTypes.SetGoodIncomings] (state: SettingsState, payload: Array<GoodIncoming>) {
    if (payload.length > 0) {
      state.GoodIncomings.set(payload[0].GoodID, payload)
    }
  },
  [MutationTypes.SetGoodIncoming] (state: SettingsState, payload: GoodIncoming) {
    let incomings = state.GoodIncomings.get(payload.GoodID)
    if (incomings) {
      for (let i = 0; i < incomings.length; i++) {
        if (incomings[i].ID === payload.ID) {
          incomings.splice(i, 1, payload)
          break
        }
      }
    } else {
      incomings = [payload]
    }
    state.GoodIncomings.set(payload.GoodID, incomings)
  }
}

export { SettingMutations, mutations }
