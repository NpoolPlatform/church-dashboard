import { ReqMessage } from '../notifications/types'

interface Announcement {
  ID: string
  AppID: string
  Title: string
  Content: string
  CreateAt: number
}

interface CreateAnnouncementForOtherAppRequest {
  TargetAppID: string
  Info: Announcement
  Message: ReqMessage
}

interface CreateAnnouncementForOtherAppResponse {
  Info: Announcement
}

interface UpdateAnnouncementRequest {
  Info: Announcement
  Message: ReqMessage
}

interface UpdateAnnouncementResponse {
  Info: Announcement
}

interface GetAnnouncementsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAnnouncementsByOtherAppResponse {
  Infos: Array<Announcement>
}

interface Mail {
  ID: string
  AppID: string
  FromUserID: string
  ToUserID: string
  Title: string
  Content: string
  AlreadyRead: string
  CreateAt: number
}

export {
  Announcement,
  CreateAnnouncementForOtherAppRequest,
  CreateAnnouncementForOtherAppResponse,
  GetAnnouncementsByOtherAppRequest,
  GetAnnouncementsByOtherAppResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
  Mail
}
