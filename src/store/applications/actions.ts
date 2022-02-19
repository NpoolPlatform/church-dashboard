import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  AuthorizeAppGoodForOtherAppRequest,
  AuthorizeAppGoodForOtherAppResponse,
  CreateAppControlRequest,
  CreateAppControlResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateAppRoleForOtherAppRequest,
  CreateAppRoleForOtherAppResponse,
  CreateAppWithdrawSettingForOtherAppRequest,
  CreateAppWithdrawSettingForOtherAppResponse,
  CreateRecommendForOtherAppRequest,
  CreateRecommendForOtherAppResponse,
  GetAppGoodsByOtherAppRequest,
  GetAppGoodsByOtherAppResponse,
  GetApplicationsRequest,
  GetApplicationsResponse,
  GetAppRolesByOtherAppRequest,
  GetAppRolesByOtherAppResponse,
  GetAppWithdrawSettingsByOtherAppRequest,
  GetAppWithdrawSettingsByOtherAppResponse,
  GetRecommendsByOtherAppRequest,
  GetRecommendsByOtherAppResponse,
  SetAppGoodOfflineForOtherAppRequest,
  SetAppGoodOfflineForOtherAppResponse,
  SetAppGoodOnlineForOtherAppRequest,
  SetAppGoodOnlineForOtherAppResponse,
  SetAppGoodPriceForOtherAppRequest,
  SetAppGoodPriceForOtherAppResponse,
  UnauthorizeAppGoodRequest,
  UnauthorizeAppGoodResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppWithdrawSettingRequest,
  UpdateAppWithdrawSettingResponse
} from './types'
import { ApplicationsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ApplicationMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ApplicationActions {
  [ActionTypes.GetApplications]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetApplicationsRequest): void

  [ActionTypes.CreateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateApplicationRequest): void

  [ActionTypes.UpdateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: UpdateApplicationRequest): void

  [ActionTypes.CreateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateAppControlRequest): void

  [ActionTypes.UpdateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: UpdateAppControlRequest): void

  [ActionTypes.GetAppRolesByOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetAppRolesByOtherAppRequest): void

  [ActionTypes.CreateAppRoleForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateAppRoleForOtherAppRequest): void

  [ActionTypes.GetAppGoodsByOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetAppGoodsByOtherAppRequest): void

  [ActionTypes.AuthorizeAppGoodForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: AuthorizeAppGoodForOtherAppRequest): void

  [ActionTypes.UnauthorizeAppGood]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: UnauthorizeAppGoodRequest): void

  [ActionTypes.GetRecommendsByOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetRecommendsByOtherAppRequest): void

  [ActionTypes.CreateRecommendForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateRecommendForOtherAppRequest): void

  [ActionTypes.SetAppGoodPriceForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: SetAppGoodPriceForOtherAppRequest): void

  [ActionTypes.OnsaleAppGoodForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: SetAppGoodOnlineForOtherAppRequest): void

  [ActionTypes.OffsaleAppGoodForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: SetAppGoodOfflineForOtherAppRequest): void

  [ActionTypes.GetAppWithdrawSettingsByOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetAppWithdrawSettingsByOtherAppRequest): void

  [ActionTypes.CreateAppWithdrawSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateAppWithdrawSettingForOtherAppRequest): void

  [ActionTypes.UpdateAppWithdrawSetting]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: UpdateAppWithdrawSettingRequest): void
}

const actions: ActionTree<ApplicationsState, RootState> = {
  [ActionTypes.GetApplications] ({ commit }, req: GetApplicationsRequest) {
    doAction<GetApplicationsRequest, GetApplicationsResponse>(
      commit,
      API.GET_APPLICATIONS,
      req,
      req.Message,
      (resp: GetApplicationsResponse): void => {
        commit(MutationTypes.SetApplications, resp.Infos)
      })
  },

  [ActionTypes.CreateApplication] ({ commit }, req: CreateApplicationRequest) {
    doAction<CreateApplicationRequest, CreateApplicationResponse>(
      commit,
      API.CREATE_APPLICATION,
      req,
      req.Message,
      (resp: CreateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateApplication] ({ commit }, req: UpdateApplicationRequest) {
    doAction<UpdateApplicationRequest, UpdateApplicationResponse>(
      commit,
      API.UPDATE_APPLICATION,
      req,
      req.Message,
      (resp: UpdateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateAppControl] ({ commit }, req: UpdateAppControlRequest) {
    doAction<UpdateAppControlRequest, UpdateAppControlResponse>(
      commit,
      API.UPDATE_APP_CONTROL,
      req,
      req.Message,
      (resp: UpdateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.CreateAppControl] ({ commit }, req: CreateAppControlRequest) {
    doAction<CreateAppControlRequest, CreateAppControlResponse>(
      commit,
      API.CREATE_APP_CONTROL_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.GetAppRolesByOtherApp] ({ commit }, req: GetAppRolesByOtherAppRequest) {
    doAction<GetAppRolesByOtherAppRequest, GetAppRolesByOtherAppResponse>(
      commit,
      API.GET_APP_ROLES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppRolesByOtherAppResponse): void => {
        commit(MutationTypes.SetAppRoles, resp.Infos)
      })
  },

  [ActionTypes.CreateAppRoleForOtherApp] ({ commit }, req: CreateAppRoleForOtherAppRequest) {
    let url = API.CREATE_APP_ROLE_FOR_OTHER_APP
    if (req.Info.ID && req.Info.ID !== '') {
      url = API.UPDATE_APP_ROLE
    }

    doAction<CreateAppRoleForOtherAppRequest, CreateAppRoleForOtherAppResponse>(
      commit,
      url,
      req,
      req.Message,
      (resp: CreateAppRoleForOtherAppResponse): void => {
        commit(MutationTypes.SetAppRoles, [resp.Info])
      })
  },

  [ActionTypes.GetAppGoodsByOtherApp] ({ commit }, req: GetAppGoodsByOtherAppRequest) {
    doAction<GetAppGoodsByOtherAppRequest, GetAppGoodsByOtherAppResponse>(
      commit,
      API.GET_APP_GOODS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppGoodsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppGoods, resp.Infos)
      })
  },

  [ActionTypes.AuthorizeAppGoodForOtherApp] ({ commit }, req: AuthorizeAppGoodForOtherAppRequest) {
    doAction<AuthorizeAppGoodForOtherAppRequest, AuthorizeAppGoodForOtherAppResponse>(
      commit,
      API.AUTHORIZE_APP_GOOD_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: AuthorizeAppGoodForOtherAppResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.UnauthorizeAppGood] ({ commit }, req: UnauthorizeAppGoodRequest) {
    doAction<UnauthorizeAppGoodRequest, UnauthorizeAppGoodResponse>(
      commit,
      API.UNAUTHORIZE_APP_GOOD,
      req,
      req.Message,
      (resp: UnauthorizeAppGoodResponse): void => {
        commit(MutationTypes.DeleteAppGood, resp.Info)
      })
  },

  [ActionTypes.GetRecommendsByOtherApp] ({ commit }, req: GetRecommendsByOtherAppRequest) {
    doAction<GetRecommendsByOtherAppRequest, GetRecommendsByOtherAppResponse>(
      commit,
      API.GET_RECOMMENDS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetRecommendsByOtherAppResponse): void => {
        commit(MutationTypes.SetRecommends, resp.Infos)
      })
  },

  [ActionTypes.CreateRecommendForOtherApp] ({ commit }, req: CreateRecommendForOtherAppRequest) {
    doAction<CreateRecommendForOtherAppRequest, CreateRecommendForOtherAppResponse>(
      commit,
      API.CREATE_RECOMMEND_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateRecommendForOtherAppResponse): void => {
        commit(MutationTypes.SetRecommends, [resp.Info])
      })
  },

  [ActionTypes.SetAppGoodPriceForOtherApp] ({ commit }, req: SetAppGoodPriceForOtherAppRequest) {
    doAction<SetAppGoodPriceForOtherAppRequest, SetAppGoodPriceForOtherAppResponse>(
      commit,
      API.SET_APP_GOOD_PRICE_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: SetAppGoodPriceForOtherAppResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.OnsaleAppGoodForOtherApp] ({ commit }, req: SetAppGoodOnlineForOtherAppRequest) {
    doAction<SetAppGoodOnlineForOtherAppRequest, SetAppGoodOnlineForOtherAppResponse>(
      commit,
      API.ONSALE_APP_GOOD_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: SetAppGoodOnlineForOtherAppResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.OffsaleAppGoodForOtherApp] ({ commit }, req: SetAppGoodOfflineForOtherAppRequest) {
    doAction<SetAppGoodOfflineForOtherAppRequest, SetAppGoodOfflineForOtherAppResponse>(
      commit,
      API.OFFSALE_APP_GOOD_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: SetAppGoodOfflineForOtherAppResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.GetAppWithdrawSettingsByOtherApp] ({ commit }, req: GetAppWithdrawSettingsByOtherAppRequest) {
    doAction<GetAppWithdrawSettingsByOtherAppRequest, GetAppWithdrawSettingsByOtherAppResponse>(
      commit,
      API.GET_APP_WITHDRAW_SETTINGS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppWithdrawSettingsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppWithdrawSettingForOtherApp] ({ commit }, req: CreateAppWithdrawSettingForOtherAppRequest) {
    doAction<CreateAppWithdrawSettingForOtherAppRequest, CreateAppWithdrawSettingForOtherAppResponse>(
      commit,
      API.CREATE_APP_WITHDRAW_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppWithdrawSettingForOtherAppResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, [resp.Info])
      })
  },

  [ActionTypes.UpdateAppWithdrawSetting] ({ commit }, req: UpdateAppWithdrawSettingRequest) {
    doAction<UpdateAppWithdrawSettingRequest, UpdateAppWithdrawSettingResponse>(
      commit,
      API.UPDATE_APP_WITHDRAW_SETTING,
      req,
      req.Message,
      (resp: UpdateAppWithdrawSettingResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, [resp.Info])
      })
  }
}

export {
  actions,
  ApplicationActions
}
