import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { UserInvitationCode } from './types'

type InspireMutations<S = InspiresState> = {
  [MutationTypes.SetUserInvitationCodes] (state: S, payload: Array<UserInvitationCode>): void
  [MutationTypes.AppendUserInvitationCode] (state: S, payload: UserInvitationCode): void
}

const mutations: MutationTree<InspiresState> & InspireMutations = {
  [MutationTypes.SetUserInvitationCodes] (state: InspiresState, payload: Array<UserInvitationCode>) {
    if (payload.length > 0) {
      state.InvitationCodes.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendUserInvitationCode] (state: InspiresState, payload: UserInvitationCode): void {
    let codes = state.InvitationCodes.get(payload.AppID)
    if (!codes) {
      codes = [] as Array<UserInvitationCode>
    }
    codes.push(payload)
    state.InvitationCodes.set(payload.AppID, codes)
  }
}

export { InspireMutations, mutations }
