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

export {
  UserInvitationCode,
  GetUserInvitationCodesByOtherAppRequest,
  GetUserInvitationCodesByOtherAppResponse,
  CreateUserInvitationCodeForOtherAppUserRequest,
  CreateUserInvitationCodeForOtherAppUserResponse
}
