import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { MailboxState } from './state'
import { Announcement } from './types'

type MailboxMutations<S = MailboxState> = {
  [MutationTypes.SetAnnouncements] (state: S, payload: Array<Announcement>): void
  [MutationTypes.SetAnnouncement] (state: S, payload: Announcement): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<MailboxState> & MailboxMutations = {
  [MutationTypes.SetAnnouncements] (state: MailboxState, payload: Array<Announcement>) {
    if (payload.length > 0) {
      state.Announcements.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetAnnouncement] (state: MailboxState, payload: Announcement) {
    const announcements = state.Announcements.get(payload.AppID)
    if (!announcements) {
      state.Announcements.set(payload.AppID, [payload])
      return
    }

    for (let i = 0; i < announcements.length; i++) {
      if (announcements[i].ID === payload.ID) {
        announcements.splice(i, 1, payload)
        state.Announcements.set(payload.AppID, announcements)
        return
      }
    }
    announcements.splice(0, 0, payload)
    state.Announcements.set(payload.AppID, announcements)
  },
  [MutationTypes.SetSelectedAppID] (state: MailboxState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { MailboxMutations, mutations }
