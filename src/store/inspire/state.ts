import { AppID } from 'src/const/const'
import { Activity, UserInvitationCode } from './types'

interface InspiresState {
  InvitationCodes: Map<string, Array<UserInvitationCode>>
  Activities: Map<string, Array<Activity>>
  SelectedAppID: string
}

function state (): InspiresState {
  return {
    InvitationCodes: new Map<string, Array<UserInvitationCode>>(),
    Activities: new Map<string, Array<Activity>>(),
    SelectedAppID: AppID
  }
}

export {
  state,
  InspiresState
}
