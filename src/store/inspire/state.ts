import { AppID } from 'src/const/const'
import { Activity, CouponPool, DiscountPool, UserInvitationCode, UserSpecialReduction } from './types'

interface InspiresState {
  InvitationCodes: Map<string, Array<UserInvitationCode>>
  Activities: Map<string, Array<Activity>>
  CouponPools: Map<string, Array<CouponPool>>
  DiscountPools: Map<string, Array<DiscountPool>>
  UserSpecialReductions: Map<string, Array<UserSpecialReduction>>
  SelectedAppID: string
}

function state (): InspiresState {
  return {
    InvitationCodes: new Map<string, Array<UserInvitationCode>>(),
    Activities: new Map<string, Array<Activity>>(),
    CouponPools: new Map<string, Array<CouponPool>>(),
    DiscountPools: new Map<string, Array<DiscountPool>>(),
    UserSpecialReductions: new Map<string, Array<UserSpecialReduction>>(),
    SelectedAppID: AppID
  }
}

export {
  state,
  InspiresState
}
