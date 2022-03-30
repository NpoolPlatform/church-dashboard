import { AppID } from 'src/const/const'
import { Announcement } from './types'

interface MailboxState {
  Announcements: Map<string, Array<Announcement>>
  SelectedAppID: string
}

function state (): MailboxState {
  return {
    Announcements: new Map<string, Array<Announcement>>(),
    SelectedAppID: AppID
  }
}

export {
  state,
  MailboxState
}
