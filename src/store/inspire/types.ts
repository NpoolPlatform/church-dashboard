import { ReqMessage } from '../notifications/types'

interface UserInvitationCode {
  ID?: string
  AppID: string
  UserID: string
  InvitationCode?: string
}

interface GetUserInvitationCodesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetUserInvitationCodesByOtherAppResponse {
  Infos: Array<UserInvitationCode>
}

interface CreateUserInvitationCodeForOtherAppUserRequest {
  TargetAppID: string
  TargetUserID: string
  Info: UserInvitationCode
  Message: ReqMessage
}

interface CreateUserInvitationCodeForOtherAppUserResponse {
  Info: UserInvitationCode
}

interface Activity {
  ID?: string
  AppID: string
  CreatedBy: string
  Name: string
  Start: number
  End: number
  SystemActivity: boolean
}

interface CreateActivityForOtherAppRequest {
  TargetAppID: string
  Info: Activity
  Message: ReqMessage
}

interface CreateActivityForOtherAppResponse {
  Info: Activity
}

interface GetActivitiesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetActivitiesByOtherAppResponse {
  Infos: Array<Activity>
}

interface UpdateActivityRequest {
  Info: Activity
  Message: ReqMessage
}

interface UpdateActivityResponse {
  Info: Activity
}

interface CouponPool {
  ID: string
  AppID: string
  ReleaseByUserID: string
  Denomination: number
  Circulation: number
  Start: number
  DurationDays: number
  Message: string
  Name: string
}

interface CreateCouponPoolForOtherAppRequest {
  TargetAppID: string
  Info: CouponPool
  Message: ReqMessage
}

interface CreateCouponPoolForOtherAppResponse {
  Info: CouponPool
}

interface GetCouponPoolsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetCouponPoolsByOtherAppResponse {
  Infos: Array<CouponPool>
}

interface UpdateCouponPoolRequest {
  Info: CouponPool
  Message: ReqMessage
}

interface UpdateCouponPoolResponse {
  Info: CouponPool
}

interface DiscountPool {
  ID: string
  AppID: string
  ReleaseByUserID: string
  Discount: number
  Start: number
  DurationDays: number
  Message: string
  Name: string
}

interface CreateDiscountPoolForOtherAppRequest {
  TargetAppID: string
  Info: DiscountPool
  Message: ReqMessage
}

interface CreateDiscountPoolForOtherAppResponse {
  Info: DiscountPool
}

interface GetDiscountPoolsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetDiscountPoolsByOtherAppResponse {
  Infos: Array<DiscountPool>
}

interface UpdateDiscountPoolRequest {
  Info: DiscountPool
  Message: ReqMessage
}

interface UpdateDiscountPoolResponse {
  Info: DiscountPool
}

interface UserSpecialReduction {
  ID: string
  AppID: string
  UserID: string
  Amount: number
  ReleaseByUserID: string
  Start: number
  DurationDays: number
  Message: string
}

interface CreateUserSpecialReductionForOtherAppUserRequest {
  TargetAppID: string
  TargetUserID: string
  Info: UserSpecialReduction
  Message: ReqMessage
}

interface CreateUserSpecialReductionForOtherAppUserResponse {
  Info: UserSpecialReduction
}

interface GetUserSpecialReductionsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetUserSpecialReductionsByOtherAppResponse {
  Infos: Array<UserSpecialReduction>
}

interface UpdateUserSpecialReductionRequest {
  Info: UserSpecialReduction
  Message: ReqMessage
}

interface UpdateUserSpecialReductionResponse {
  Info: UserSpecialReduction
}

interface CouponAllocated {
  ID?: string
  AppID?: string
  UserID?: string
  Type: string
  CouponID: string
}

interface CreateCouponAllocatedForOtherAppUserRequest {
  TargetAppID: string
  TargetUserID: string
  Info: CouponAllocated
  Message: ReqMessage
}

interface CreateCouponAllocatedForOtherAppUserResponse {
  Info: CouponAllocated
}

interface GetCouponsAllocatedByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetCouponsAllocatedByOtherAppResponse {
  Infos: Array<CouponAllocated>
}

interface EventCoupon {
  ID?: string
  AppID?: string
  ActivityID: string
  Event: string
  CouponID: string
  Type: string
  Count: number
}

interface CreateEventCouponForOtherAppRequest {
  TargetAppID: string
  Info: EventCoupon
  Message: ReqMessage
}

interface CreateEventCouponForOtherAppResponse {
  Info: EventCoupon
}

interface GetEventCouponsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetEventCouponsByOtherAppResponse {
  Infos: Array<EventCoupon>
}

export {
  UserInvitationCode,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse,
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse,
  Activity,
  CreateActivityForOtherAppRequest,
  CreateActivityForOtherAppResponse,
  GetActivitiesByOtherAppRequest,
  GetActivitiesByOtherAppResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  CouponPool,
  CreateCouponPoolForOtherAppRequest,
  CreateCouponPoolForOtherAppResponse,
  GetCouponPoolsByOtherAppRequest,
  GetCouponPoolsByOtherAppResponse,
  UpdateCouponPoolRequest,
  UpdateCouponPoolResponse,
  DiscountPool,
  CreateDiscountPoolForOtherAppRequest,
  CreateDiscountPoolForOtherAppResponse,
  GetDiscountPoolsByOtherAppRequest,
  GetDiscountPoolsByOtherAppResponse,
  UpdateDiscountPoolRequest,
  UpdateDiscountPoolResponse,
  UserSpecialReduction,
  CreateUserSpecialReductionForOtherAppUserRequest,
  CreateUserSpecialReductionForOtherAppUserResponse,
  GetUserSpecialReductionsByOtherAppRequest,
  GetUserSpecialReductionsByOtherAppResponse,
  UpdateUserSpecialReductionRequest,
  UpdateUserSpecialReductionResponse,
  CouponAllocated,
  CreateCouponAllocatedForOtherAppUserRequest,
  CreateCouponAllocatedForOtherAppUserResponse,
  GetCouponsAllocatedByOtherAppRequest,
  GetCouponsAllocatedByOtherAppResponse,
  EventCoupon,
  CreateEventCouponForOtherAppRequest,
  CreateEventCouponForOtherAppResponse,
  GetEventCouponsByOtherAppRequest,
  GetEventCouponsByOtherAppResponse
}
