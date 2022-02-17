import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { SettingsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { SettingMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateCoinSettingRequest,
  CreateCoinSettingResponse,
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  GetCoinSettingByCoinRequest,
  GetCoinSettingByCoinResponse,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  UpdateCoinSettingRequest,
  UpdateCoinSettingResponse,
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

  [ActionTypes.CreateCoinSetting]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: CreateCoinSettingRequest): void

  [ActionTypes.UpdateCoinSetting]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: UpdateCoinSettingRequest): void

  [ActionTypes.GetCoinSettingByCoin]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: GetCoinSettingByCoinRequest): void
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
        if (resp.Info) {
          commit(MutationTypes.SetPlatformSetting, resp.Info)
        }
      })
  },

  [ActionTypes.CreateCoinSetting] ({ commit }, req: CreateCoinSettingRequest) {
    doAction<CreateCoinSettingRequest, CreateCoinSettingResponse>(
      commit,
      API.CREATE_COIN_SETTING,
      req,
      req.Message,
      (resp: CreateCoinSettingResponse): void => {
        commit(MutationTypes.SetCoinSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateCoinSetting] ({ commit }, req: UpdateCoinSettingRequest) {
    doAction<UpdateCoinSettingRequest, UpdateCoinSettingResponse>(
      commit,
      API.UPDATE_COIN_SETTING,
      req,
      req.Message,
      (resp: UpdateCoinSettingResponse): void => {
        commit(MutationTypes.SetCoinSetting, resp.Info)
      })
  },

  [ActionTypes.GetCoinSettingByCoin] ({ commit }, req: GetCoinSettingByCoinRequest) {
    doAction<GetCoinSettingByCoinRequest, GetCoinSettingByCoinResponse>(
      commit,
      API.GET_COIN_SETTING_BY_COIN,
      req,
      req.Message,
      (resp: GetCoinSettingByCoinResponse): void => {
        if (resp.Info) {
          commit(MutationTypes.SetCoinSetting, resp.Info)
        }
      })
  }
}

export {
  actions,
  SettingActions
}
