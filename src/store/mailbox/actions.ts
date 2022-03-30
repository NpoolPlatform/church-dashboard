import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { MailboxMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { MailboxState } from './state'
import {
  CreateAnnouncementForOtherAppRequest,
  CreateAnnouncementForOtherAppResponse,
  GetAnnouncementsByOtherAppRequest,
  GetAnnouncementsByOtherAppResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse
} from './types'

interface MailboxActions {
  [ActionTypes.CreateAnnouncementForOtherApp]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: CreateAnnouncementForOtherAppRequest): void

  [ActionTypes.GetAnnouncementsByOtherApp]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: GetAnnouncementsByOtherAppRequest): void

  [ActionTypes.UpdateAnnouncement]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: UpdateAnnouncementRequest): void
}

const actions: ActionTree<MailboxState, RootState> = {
  [ActionTypes.CreateAnnouncementForOtherApp] ({ commit }, req: CreateAnnouncementForOtherAppRequest) {
    doAction<CreateAnnouncementForOtherAppRequest, CreateAnnouncementForOtherAppResponse>(
      commit,
      API.CREATE_ANNOUNCEMENT_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAnnouncementForOtherAppResponse): void => {
        commit(MutationTypes.SetAnnouncement, resp.Info)
      })
  },

  [ActionTypes.GetAnnouncementsByOtherApp] ({ commit }, req: GetAnnouncementsByOtherAppRequest) {
    doAction<GetAnnouncementsByOtherAppRequest, GetAnnouncementsByOtherAppResponse>(
      commit,
      API.GET_ANNOUNCEMENTS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAnnouncementsByOtherAppResponse): void => {
        commit(MutationTypes.SetAnnouncements, resp.Infos)
      })
  },

  [ActionTypes.UpdateAnnouncement] ({ commit }, req: UpdateAnnouncementRequest) {
    doAction<UpdateAnnouncementRequest, UpdateAnnouncementResponse>(
      commit,
      API.UPDATE_ANNOUNCEMENT,
      req,
      req.Message,
      (resp: UpdateAnnouncementResponse): void => {
        commit(MutationTypes.SetAnnouncement, resp.Info)
      })
  }
}

export {
  actions,
  MailboxActions
}
