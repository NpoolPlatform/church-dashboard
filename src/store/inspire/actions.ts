import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { InspireMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateActivityForOtherAppRequest,
  CreateActivityForOtherAppResponse,
  CreateAppCommissionSettingForOtherAppRequest,
  CreateAppCommissionSettingForOtherAppResponse,
  CreateAppInvitationSettingForOtherAppRequest,
  CreateAppInvitationSettingForOtherAppResponse,
  CreateAppPurchaseAmountSettingForOtherAppRequest,
  CreateAppPurchaseAmountSettingForOtherAppResponse,
  CreateAppUserInvitationSettingForOtherAppUserRequest,
  CreateAppUserInvitationSettingForOtherAppUserResponse,
  CreateAppUserPurchaseAmountSettingForOtherAppUserRequest,
  CreateAppUserPurchaseAmountSettingForOtherAppUserResponse,
  CreateCouponAllocatedForOtherAppUserRequest,
  CreateCouponAllocatedForOtherAppUserResponse,
  CreateCouponPoolForOtherAppRequest,
  CreateCouponPoolForOtherAppResponse,
  CreateDiscountPoolForOtherAppRequest,
  CreateDiscountPoolForOtherAppResponse,
  CreateEventCouponForOtherAppRequest,
  CreateEventCouponForOtherAppResponse,
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse,
  CreateUserSpecialReductionForOtherAppUserRequest,
  CreateUserSpecialReductionForOtherAppUserResponse,
  GetActivitiesByOtherAppRequest,
  GetActivitiesByOtherAppResponse,
  GetAppCommissionSettingByOtherAppRequest,
  GetAppCommissionSettingByOtherAppResponse,
  GetAppInvitationSettingsByOtherAppRequest,
  GetAppInvitationSettingsByOtherAppResponse,
  GetAppPurchaseAmountSettingsByOtherAppRequest,
  GetAppPurchaseAmountSettingsByOtherAppResponse,
  GetAppUserInvitationSettingsByOtherAppRequest,
  GetAppUserInvitationSettingsByOtherAppResponse,
  GetAppUserPurchaseAmountSettingsByOtherAppRequest,
  GetAppUserPurchaseAmountSettingsByOtherAppResponse,
  GetCouponPoolsByOtherAppRequest,
  GetCouponPoolsByOtherAppResponse,
  GetCouponsAllocatedByOtherAppRequest,
  GetCouponsAllocatedByOtherAppResponse,
  GetDiscountPoolsByOtherAppRequest,
  GetDiscountPoolsByOtherAppResponse,
  GetEventCouponsByOtherAppRequest,
  GetEventCouponsByOtherAppResponse,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse,
  GetUserSpecialReductionsByOtherAppRequest,
  GetUserSpecialReductionsByOtherAppResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  UpdateAppCommissionSettingRequest,
  UpdateAppCommissionSettingResponse,
  UpdateAppInvitationSettingRequest,
  UpdateAppInvitationSettingResponse,
  UpdateAppPurchaseAmountSettingRequest,
  UpdateAppPurchaseAmountSettingResponse,
  UpdateAppUserInvitationSettingRequest,
  UpdateAppUserInvitationSettingResponse,
  UpdateAppUserPurchaseAmountSettingRequest,
  UpdateAppUserPurchaseAmountSettingResponse,
  UpdateCouponPoolRequest,
  UpdateCouponPoolResponse,
  UpdateDiscountPoolRequest,
  UpdateDiscountPoolResponse,
  UpdateUserSpecialReductionRequest,
  UpdateUserSpecialReductionResponse
} from './types'

interface InspireActions {
  [ActionTypes.GetUserInvitationCodeByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetUserInvitationCodesByOtherAppRequest): void

  [ActionTypes.CreateUserInvitationCodeForOtherAppUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateUserInvitationCodeForOtherAppUserRequest): void

  [ActionTypes.CreateActivityForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateActivityForOtherAppRequest): void

  [ActionTypes.UpdateActivity]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateActivityRequest): void

  [ActionTypes.GetActivitiesByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetActivitiesByOtherAppRequest): void

  [ActionTypes.CreateCouponPoolForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateCouponPoolForOtherAppRequest): void

  [ActionTypes.UpdateCouponPool]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateCouponPoolRequest): void

  [ActionTypes.GetCouponPoolsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetCouponPoolsByOtherAppRequest): void

  [ActionTypes.CreateDiscountPoolForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateDiscountPoolForOtherAppRequest): void

  [ActionTypes.UpdateDiscountPool]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateDiscountPoolRequest): void

  [ActionTypes.GetDiscountPoolsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetDiscountPoolsByOtherAppRequest): void

  [ActionTypes.CreateUserSpecialReductionForOtherAppUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateUserSpecialReductionForOtherAppUserRequest): void

  [ActionTypes.UpdateUserSpecialReduction]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateUserSpecialReductionRequest): void

  [ActionTypes.GetUserSpecialReductionsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetUserSpecialReductionsByOtherAppRequest): void

  [ActionTypes.CreateCouponAllocatedForOtherAppUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateCouponAllocatedForOtherAppUserRequest): void

  [ActionTypes.GetCouponsAllocatedByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetCouponsAllocatedByOtherAppRequest): void

  [ActionTypes.CreateEventCouponForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateEventCouponForOtherAppRequest): void

  [ActionTypes.GetEventCouponsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetEventCouponsByOtherAppRequest): void

  [ActionTypes.CreateAppCommissionSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppCommissionSettingForOtherAppRequest): void

  [ActionTypes.UpdateAppCommissionSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppCommissionSettingRequest): void

  [ActionTypes.GetAppCommissionSettingByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppCommissionSettingByOtherAppRequest): void

  [ActionTypes.CreateAppInvitationSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppInvitationSettingForOtherAppRequest): void

  [ActionTypes.UpdateAppInvitationSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppInvitationSettingRequest): void

  [ActionTypes.GetAppInvitationSettingsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppInvitationSettingsByOtherAppRequest): void

  [ActionTypes.CreateAppPurchaseAmountSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppPurchaseAmountSettingForOtherAppRequest): void

  [ActionTypes.UpdateAppPurchaseAmountSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppPurchaseAmountSettingRequest): void

  [ActionTypes.GetAppPurchaseAmountSettingsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppPurchaseAmountSettingsByOtherAppRequest): void

  [ActionTypes.CreateAppUserInvitationSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppUserInvitationSettingForOtherAppUserRequest): void

  [ActionTypes.UpdateAppUserInvitationSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppUserInvitationSettingRequest): void

  [ActionTypes.GetAppUserInvitationSettingsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppUserInvitationSettingsByOtherAppRequest): void

  [ActionTypes.CreateAppUserPurchaseAmountSettingForOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppUserPurchaseAmountSettingForOtherAppUserRequest): void

  [ActionTypes.UpdateAppUserPurchaseAmountSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppUserPurchaseAmountSettingRequest): void

  [ActionTypes.GetAppUserPurchaseAmountSettingsByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppUserPurchaseAmountSettingsByOtherAppRequest): void
}

const actions: ActionTree<InspiresState, RootState> = {
  [ActionTypes.GetUserInvitationCodeByOtherApp] ({ commit }, req: GetUserInvitationCodesByOtherAppRequest) {
    doAction<GetUserInvitationCodesByOtherAppRequest, GetUserInvitationCodesByOtherAppResponse>(
      commit,
      API.GET_USER_INVITATION_CODES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetUserInvitationCodesByOtherAppResponse): void => {
        commit(MutationTypes.SetUserInvitationCodes, resp.Infos)
      })
  },

  [ActionTypes.CreateUserInvitationCodeForOtherAppUser] ({ commit }, req: CreateUserInvitationCodeForOtherAppUserRequest) {
    doAction<CreateUserInvitationCodeForOtherAppUserRequest, CreateUserInvitationCodeForOtherAppUserResponse>(
      commit,
      API.CREATE_USER_INVITATION_CODE_FOR_OTHER_APP_USER,
      req,
      req.Message,
      (resp: CreateUserInvitationCodeForOtherAppUserResponse): void => {
        commit(MutationTypes.AppendUserInvitationCode, resp.Info)
      })
  },

  [ActionTypes.CreateActivityForOtherApp] ({ commit }, req: CreateActivityForOtherAppRequest) {
    doAction<CreateActivityForOtherAppRequest, CreateActivityForOtherAppResponse>(
      commit,
      API.CREATE_ACTIVITY_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateActivityForOtherAppResponse): void => {
        commit(MutationTypes.AppendActivity, resp.Info)
      })
  },

  [ActionTypes.UpdateActivity] ({ commit }, req: UpdateActivityRequest) {
    doAction<UpdateActivityRequest, UpdateActivityResponse>(
      commit,
      API.UPDATE_ACTIVITY,
      req,
      req.Message,
      (resp: UpdateActivityResponse): void => {
        commit(MutationTypes.AppendActivity, resp.Info)
      })
  },

  [ActionTypes.GetActivitiesByOtherApp] ({ commit }, req: GetActivitiesByOtherAppRequest) {
    doAction<GetActivitiesByOtherAppRequest, GetActivitiesByOtherAppResponse>(
      commit,
      API.GET_ACTIVITIES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetActivitiesByOtherAppResponse): void => {
        commit(MutationTypes.SetActivities, resp.Infos)
      })
  },

  [ActionTypes.CreateCouponPoolForOtherApp] ({ commit }, req: CreateCouponPoolForOtherAppRequest) {
    doAction<CreateCouponPoolForOtherAppRequest, CreateCouponPoolForOtherAppResponse>(
      commit,
      API.CREATE_COUPON_POOL_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateCouponPoolForOtherAppResponse): void => {
        commit(MutationTypes.AppendCouponPool, resp.Info)
      })
  },

  [ActionTypes.UpdateCouponPool] ({ commit }, req: UpdateCouponPoolRequest) {
    doAction<UpdateCouponPoolRequest, UpdateCouponPoolResponse>(
      commit,
      API.UPDATE_COUPON_POOL,
      req,
      req.Message,
      (resp: UpdateCouponPoolResponse): void => {
        commit(MutationTypes.AppendCouponPool, resp.Info)
      })
  },

  [ActionTypes.GetCouponPoolsByOtherApp] ({ commit }, req: GetCouponPoolsByOtherAppRequest) {
    doAction<GetCouponPoolsByOtherAppRequest, GetCouponPoolsByOtherAppResponse>(
      commit,
      API.GET_COUPON_POOLS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetCouponPoolsByOtherAppResponse): void => {
        commit(MutationTypes.SetCouponPools, resp.Infos)
      })
  },

  [ActionTypes.CreateDiscountPoolForOtherApp] ({ commit }, req: CreateDiscountPoolForOtherAppRequest) {
    doAction<CreateDiscountPoolForOtherAppRequest, CreateDiscountPoolForOtherAppResponse>(
      commit,
      API.CREATE_DISCOUNT_POOL_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateDiscountPoolForOtherAppResponse): void => {
        commit(MutationTypes.AppendDiscountPool, resp.Info)
      })
  },

  [ActionTypes.UpdateDiscountPool] ({ commit }, req: UpdateDiscountPoolRequest) {
    doAction<UpdateDiscountPoolRequest, UpdateDiscountPoolResponse>(
      commit,
      API.UPDATE_DISCOUNT_POOL,
      req,
      req.Message,
      (resp: UpdateDiscountPoolResponse): void => {
        commit(MutationTypes.AppendDiscountPool, resp.Info)
      })
  },

  [ActionTypes.GetDiscountPoolsByOtherApp] ({ commit }, req: GetDiscountPoolsByOtherAppRequest) {
    doAction<GetDiscountPoolsByOtherAppRequest, GetDiscountPoolsByOtherAppResponse>(
      commit,
      API.GET_DISCOUNT_POOLS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetDiscountPoolsByOtherAppResponse): void => {
        commit(MutationTypes.SetDiscountPools, resp.Infos)
      })
  },

  [ActionTypes.CreateUserSpecialReductionForOtherAppUser] ({ commit }, req: CreateUserSpecialReductionForOtherAppUserRequest) {
    doAction<CreateUserSpecialReductionForOtherAppUserRequest, CreateUserSpecialReductionForOtherAppUserResponse>(
      commit,
      API.CREATE_USER_SPECIAL_REDUCTION_FOR_OTHER_APP_USER,
      req,
      req.Message,
      (resp: CreateUserSpecialReductionForOtherAppUserResponse): void => {
        commit(MutationTypes.AppendUserSpecialReduction, resp.Info)
      })
  },

  [ActionTypes.UpdateUserSpecialReduction] ({ commit }, req: UpdateUserSpecialReductionRequest) {
    doAction<UpdateUserSpecialReductionRequest, UpdateUserSpecialReductionResponse>(
      commit,
      API.UPDATE_USER_SPECIAL_REDUCTION,
      req,
      req.Message,
      (resp: UpdateUserSpecialReductionResponse): void => {
        commit(MutationTypes.AppendUserSpecialReduction, resp.Info)
      })
  },

  [ActionTypes.GetUserSpecialReductionsByOtherApp] ({ commit }, req: GetUserSpecialReductionsByOtherAppRequest) {
    doAction<GetUserSpecialReductionsByOtherAppRequest, GetUserSpecialReductionsByOtherAppResponse>(
      commit,
      API.GET_USER_SPECIAL_REDUCTIONS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetUserSpecialReductionsByOtherAppResponse): void => {
        commit(MutationTypes.SetUserSpecialReductions, resp.Infos)
      })
  },

  [ActionTypes.CreateCouponAllocatedForOtherAppUser] ({ commit }, req: CreateCouponAllocatedForOtherAppUserRequest) {
    doAction<CreateCouponAllocatedForOtherAppUserRequest, CreateCouponAllocatedForOtherAppUserResponse>(
      commit,
      API.CREATE_COUPON_ALLOCATED_FOR_OTHER_APP_USER,
      req,
      req.Message,
      (resp: CreateCouponAllocatedForOtherAppUserResponse): void => {
        commit(MutationTypes.AppendCouponAllocated, resp.Info)
      })
  },

  [ActionTypes.GetCouponsAllocatedByOtherApp] ({ commit }, req: GetCouponsAllocatedByOtherAppRequest) {
    doAction<GetCouponsAllocatedByOtherAppRequest, GetCouponsAllocatedByOtherAppResponse>(
      commit,
      API.GET_COUPONS_ALLOCATED_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetCouponsAllocatedByOtherAppResponse): void => {
        commit(MutationTypes.SetCouponsAllocated, resp.Infos)
      })
  },

  [ActionTypes.CreateEventCouponForOtherApp] ({ commit }, req: CreateEventCouponForOtherAppRequest) {
    doAction<CreateEventCouponForOtherAppRequest, CreateEventCouponForOtherAppResponse>(
      commit,
      API.CREATE_EVENT_COUPON_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateEventCouponForOtherAppResponse): void => {
        commit(MutationTypes.AppendEventCoupon, resp.Info)
      })
  },

  [ActionTypes.GetEventCouponsByOtherApp] ({ commit }, req: GetEventCouponsByOtherAppRequest) {
    doAction<GetEventCouponsByOtherAppRequest, GetEventCouponsByOtherAppResponse>(
      commit,
      API.GET_EVENT_COUPONS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetEventCouponsByOtherAppResponse): void => {
        commit(MutationTypes.SetEventCoupons, resp.Infos)
      })
  },

  // ---------------------------------------------------------------------------------------

  [ActionTypes.CreateAppCommissionSettingForOtherApp] ({ commit }, req: CreateAppCommissionSettingForOtherAppRequest) {
    doAction<CreateAppCommissionSettingForOtherAppRequest, CreateAppCommissionSettingForOtherAppResponse>(
      commit,
      API.CREATE_APP_COMMISSION_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppCommissionSettingForOtherAppResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppCommissionSetting] ({ commit }, req: UpdateAppCommissionSettingRequest) {
    doAction<UpdateAppCommissionSettingRequest, UpdateAppCommissionSettingResponse>(
      commit,
      API.UPDATE_APP_COMMISSION_SETTING,
      req,
      req.Message,
      (resp: UpdateAppCommissionSettingResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppCommissionSettingByOtherApp] ({ commit }, req: GetAppCommissionSettingByOtherAppRequest) {
    doAction<GetAppCommissionSettingByOtherAppRequest, GetAppCommissionSettingByOtherAppResponse>(
      commit,
      API.GET_APP_COMMISSION_SETTING_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppCommissionSettingByOtherAppResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.CreateAppInvitationSettingForOtherApp] ({ commit }, req: CreateAppInvitationSettingForOtherAppRequest) {
    doAction<CreateAppInvitationSettingForOtherAppRequest, CreateAppInvitationSettingForOtherAppResponse>(
      commit,
      API.CREATE_APP_INVITATION_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppInvitationSettingForOtherAppResponse): void => {
        commit(MutationTypes.AppendAppInvitationSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppInvitationSetting] ({ commit }, req: UpdateAppInvitationSettingRequest) {
    doAction<UpdateAppInvitationSettingRequest, UpdateAppInvitationSettingResponse>(
      commit,
      API.UPDATE_APP_INVITATION_SETTING,
      req,
      req.Message,
      (resp: UpdateAppInvitationSettingResponse): void => {
        commit(MutationTypes.AppendAppInvitationSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppInvitationSettingsByOtherApp] ({ commit }, req: GetAppInvitationSettingsByOtherAppRequest) {
    doAction<GetAppInvitationSettingsByOtherAppRequest, GetAppInvitationSettingsByOtherAppResponse>(
      commit,
      API.GET_APP_INVITATION_SETTINGS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppInvitationSettingsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppInvitationSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppPurchaseAmountSettingForOtherApp] ({ commit }, req: CreateAppPurchaseAmountSettingForOtherAppRequest) {
    doAction<CreateAppPurchaseAmountSettingForOtherAppRequest, CreateAppPurchaseAmountSettingForOtherAppResponse>(
      commit,
      API.CREATE_APP_PURCHASE_AMOUNT_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppPurchaseAmountSettingForOtherAppResponse): void => {
        commit(MutationTypes.AppendAppPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppPurchaseAmountSetting] ({ commit }, req: UpdateAppPurchaseAmountSettingRequest) {
    doAction<UpdateAppPurchaseAmountSettingRequest, UpdateAppPurchaseAmountSettingResponse>(
      commit,
      API.UPDATE_APP_PURCHASE_AMOUNT_SETTING,
      req,
      req.Message,
      (resp: UpdateAppPurchaseAmountSettingResponse): void => {
        commit(MutationTypes.AppendAppPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppPurchaseAmountSettingsByOtherApp] ({ commit }, req: GetAppPurchaseAmountSettingsByOtherAppRequest) {
    doAction<GetAppPurchaseAmountSettingsByOtherAppRequest, GetAppPurchaseAmountSettingsByOtherAppResponse>(
      commit,
      API.CREATE_EVENT_COUPON_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppPurchaseAmountSettingsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppPurchaseAmountSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppUserInvitationSettingForOtherApp] ({ commit }, req: CreateAppUserInvitationSettingForOtherAppUserRequest) {
    doAction<CreateAppUserInvitationSettingForOtherAppUserRequest, CreateAppUserInvitationSettingForOtherAppUserResponse>(
      commit,
      API.CREATE_APP_USER_INVITATION_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppUserInvitationSettingForOtherAppUserResponse): void => {
        commit(MutationTypes.AppendAppUserInvitationSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppUserInvitationSetting] ({ commit }, req: UpdateAppUserInvitationSettingRequest) {
    doAction<UpdateAppUserInvitationSettingRequest, UpdateAppUserInvitationSettingResponse>(
      commit,
      API.UPDATE_APP_USER_INVITATION_SETTING,
      req,
      req.Message,
      (resp: UpdateAppUserInvitationSettingResponse): void => {
        commit(MutationTypes.AppendAppUserInvitationSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppUserInvitationSettingsByOtherApp] ({ commit }, req: GetAppUserInvitationSettingsByOtherAppRequest) {
    doAction<GetAppUserInvitationSettingsByOtherAppRequest, GetAppUserInvitationSettingsByOtherAppResponse>(
      commit,
      API.GET_APP_USER_INVITATION_SETTINGS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppUserInvitationSettingsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppUserInvitationSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppUserPurchaseAmountSettingForOtherApp] ({ commit }, req: CreateAppUserPurchaseAmountSettingForOtherAppUserRequest) {
    doAction<CreateAppUserPurchaseAmountSettingForOtherAppUserRequest, CreateAppUserPurchaseAmountSettingForOtherAppUserResponse>(
      commit,
      API.CREATE_APP_USER_PURCHASE_AMOUNT_SETTING_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppUserPurchaseAmountSettingForOtherAppUserResponse): void => {
        commit(MutationTypes.AppendAppUserPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppUserPurchaseAmountSetting] ({ commit }, req: UpdateAppUserPurchaseAmountSettingRequest) {
    doAction<UpdateAppUserPurchaseAmountSettingRequest, UpdateAppUserPurchaseAmountSettingResponse>(
      commit,
      API.UPDATE_APP_USER_PURCHASE_AMOUNT_SETTING,
      req,
      req.Message,
      (resp: UpdateAppUserPurchaseAmountSettingResponse): void => {
        commit(MutationTypes.AppendAppUserPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppUserPurchaseAmountSettingsByOtherApp] ({ commit }, req: GetAppUserPurchaseAmountSettingsByOtherAppRequest) {
    doAction<GetAppUserPurchaseAmountSettingsByOtherAppRequest, GetAppUserPurchaseAmountSettingsByOtherAppResponse>(
      commit,
      API.CREATE_EVENT_COUPON_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppUserPurchaseAmountSettingsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppUserPurchaseAmountSettings, resp.Infos)
      })
  }
}

export {
  actions,
  InspireActions
}
