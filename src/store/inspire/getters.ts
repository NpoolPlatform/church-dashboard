import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import { Activity, CouponPool, UserInvitationCode } from './types'

type InspireGetters = {
  getUserInvitationCodesByAppID (state: InspiresState): (appID: string) => Array<UserInvitationCode>
  getActivitiesByAppID (state: InspiresState): (appID: string) => Array<Activity>
  getCouponPoolsByAppID (state: InspiresState): (appID: string) => Array<CouponPool>
  getInspireSelectedAppID (state: InspiresState): string
}

const getters: GetterTree<InspiresState, RootState> & InspireGetters = {
  getUserInvitationCodesByAppID: (state: InspiresState): (appID: string) => Array<UserInvitationCode> => {
    return (appID: string) => {
      return state.InvitationCodes.get(appID) as Array<UserInvitationCode>
    }
  },
  getActivitiesByAppID: (state: InspiresState): (appID: string) => Array<Activity> => {
    return (appID: string) => {
      return state.Activities.get(appID) as Array<Activity>
    }
  },
  getCouponPoolsByAppID: (state: InspiresState): (appID: string) => Array<CouponPool> => {
    return (appID: string) => {
      return state.CouponPools.get(appID) as Array<CouponPool>
    }
  },
  getInspireSelectedAppID: (state: InspiresState): string => state.SelectedAppID
}

export { InspireGetters, getters }
