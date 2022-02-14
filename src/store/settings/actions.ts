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
  CreateGoodIncomingRequest,
  CreateGoodIncomingResponse,
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  GetCoinSettingByCoinRequest,
  GetCoinSettingByCoinResponse,
  GetGoodIncomingsByGoodRequest,
  GetGoodIncomingsByGoodResponse,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  UpdateCoinSettingRequest,
  UpdateCoinSettingResponse,
  UpdateGoodIncomingRequest,
  UpdateGoodIncomingResponse,
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

  [ActionTypes.CreateGoodIncoming]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: CreateGoodIncomingRequest): void

  [ActionTypes.UpdateGoodIncoming]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: UpdateGoodIncomingRequest): void

  [ActionTypes.GetGoodIncomingsByGood]({
    commit
  }: AugmentedActionContext<
  SettingsState,
    RootState,
    SettingMutations<SettingsState>>,
    req: GetGoodIncomingsByGoodRequest): void
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
  },

  [ActionTypes.CreateGoodIncoming] ({ commit }, req: CreateGoodIncomingRequest) {
    doAction<CreateGoodIncomingRequest, CreateGoodIncomingResponse>(
      commit,
      API.CREATE_GOOD_INCOMING,
      req,
      req.Message,
      (resp: CreateGoodIncomingResponse): void => {
        commit(MutationTypes.SetGoodIncoming, resp.Info)
      })
  },

  [ActionTypes.UpdateGoodIncoming] ({ commit }, req: UpdateGoodIncomingRequest) {
    doAction<UpdateGoodIncomingRequest, UpdateGoodIncomingResponse>(
      commit,
      API.UPDATE_GOOD_INCOMING,
      req,
      req.Message,
      (resp: UpdateGoodIncomingResponse): void => {
        commit(MutationTypes.SetGoodIncoming, resp.Info)
      })
  },

  [ActionTypes.GetGoodIncomingsByGood] ({ commit }, req: GetGoodIncomingsByGoodRequest) {
    doAction<GetGoodIncomingsByGoodRequest, GetGoodIncomingsByGoodResponse>(
      commit,
      API.GET_GOOD_INCOMINGS_BY_GOOD,
      req,
      req.Message,
      (resp: GetGoodIncomingsByGoodResponse): void => {
        commit(MutationTypes.SetGoodIncomings, resp.Infos)
      })
  }
}

export {
  actions,
  SettingActions
}
