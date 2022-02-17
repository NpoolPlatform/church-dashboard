import { MutationTree } from 'vuex'
import { AppRole } from '../user-helper/types'
import { MutationTypes } from './mutation-types'
import { ApplicationsState } from './state'
import { App, AppControl, AppGood, Application, BanApp, Recommend } from './types'

type ApplicationMutations<S = ApplicationsState> = {
  [MutationTypes.SetApplications] (state: S, payload: Array<Application>): void
  [MutationTypes.SetApplication] (state: S, payload: App): void
  [MutationTypes.SetAppControl] (state: S, payload: AppControl): void
  [MutationTypes.SetAppRoles] (state: S, payload: Array<AppRole>): void
  [MutationTypes.SetAppGoods] (state: S, payload: Array<AppGood>): void
  [MutationTypes.SetRecommends] (state: S, payload: Array<Recommend>): void
  [MutationTypes.DeleteAppGood] (state: S, payload: AppGood): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<ApplicationsState> & ApplicationMutations = {
  [MutationTypes.SetApplications] (state: ApplicationsState, payload: Array<Application>) {
    payload.forEach((app) => {
      state.Applications.set(app.App.ID, app)
    })
  },

  [MutationTypes.SetApplication] (state: ApplicationsState, payload: App) {
    state.Apps.set(payload.ID, payload)
    const app = state.Applications.get(payload.ID)
    state.Applications.set(payload.ID, {
      App: payload,
      Ctrl: app?.Ctrl as AppControl,
      Ban: app?.Ban as BanApp
    })
  },

  [MutationTypes.SetAppControl] (state: ApplicationsState, payload: AppControl): void {
    const app = state.Applications.get(payload.AppID)
    state.Applications.set(payload.ID, {
      App: app?.App as App,
      Ctrl: payload,
      Ban: app?.Ban as BanApp
    })
  },

  [MutationTypes.SetAppRoles] (state: ApplicationsState, payload: Array<AppRole>): void {
    if (payload.length > 0) {
      let roles = state.AppRoles.get(payload[0].AppID) as Array<AppRole>
      if (!roles) {
        roles = [] as Array<AppRole>
      }
      payload.forEach((role) => {
        for (let i = 0; i < roles.length; i++) {
          if (role.ID === roles[i].ID) {
            return
          }
        }
        roles.push(role)
      })
      state.AppRoles.set(payload[0].AppID, roles)
    }
  },

  [MutationTypes.SetAppGoods] (state: ApplicationsState, payload: Array<AppGood>): void {
    if (payload.length > 0) {
      let goods = state.AppGoods.get(payload[0].AppID as string) as Array<AppGood>
      if (!goods) {
        goods = [] as Array<AppGood>
      }
      payload.forEach((good) => {
        for (let i = 0; i < goods.length; i++) {
          if (good.ID === goods[i].ID) {
            goods.splice(i, 1, good)
            return
          }
        }
        goods.push(good)
      })
      state.AppGoods.set(payload[0].AppID as string, goods)
    }
  },

  [MutationTypes.SetRecommends] (state: ApplicationsState, payload: Array<Recommend>): void {
    if (payload.length > 0) {
      let recommends = state.Recommends.get(payload[0].AppID) as Array<Recommend>
      if (!recommends) {
        recommends = [] as Array<Recommend>
      }
      payload.forEach((recommend) => {
        for (let i = 0; i < recommends.length; i++) {
          if (recommend.ID === recommends[i].ID) {
            return
          }
        }
        recommends.push(recommend)
      })
      state.Recommends.set(payload[0].AppID, recommends)
    }
  },

  [MutationTypes.DeleteAppGood] (state: ApplicationsState, payload: AppGood): void {
    const appGoods = state.AppGoods.get(payload.AppID as string)
    if (appGoods) {
      for (let i = 0; i < appGoods.length; i++) {
        if (appGoods[i].ID === payload.ID) {
          appGoods.splice(i, 1)
          break
        }
      }
    }
    state.AppGoods.set(payload.AppID as string, appGoods as Array<AppGood>)
  },

  [MutationTypes.SetSelectedAppID] (state: ApplicationsState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { ApplicationMutations, mutations }
