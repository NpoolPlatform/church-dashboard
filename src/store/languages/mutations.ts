import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { LanguagesState } from './state'
import { AppLangInfo, AppLanguage, Country, Language, Message } from './types'

type LanguageMutations<S = LanguagesState> = {
  [MutationTypes.SetLanguage] (state: S, payload: Language): void
  [MutationTypes.SetLangShort] (state: S, payload: string): void
  [MutationTypes.SetMessages] (state: S, payload: unknown): void
  [MutationTypes.SetAppLangInfos] (state: S, payload: Array<AppLangInfo>): void
  [MutationTypes.SetAppLanguage] (state: S, payload: AppLanguage): void
  [MutationTypes.SetMyMessages] (state: S, payload: Array<Message>): void
  [MutationTypes.SetCountries] (state: S, payload: Array<Country>): void
  [MutationTypes.SetCountry] (state: S, payload: Country): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<LanguagesState> & LanguageMutations = {
  [MutationTypes.SetLanguage] (state: LanguagesState, payload: Language) {
    state.Languages.set(payload.Lang, payload)
  },
  [MutationTypes.SetLangShort] (state: LanguagesState, payload: string) {
    state.CurLang = payload
  },
  [MutationTypes.SetMessages] (state: LanguagesState, payload: LocaleMessages<VueMessageType>) {
    state.Messages = payload
  },
  [MutationTypes.SetCountries] (state: LanguagesState, payload: Array<Country>) {
    state.Countries = payload
  },
  [MutationTypes.SetCountry] (state: LanguagesState, payload: Country) {
    state.Countries.push(payload)
  },
  [MutationTypes.SetAppLangInfos] (state: LanguagesState, payload: Array<AppLangInfo>): void {
    if (payload.length > 0) {
      state.AppLangInfos.set(payload[0].AppLang.AppID, payload)
    }
  },
  [MutationTypes.SetAppLanguage] (state: LanguagesState, payload: AppLanguage) {
    let appLanguages = state.AppLanguages.get(payload.AppID)
    if (!appLanguages) {
      appLanguages = [] as Array<AppLanguage>
    }
    appLanguages?.push(payload)
    state.AppLanguages.set(payload.AppID, appLanguages)
  },
  [MutationTypes.SetMyMessages] (state: LanguagesState, payload: Array<Message>) {
    if (payload.length > 0) {
      let myMessages = state.MyMessages.get(payload[0].AppID) as Array<Message>
      if (!myMessages) {
        myMessages = []
      }
      for (const message of payload) {
        let inserted = false
        for (let i = 0; i < myMessages.length; i++) {
          if (myMessages[i].ID === message.ID) {
            myMessages.splice(i, 1, message)
            inserted = true
            break
          }
        }

        if (!inserted) {
          myMessages.push(message)
        }
      }
      state.MyMessages.set(payload[0].AppID, myMessages)
    }
  },
  [MutationTypes.SetSelectedAppID] (state: LanguagesState, payload: string) {
    state.SelectedAppID = payload
  }
}

export { LanguageMutations, mutations }
