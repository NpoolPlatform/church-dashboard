import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationsState } from './state'
import { AppGood, Application } from './types'
import { AppID } from 'src/const/const'
import { AppRole } from '../user-helper/types'

type ApplicationGetters = {
  getApplication (state: ApplicationsState): Application
  getApplicationByID (state: ApplicationsState): (id: string) => Application
  getApplications (state: ApplicationsState): Array<Application>
  getAppRolesByAppID (state: ApplicationsState): (appID: string) => Array<AppRole>
  getAppGoodsByAppID (state: ApplicationsState): (appID: string) => Array<AppGood>
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
  getAppSelectedAppID: (state: ApplicationsState): string => state.SelectedAppID
}

export { ApplicationGetters, getters }
