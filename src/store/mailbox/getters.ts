import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { MailboxState } from './state'
import { Announcement } from './types'

type MailboxGetters = {
  getAnnouncementsByApp (state: MailboxState): (appID: string) => Array<Announcement>
}

const getters: GetterTree<MailboxState, RootState> & MailboxGetters = {
  getAnnouncementsByApp (state: MailboxState): (appID: string) => Array<Announcement> {
    return (appID: string) => {
      return state.Announcements.get(appID) as Array<Announcement>
    }
  }
}

export { MailboxGetters, getters }
