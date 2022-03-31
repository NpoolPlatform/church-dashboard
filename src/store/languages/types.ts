import { ReqMessage } from '../notifications/types'

interface Language {
  ID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface GetLanguagesResponse {
  Infos: ReadonlyArray<Language>
}

interface GetLanguagesRequest {
  Message: ReqMessage
}

interface AppLanguage {
  ID: string
  AppID: string
  LangID: string
}

interface AppLangInfo {
  AppLang: AppLanguage
  Lang: Language
}

interface GetAppLangInfosByAppRequest {
  Message: ReqMessage
}

interface GetAppLangInfosByAppResponse {
  Infos: Array<AppLangInfo>
}

interface GetAppLangInfosByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppLangInfosByOtherAppResponse {
  Infos: Array<AppLangInfo>
}

interface AddLanguageRequest {
  Info: Language
  Message: ReqMessage
}

interface AddLanguageResponse {
  Info: Language
}

interface UpdateLanguageRequest {
  Info: Language
  Message: ReqMessage
}

interface UpdateLanguageResponse {
  Info: Language
}

interface CreateAppLanguageRequest {
  TargetAppID: string
  Info: AppLanguage
  Message: ReqMessage
}

interface CreateAppLanguageResponse {
  Info: AppLanguage
}

interface Message {
  ID: string
  AppID: string
  LangID: string
  MessageID: string
  Message: string
  BatchGet: boolean
}

interface GetMessagesByOtherAppLangRequest {
  TargetAppID: string
  LangID: string
  Message: ReqMessage
}

interface GetMessagesByOtherAppLangResponse {
  Infos: Array<Message>
}

interface CreateMessageForOtherAppRequest {
  TargetAppID: string
  Info: Message
  Message: ReqMessage
}

interface CreateMessageForOtherAppResponse {
  Info: Message
}

interface UpdateMessageRequest {
  Info: Message
  Message: ReqMessage
}

interface UpdateMessageResponse {
  Info: Message
}

interface Country {
  ID: string
  Country: string
  Flag: string
  Code: string
  Short: string
}

interface CreateCountryRequest {
  Info: Country
  Message: ReqMessage
}

interface CreateCountryResponse {
  Info: Country
}

interface UpdateCountryRequest {
  Info: Country
  Message: ReqMessage
}

interface UpdateCountryResponse {
  Info: Country
}

interface GetCountriesRequest {
  Message: ReqMessage
}

interface GetCountriesResponse {
  Infos: Array<Country>
}

export {
  Language,
  GetLanguagesRequest,
  GetLanguagesResponse,
  AppLangInfo,
  GetAppLangInfosByAppRequest,
  GetAppLangInfosByAppResponse,
  GetAppLangInfosByOtherAppRequest,
  GetAppLangInfosByOtherAppResponse,
  AddLanguageRequest,
  AddLanguageResponse,
  UpdateLanguageRequest,
  UpdateLanguageResponse,
  AppLanguage,
  CreateAppLanguageRequest,
  CreateAppLanguageResponse,
  Message,
  GetMessagesByOtherAppLangRequest,
  GetMessagesByOtherAppLangResponse,
  CreateMessageForOtherAppRequest,
  CreateMessageForOtherAppResponse,
  UpdateMessageRequest,
  UpdateMessageResponse,
  Country,
  CreateCountryRequest,
  CreateCountryResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  GetCountriesRequest,
  GetCountriesResponse
}
