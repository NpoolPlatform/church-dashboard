import { ReqMessage } from '../notifications/types'

interface UserInvitationCode {
  ID: string
  AppID: string
  UserID: string
  InvitationCode: string
}

interface GetUserInvitationCodesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetUserInvitationCodesByOtherAppResponse {
  Infos: Array<UserInvitationCode>
}

export {
  UserInvitationCode,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse
}
