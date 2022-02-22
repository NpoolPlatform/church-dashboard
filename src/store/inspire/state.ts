import { UserInvitationCode } from './types'

interface InspiresState {
  InvitationCodes: Map<string, Array<UserInvitationCode>>
}

function state (): InspiresState {
  return {
    InvitationCodes: new Map<string, Array<UserInvitationCode>>()
  }
}

export {
  state,
  InspiresState
}
