<template>
  <q-table
    v-model:selected='selectedGoods'
    flat
    dense
    row-key='ID'
    :rows='allGoods'
    selection='multiple'
  />
  <q-table
    v-model:selected='selectedAppGoods'
    row-key='ID'
    flat
    dense
    :loading='loading'
    :rows='appGoods'
    selection='multiple'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-input v-model='goodPrice' dense flat :label='t("MSG_GOOD_PRICE")' />
        <q-btn dense @click='onAuthorizeGoods'>
          {{ $t('MSG_AUTHORIZE_GOOD') }}
        </q-btn>
        <q-btn dense @click='onUnauthorizeGoods'>
          {{ $t('MSG_UNAUTHORIZE_GOOD') }}
        </q-btn>
        <q-btn dense @click='onSetGoodOnline'>
          {{ $t('MSG_SET_ONLINE') }}
        </q-btn>
        <q-btn dense @click='onSetGoodOffline'>
          {{ $t('MSG_SET_OFFLINE') }}
        </q-btn>
        <q-btn dense @click='onModifyPrice'>
          {{ $t('MSG_MODIFY_PRICE') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='recommends'
    @row-click='(evt, row, index) => onRecommendClick(row as Recommend)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onAddRecommend'>
          {{ $t('MSG_ADD') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedCoin'
    flat
    dense
    row-key='ID'
    :loading='loading'
    :rows='coins'
    selection='single'
  />
  <q-table
    flat
    dense
    :loading='loading'
    :rows='settings'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppWithdrawSetting'>
          {{ mySetting ? $t('MSG_SUBMIT') : $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
    <template #body='props'>
      <q-tr :props='props'>
        <q-td key='ID' :props='props'>
          {{ props.row.ID }}
        </q-td>
        <q-td key='AppID' :props='props'>
          {{ props.row.AppID }}
        </q-td>
        <q-td key='CoinTypeID' :props='props'>
          {{ props.row.CoinTypeID }}
        </q-td>
        <q-td key='WithdrawAutoReviewCoinAmount' :props='props'>
          {{ withdrawAutoReviewCoinAmount }}
          <q-popup-edit v-slot='scope' v-model='withdrawAutoReviewCoinAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='promotions'
    @row-click='(evt, row, index) => onPromotionClick(row as AppGoodPromotion)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreatePromotion'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateAppRecommendGood
      v-if='addingType === AddingType.AddingRecommend'
      v-model:selected-app='selectedApp'
      v-model:edit-recommend='selectedRecommend'
      @update='onRecommendUpdate'
      @submit='onRecommendSubmit'
    />
    <CreateAppGoodPromotion
      v-if='addingType === AddingType.AddingPromotion'
      v-model:selected-app='selectedApp'
      v-model:edit-promotion='selectedPromotion'
      @update='onPromotionUpdate'
      @submit='onPromotionSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/applications/mutation-types'
import { GoodBase } from 'src/store/goods/types'
import { AppGood, AppWithdrawSetting, Recommend, AppGoodPromotion } from 'src/store/applications/types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { Coin } from 'src/store/coins/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppRecommendGood = defineAsyncComponent(() => import('src/components/application/CreateAppRecommendGood.vue'))
const CreateAppGoodPromotion = defineAsyncComponent(() => import('src/components/application/CreateAppGoodPromotion.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)

const selectedAppID = computed({
  get: () => store.getters.getAppEmailTemplateSelectedAppID,
  set: (val) => {
    store.commit(ApplicationMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push({
      ID: good.Good.Good.ID,
      SeparateFee: good.Good.Good.SeparateFee,
      UnitPower: good.Good.Good.UnitPower,
      DurationDays: good.Good.Good.DurationDays,
      Actuals: good.Good.Good.Actuals,
      DeliveryAt: good.Good.Good.DeliveryAt,
      Price: good.Good.Good.Price,
      BenefitType: good.Good.Good.BenefitType,
      Classic: good.Good.Good.Classic,
      Title: good.Good.Good.Title,
      Total: good.Good.Good.Total,
      Unit: good.Good.Good.Unit
    } as GoodBase)
  })
  return goods
})
const appGoods = computed(() => store.getters.getAppGoodsByAppID(selectedAppID.value))
const selectedGoods = ref([] as Array<GoodBase>)
const selectedAppGoods = ref([] as Array<AppGood>)
const recommends = computed(() => store.getters.getRecommendsByAppID(selectedAppID.value))
const settings = computed(() => store.getters.getAppWithdrawSettingsByAppID(selectedAppID.value))
const coins = computed(() => store.getters.getCoins)
const promotions = computed(() => store.getters.getAppGoodPromotionsByAppID(selectedAppID.value))

const selectedCoin = ref([] as Array<Coin>)

const onAuthorizeGoods = () => {
  selectedGoods.value.forEach((good) => {
    store.dispatch(ApplicationActionTypes.AuthorizeAppGoodForOtherApp, {
      TargetAppID: selectedAppID.value,
      Info: {
        GoodID: good.ID as string,
        Price: 0,
        Online: false
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_AUTHORIZE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onUnauthorizeGoods = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.UnauthorizeAppGood, {
      ID: appGood.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_UNAUTHORIZE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onSetGoodOnline = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.OnsaleAppGoodForOtherApp, {
      TargetAppID: selectedApp.value.App.ID,
      Info: {
        ID: appGood.ID,
        AppID: appGood.AppID,
        GoodID: appGood.GoodID,
        Price: appGood.Price,
        Online: true
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onSetGoodOffline = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.OffsaleAppGoodForOtherApp, {
      TargetAppID: selectedApp.value.App.ID,
      Info: {
        ID: appGood.ID,
        AppID: appGood.AppID,
        GoodID: appGood.GoodID,
        Price: appGood.Price,
        Online: false
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const goodPrice = ref(1000)

const onModifyPrice = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.SetAppGoodPriceForOtherApp, {
      TargetAppID: selectedApp.value.App.ID,
      Info: {
        ID: appGood.ID,
        AppID: appGood.AppID,
        GoodID: appGood.GoodID,
        Price: goodPrice.value,
        Online: false
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

enum AddingType {
  AddingRecommend = 'recommend',
  AddingPromotion = 'promotion',
  AddingNone = 'none'
}

const selectedRecommend = ref(undefined as unknown as Recommend)
const selectedPromotion = ref(undefined as unknown as AppGoodPromotion)

const modifying = ref(false)
const adding = ref(false)
const updating = ref(false)
const addingType = ref(AddingType.AddingNone)

const onAddRecommend = () => {
  modifying.value = true
  adding.value = true
  addingType.value = AddingType.AddingRecommend
}

const onRecommendClick = (recommend: Recommend) => {
  selectedRecommend.value = recommend
  modifying.value = true
  updating.value = true
  addingType.value = AddingType.AddingRecommend
}

const onCreatePromotion = () => {
  modifying.value = true
  adding.value = true
  addingType.value = AddingType.AddingPromotion
}

const onPromotionClick = (promotion: AppGoodPromotion) => {
  selectedPromotion.value = promotion
  modifying.value = true
  updating.value = true
  addingType.value = AddingType.AddingPromotion
}

const setting = computed(() => {
  if (selectedApp.value && selectedCoin.value.length > 0) {
    return store.getters.getAppWithdrawSettingByAppCoin(selectedApp.value.App.ID, selectedCoin.value[0].ID as string)
  }
  return undefined as unknown as AppWithdrawSetting
})
const mySetting = ref(setting.value)

const withdrawAutoReviewCoinAmount = ref(0)
watch(selectedApp, () => {
  if (selectedCoin.value.length > 0) {
    mySetting.value = store.getters.getAppWithdrawSettingByAppCoin(selectedApp.value.App.ID, selectedCoin.value[0].ID as string)
    if (mySetting.value) {
      withdrawAutoReviewCoinAmount.value = mySetting.value.WithdrawAutoReviewCoinAmount
    }
  }

  store.dispatch(ApplicationActionTypes.GetAppWithdrawSettingsByOtherApp, {
    TargetAppID: selectedApp.value.App.ID,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APP_WITHDRAW_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})
watch(selectedCoin, () => {
  if (selectedApp.value) {
    mySetting.value = store.getters.getAppWithdrawSettingByAppCoin(selectedApp.value.App.ID, selectedCoin.value[0].ID as string)
    if (mySetting.value) {
      withdrawAutoReviewCoinAmount.value = mySetting.value.WithdrawAutoReviewCoinAmount
    }
  }
})

const onCreateAppWithdrawSetting = () => {
  if (selectedCoin.value.length > 0) {
    const setting = store.getters.getAppWithdrawSettingByAppCoin(selectedApp.value.App.ID, selectedCoin.value[0].ID as string)
    if (!setting) {
      store.dispatch(ApplicationActionTypes.CreateAppWithdrawSettingForOtherApp, {
        TargetAppID: selectedApp.value.App.ID,
        Info: {
          CoinTypeID: selectedCoin.value[0].ID as string,
          WithdrawAutoReviewCoinAmount: withdrawAutoReviewCoinAmount.value
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_APP_WITHDRAW_SETTING_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    } else {
      store.dispatch(ApplicationActionTypes.UpdateAppWithdrawSetting, {
        Info: {
          ID: setting.ID,
          AppID: setting.AppID,
          CoinTypeID: selectedCoin.value[0].ID as string,
          WithdrawAutoReviewCoinAmount: withdrawAutoReviewCoinAmount.value
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_APP_WITHDRAW_SETTING_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }
  }
}

const onRecommendUpdate = (recommend: Recommend) => {
  // TODO: fileter the list
  console.log('update', recommend)
}

const onRecommendSubmit = (recommend: Recommend) => {
  modifying.value = false

  let action = ApplicationActionTypes.CreateRecommendForOtherApp
  if (updating.value) {
    action = ApplicationActionTypes.UpdateRecommend
  }

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: recommend,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_RECOMMEND_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onPromotionUpdate = (promotion: AppGoodPromotion) => {
  // TODO: fileter the list
  console.log('update', promotion)
}

const onPromotionSubmit = (promotion: AppGoodPromotion) => {
  modifying.value = false

  let action = ApplicationActionTypes.CreateAppGoodPromotionForOtherApp
  if (updating.value) {
    action = ApplicationActionTypes.UpdateAppGoodPromotion
  }

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: promotion,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APP_GOOD_PROMOTION_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === ApplicationMutationTypes.SetSelectedAppID) {
      loading.value = true
      store.dispatch(ApplicationActionTypes.GetAppGoodsByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_APP_GOODS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })

      store.dispatch(ApplicationActionTypes.GetRecommendsByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_RECOMMENDS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === ApplicationMutationTypes.SetAppGoods) {
      loading.value = false
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onMenuHide = () => {
  modifying.value = false
  adding.value = false
  updating.value = false
  addingType.value = AddingType.AddingNone

  selectedPromotion.value = undefined as unknown as AppGoodPromotion
  selectedRecommend.value = undefined as unknown as Recommend
}

</script>
