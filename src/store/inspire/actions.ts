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
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse,
  GetActivitiesByOtherAppRequest,
  GetActivitiesByOtherAppResponse,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse,
  UpdateActivityRequest,
  UpdateActivityResponse
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
  }
}

export {
  actions,
  InspireActions
}
