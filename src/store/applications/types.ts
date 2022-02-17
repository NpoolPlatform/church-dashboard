import { ReqMessage } from '../notifications/types'
import { AppRole } from '../user-helper/types'

interface App {
  ID: string
  CreatedBy: string
  Name: string
  Logo: string
  Description: string
  CreateAt: number
}

interface AppControl {
  ID: string
  AppID: string
  SignupMethods: Array<string>
  ExternSigninMethods: Array<string>
  RecaptchaMethod: string
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
}

interface BanApp {
  ID: string
  AppID: string
  Message: string
}

interface Application {
  App: App
  Ctrl: AppControl
  Ban: BanApp
}

interface GetApplicationsResponse {
  Infos: ReadonlyArray<Application>
}

interface GetApplicationsRequest {
  Message: ReqMessage
}

interface CreateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface CreateApplicationResponse {
  Info: App
}

interface UpdateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface UpdateApplicationResponse {
  Info: App
}

interface UpdateAppControlRequest {
  Info: AppControl
  Message: ReqMessage
}

interface UpdateAppControlResponse {
  Info: AppControl
}

interface CreateAppControlRequest {
  TargetAppID: string
  Info: AppControl
  Message: ReqMessage
}

interface CreateAppControlResponse {
  Info: AppControl
}

interface GetAppRolesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppRolesByOtherAppResponse {
  Infos: Array<AppRole>
}

interface CreateAppRoleForOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
  Info: AppRole
}

interface CreateAppRoleForOtherAppResponse {
  Info: AppRole
}

interface AppGood {
  ID?: string
  AppID?: string
  GoodID: string
  Price?: number
  Online?: boolean
  InitAreaStrategy?: string
}

interface GetAppGoodsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppGoodsByOtherAppResponse {
  Infos: Array<AppGood>
}

interface AuthorizeAppGoodForOtherAppRequest {
  TargetAppID: string
  Info: AppGood
  Message: ReqMessage
}

interface AuthorizeAppGoodForOtherAppResponse {
  Info: AppGood
}

interface UnauthorizeAppGoodRequest {
  ID: string
  Message: ReqMessage
}

interface UnauthorizeAppGoodResponse {
  Info: AppGood
}

interface Recommend {
  ID: string
  AppID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

interface GetRecommendsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetRecommendsByOtherAppResponse {
  Infos: Array<Recommend>
}

interface CreateRecommendForOtherAppRequest {
  TargetAppID: string
  Info: Recommend
  Message: ReqMessage
}

interface CreateRecommendForOtherAppResponse {
  Info: Recommend
}

export {
  App,
  AppControl,
  BanApp,
  Application,
  GetApplicationsRequest,
  GetApplicationsResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  CreateAppControlRequest,
  CreateAppControlResponse,
  GetAppRolesByOtherAppRequest,
  GetAppRolesByOtherAppResponse,
  CreateAppRoleForOtherAppRequest,
  CreateAppRoleForOtherAppResponse,
  AppGood,
  GetAppGoodsByOtherAppRequest,
  GetAppGoodsByOtherAppResponse,
  AuthorizeAppGoodForOtherAppRequest,
  AuthorizeAppGoodForOtherAppResponse,
  UnauthorizeAppGoodRequest,
  UnauthorizeAppGoodResponse,
  Recommend,
  GetRecommendsByOtherAppRequest,
  GetRecommendsByOtherAppResponse,
  CreateRecommendForOtherAppRequest,
  CreateRecommendForOtherAppResponse
}
