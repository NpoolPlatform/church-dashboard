import { Module } from 'vuex'
import { RootState } from '../index'
import { state, SettingsState } from './state'
import { SettingGetters, getters } from './getters'
import { SettingMutations, mutations } from './mutations'
import { SettingActions, actions } from './actions'

const settings: Module<SettingsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  settings, SettingsState,
  mutations, SettingMutations,
  getters, SettingGetters,
  actions, SettingActions
}
