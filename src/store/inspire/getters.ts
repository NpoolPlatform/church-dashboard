import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import { UserInvitationCode } from './types'

type InspireGetters = {
  getUserInvitationCodesByAppID (state: InspiresState): (appID: string) => Array<UserInvitationCode>
}

const getters: GetterTree<InspiresState, RootState> & InspireGetters = {
  getUserInvitationCodesByAppID: (state: InspiresState): (appID: string) => Array<UserInvitationCode> => {
    return (appID: string) => {
      return state.InvitationCodes.get(appID) as Array<UserInvitationCode>
    }
  }
}

export { InspireGetters, getters }
