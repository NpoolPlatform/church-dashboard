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
  CreateCouponPoolForOtherAppRequest,
  CreateCouponPoolForOtherAppResponse,
  CreateDiscountPoolForOtherAppRequest,
  CreateDiscountPoolForOtherAppResponse,
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse,
  CreateUserSpecialReductionForOtherAppUserRequest,
  CreateUserSpecialReductionForOtherAppUserResponse,
  GetActivitiesByOtherAppRequest,
  GetActivitiesByOtherAppResponse,
  GetCouponPoolsByOtherAppRequest,
  GetCouponPoolsByOtherAppResponse,
  GetDiscountPoolsByOtherAppRequest,
  GetDiscountPoolsByOtherAppResponse,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse,
  GetUserSpecialReductionsByOtherAppRequest,
  GetUserSpecialReductionsByOtherAppResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
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
  }
}

export {
  actions,
  InspireActions
}
