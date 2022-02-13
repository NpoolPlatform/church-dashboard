import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { SettingsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { SettingMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  UpdatePlatformSettingRequest,
  UpdatePlatformSettingResponse
} from './types'

interface SettingActions {
  [ActionTypes.CreatePlatformSetting]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: CreatePlatformSettingRequest): void

  [ActionTypes.UpdatePlatformSetting]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: UpdatePlatformSettingRequest): void

  [ActionTypes.GetPlatformSetting]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: GetPlatformSettingRequest): void
}

const actions: ActionTree<SettingsState, RootState> = {
  [ActionTypes.CreatePlatformSetting] ({ commit }, req: CreatePlatformSettingRequest) {
    doAction<CreatePlatformSettingRequest, CreatePlatformSettingResponse>(
      commit,
      API.CREATE_PLATFORM_SETTING,
      req,
      req.Message,
      (resp: CreatePlatformSettingResponse): void => {
        commit(MutationTypes.SetPlatformSetting, resp.Info)
      })
  },

  [ActionTypes.UpdatePlatformSetting] ({ commit }, req: UpdatePlatformSettingRequest) {
    doAction<UpdatePlatformSettingRequest, UpdatePlatformSettingResponse>(
      commit,
      API.UPDATE_PLATFORM_SETTING,
      req,
      req.Message,
      (resp: UpdatePlatformSettingResponse): void => {
        commit(MutationTypes.SetPlatformSetting, resp.Info)
      })
  },

  [ActionTypes.GetPlatformSetting] ({ commit }, req: GetPlatformSettingRequest) {
    doAction<GetPlatformSettingRequest, GetPlatformSettingResponse>(
      commit,
      API.GET_PLATFORM_SETTING,
      req,
      req.Message,
      (resp: GetPlatformSettingResponse): void => {
        commit(MutationTypes.SetPlatformSetting, resp.Info)
      })
  }
}

export {
  actions,
  SettingActions
}
