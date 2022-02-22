import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { InspireMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse
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
  }
}

export {
  actions,
  InspireActions
}
