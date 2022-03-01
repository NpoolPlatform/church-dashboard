import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import {
  Activity,
  AppCommissionSetting,
  AppInvitationSetting,
  AppPurchaseAmountSetting,
  AppUserPurchaseAmountSetting,
  CommissionCoinSetting,
  CouponAllocated,
  CouponPool,
  DiscountPool,
  EventCoupon,
  UserInvitationCode,
  UserSpecialReduction
} from './types'

type InspireGetters = {
  getUserInvitationCodesByAppID (state: InspiresState): (appID: string) => Array<UserInvitationCode>
  getActivitiesByAppID (state: InspiresState): (appID: string) => Array<Activity>
  getCouponPoolsByAppID (state: InspiresState): (appID: string) => Array<CouponPool>
  getDiscountPoolsByAppID (state: InspiresState): (appID: string) => Array<DiscountPool>
  getUserSpecialReductionsByAppID (state: InspiresState): (appID: string) => Array<UserSpecialReduction>
  getCouponsAllocatedByAppID (state: InspiresState): (appID: string) => Array<CouponAllocated>
  getEventCouponsByAppID (state: InspiresState): (appID: string) => Array<EventCoupon>
  getAppCommissionSettingByAppID (state: InspiresState): (appID: string) => AppCommissionSetting
  getAppInvitationSettingsByAppID (state: InspiresState): (appID: string) => Array<AppInvitationSetting>
  getAppPurchaseAmountSettingsByAppID (state: InspiresState): (appID: string) => Array<AppPurchaseAmountSetting>
  getAppUserPurchaseAmountSettingsByAppUser (state: InspiresState): (appID: string, userID: string) => Array<AppUserPurchaseAmountSetting>
  getCommissionCoins (state: InspiresState): Array<CommissionCoinSetting>
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
  getDiscountPoolsByAppID: (state: InspiresState): (appID: string) => Array<DiscountPool> => {
    return (appID: string) => {
      return state.DiscountPools.get(appID) as Array<DiscountPool>
    }
  },
  getUserSpecialReductionsByAppID: (state: InspiresState): (appID: string) => Array<UserSpecialReduction> => {
    return (appID: string) => {
      return state.UserSpecialReductions.get(appID) as Array<UserSpecialReduction>
    }
  },
  getCouponsAllocatedByAppID: (state: InspiresState): (appID: string) => Array<CouponAllocated> => {
    return (appID: string) => {
      return state.CouponsAllocated.get(appID) as Array<CouponAllocated>
    }
  },
  getEventCouponsByAppID: (state: InspiresState): (appID: string) => Array<EventCoupon> => {
    return (appID: string) => {
      return state.EventCoupons.get(appID) as Array<EventCoupon>
    }
  },
  getAppCommissionSettingByAppID: (state: InspiresState): (appID: string) => AppCommissionSetting => {
    return (appID: string) => {
      return state.AppCommissionSettings.get(appID) as AppCommissionSetting
    }
  },
  getAppInvitationSettingsByAppID: (state: InspiresState): (appID: string) => Array<AppInvitationSetting> => {
    return (appID: string) => {
      return state.AppInvitationSettings.get(appID) as Array<AppInvitationSetting>
    }
  },
  getAppPurchaseAmountSettingsByAppID: (state: InspiresState): (appID: string) => Array<AppPurchaseAmountSetting> => {
    return (appID: string) => {
      return state.AppPurchaseAmountSettings.get(appID) as Array<AppPurchaseAmountSetting>
    }
  },
  getAppUserPurchaseAmountSettingsByAppUser: (state: InspiresState): (appID: string, userID: string) => Array<AppUserPurchaseAmountSetting> => {
    return (appID: string, userID: string) => {
      console.log(appID, userID, state.AppUserPurchaseAmountSettings)
      return state.AppUserPurchaseAmountSettings.get(appID)?.get(userID) as Array<AppUserPurchaseAmountSetting>
    }
  },
  getCommissionCoins: (state: InspiresState): Array<CommissionCoinSetting> => state.CommissionCoins,
  getInspireSelectedAppID: (state: InspiresState): string => state.SelectedAppID
}

export { InspireGetters, getters }
