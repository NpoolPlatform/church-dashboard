import { DefaultID } from 'src/const/const'
import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { AppLangInfo, AppLanguage, Country, Language, Message } from './types'

interface LanguagesState {
  Languages: Map<string, Language>
  CurLang: string
  Messages?: LocaleMessages<VueMessageType>
  AppLangInfos: Map<string, Array<AppLangInfo>>
  AppLanguages: Map<string, Array<AppLanguage>>
  MyMessages: Map<string, Array<Message>>
  Countries: Array<Country>
  SelectedAppID?: string
}

const DefaultLang = 'en-US'
const DefaultLanguage = {
  ID: DefaultID,
  Lang: DefaultLang,
  Logo: 'icons/england.png',
  Name: 'English',
  Short: 'En'
}

function state (): LanguagesState {
  const defaultLanguage = new Map<string, Language>()
  defaultLanguage.set(DefaultLang, DefaultLanguage)
  return {
    Languages: defaultLanguage,
    CurLang: DefaultLang,
    AppLangInfos: new Map<string, Array<AppLangInfo>>(),
    AppLanguages: new Map<string, Array<AppLanguage>>(),
    MyMessages: new Map<string, Array<Message>>(),
    Countries: []
  }
}

export {
  state,
  LanguagesState
}
