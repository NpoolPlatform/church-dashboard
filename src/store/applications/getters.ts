import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationsState } from './state'
import { AppGood, AppGoodPromotion, Application, AppWithdrawSetting, Recommend } from './types'
import { AppID } from 'src/const/const'
import { AppRole } from '../user-helper/types'

type ApplicationGetters = {
  getApplication (state: ApplicationsState): Application
  getApplicationByID (state: ApplicationsState): (id: string) => Application
  getApplications (state: ApplicationsState): Array<Application>
  getAppRolesByAppID (state: ApplicationsState): (appID: string) => Array<AppRole>
  getAppGoodsByAppID (state: ApplicationsState): (appID: string) => Array<AppGood>
  getRecommendsByAppID (state: ApplicationsState): (appID: string) => Array<Recommend>
  getAppWithdrawSettingsByAppID (state: ApplicationsState): (appID: string) => Array<AppWithdrawSetting>
  getAppWithdrawSettingByAppCoin (state: ApplicationsState): (appID: string, coinTypeID: string) => AppWithdrawSetting
  getAppGoodPromotionsByAppID (state: ApplicationsState): (appID: string) => Array<AppGoodPromotion>
  getAppSelectedAppID (state: ApplicationsState): string
}

const getters: GetterTree<ApplicationsState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationsState): Application => {
    return state.Applications.get(AppID) as Application
  },
  getApplicationByID: (state: ApplicationsState): (id: string) => Application => {
    return (id: string) => state.Applications.get(id) as Application
  },
  getApplications: (state: ApplicationsState): Array<Application> => {
    const applications: Array<Application> = []
    state.Applications.forEach((val) => {
      applications.push(val)
    })
    return applications
  },
  getAppRolesByAppID: (state: ApplicationsState): (appID: string) => Array<AppRole> => {
    return (appID: string) => {
      return state.AppRoles.get(appID) as Array<AppRole>
    }
  },
  getAppGoodsByAppID: (state: ApplicationsState): (appID: string) => Array<AppGood> => {
    return (appID: string) => {
      return state.AppGoods.get(appID) as Array<AppGood>
    }
  },
  getRecommendsByAppID: (state: ApplicationsState): (appID: string) => Array<Recommend> => {
    return (appID: string) => {
      return state.Recommends.get(appID) as Array<Recommend>
    }
  },
  getAppWithdrawSettingsByAppID: (state: ApplicationsState): (appID: string) => Array<AppWithdrawSetting> => {
    return (appID: string) => {
      return state.AppWithdrawSettings.get(appID) as Array<AppWithdrawSetting>
    }
  },
  getAppWithdrawSettingByAppCoin: (state: ApplicationsState): (appID: string, coinTypeID: string) => AppWithdrawSetting => {
    return (appID: string, coinTypeID: string) => {
      const settings = state.AppWithdrawSettings.get(appID) as Array<AppWithdrawSetting>
      if (settings) {
        for (let i = 0; i < settings.length; i++) {
          if (settings[i].CoinTypeID === coinTypeID) {
            return settings[i]
          }
        }
      }
      return undefined as unknown as AppWithdrawSetting
    }
  },
  getAppGoodPromotionsByAppID: (state: ApplicationsState): (appID: string) => Array<AppGoodPromotion> => {
    return (appID: string) => {
      return state.Promotions.get(appID) as Array<AppGoodPromotion>
    }
  },
  getAppSelectedAppID: (state: ApplicationsState): string => state.SelectedAppID
}

export { ApplicationGetters, getters }
