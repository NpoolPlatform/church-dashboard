import { AppID } from 'src/const/const'
import { AppRole } from '../user-helper/types'
import { App, AppGood, AppGoodPromotion, Application, AppWithdrawSetting, Recommend } from './types'

interface ApplicationsState {
  Applications: Map<string, Application>
  Apps: Map<string, App>
  SelectedAppID: string
  AppRoles: Map<string, Array<AppRole>>
  AppGoods: Map<string, Array<AppGood>>
  Recommends: Map<string, Array<Recommend>>
  AppWithdrawSettings: Map<string, Array<AppWithdrawSetting>>
  Promotions: Map<string, Array<AppGoodPromotion>>
}

function state (): ApplicationsState {
  return {
    Applications: new Map<string, Application>(),
    Apps: new Map<string, App>(),
    SelectedAppID: AppID,
    AppRoles: new Map<string, Array<AppRole>>(),
    AppGoods: new Map<string, Array<AppGood>>(),
    Recommends: new Map<string, Array<Recommend>>(),
    AppWithdrawSettings: new Map<string, Array<AppWithdrawSetting>>(),
    Promotions: new Map<string, Array<AppGoodPromotion>>()
  }
}

export {
  state,
  ApplicationsState
}
