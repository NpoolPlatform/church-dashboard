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
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
  >
    <CreateAppRecommendGood v-model:selected-app='selectedApp' @update='onUpdate' @submit='onSubmit' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, onUnmounted } from 'vue'
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
import { AppGood, Recommend } from 'src/store/applications/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppRecommendGood = defineAsyncComponent(() => import('src/components/application/CreateAppRecommendGood.vue'))

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
    goods.push(good.Good.Good)
  })
  return goods
})
const appGoods = computed(() => store.getters.getAppGoodsByAppID(selectedAppID.value))
const selectedGoods = ref([] as Array<GoodBase>)
const selectedAppGoods = ref([] as Array<AppGood>)
const recommends = computed(() => store.getters.getRecommendsByAppID(selectedAppID.value))

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

const modifying = ref(false)

const onAddRecommend = () => {
  modifying.value = true
}

const onUpdate = (recommend: Recommend) => {
  // TODO: fileter the list
  console.log('update', recommend)
}

const onSubmit = (recommend: Recommend) => {
  modifying.value = false
  store.dispatch(ApplicationActionTypes.CreateRecommendForOtherApp, {
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

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
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

</script>
