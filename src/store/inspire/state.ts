import { AppID } from 'src/const/const'
import { Activity, AppCommissionSetting, AppInvitationSetting, AppPurchaseAmountSetting, AppUserInvitationSetting, AppUserPurchaseAmountSetting, CouponAllocated, CouponPool, DiscountPool, EventCoupon, UserInvitationCode, UserSpecialReduction } from './types'

interface InspiresState {
  InvitationCodes: Map<string, Array<UserInvitationCode>>
  Activities: Map<string, Array<Activity>>
  CouponPools: Map<string, Array<CouponPool>>
  DiscountPools: Map<string, Array<DiscountPool>>
  UserSpecialReductions: Map<string, Array<UserSpecialReduction>>
  CouponsAllocated: Map<string, Array<CouponAllocated>>
  EventCoupons: Map<string, Array<EventCoupon>>
  AppCommissionSettings: Map<string, AppCommissionSetting>
  AppInvitationSettings: Map<string, Array<AppInvitationSetting>>
  AppPurchaseAmountSettings: Map<string, Array<AppPurchaseAmountSetting>>
  AppUserInvitationSettings: Map<string, Map<string, Array<AppUserInvitationSetting>>>
  AppUserPurchaseAmountSettings: Map<string, Map<string, Array<AppUserPurchaseAmountSetting>>>
  SelectedAppID: string
}

function state (): InspiresState {
  return {
    InvitationCodes: new Map<string, Array<UserInvitationCode>>(),
    Activities: new Map<string, Array<Activity>>(),
    CouponPools: new Map<string, Array<CouponPool>>(),
    DiscountPools: new Map<string, Array<DiscountPool>>(),
    UserSpecialReductions: new Map<string, Array<UserSpecialReduction>>(),
    CouponsAllocated: new Map<string, Array<CouponAllocated>>(),
    EventCoupons: new Map<string, Array<EventCoupon>>(),
    AppCommissionSettings: new Map<string, AppCommissionSetting>(),
    AppInvitationSettings: new Map<string, Array<AppInvitationSetting>>(),
    AppPurchaseAmountSettings: new Map<string, Array<AppPurchaseAmountSetting>>(),
    AppUserInvitationSettings: new Map<string, Map<string, Array<AppUserInvitationSetting>>>(),
    AppUserPurchaseAmountSettings: new Map<string, Map<string, Array<AppUserPurchaseAmountSetting>>>(),
    SelectedAppID: AppID
  }
}

export {
  state,
  InspiresState
}
