import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { InspireMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetUserInvitationCodesByOtherAppRequest, GetUserInvitationCodesByOtherAppResponse } from './types'

interface InspireActions {
  [ActionTypes.GetUserInvitationCodeByOtherApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetUserInvitationCodesByOtherAppRequest): void
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
  }
}

export {
  actions,
  InspireActions
}
