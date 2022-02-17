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
    flat
    dense
    :loading='loading'
    :rows='appGoods'
    selection='multiple'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onAuthorizeGoods'>
          {{ $t('MSG_AUTHORIZE_GOOD') }}
        </q-btn>
        <q-btn dense @click='onUnauthorizeGoods'>
          {{ $t('MSG_UNAUTHORIZE_GOOD') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
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
import { AppGood } from 'src/store/applications/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

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

const onAuthorizeGoods = () => {
  selectedGoods.value.forEach((good) => {
    store.dispatch(ApplicationActionTypes.AuthorizeAppGoodForOtherApp, {
      TargetAppID: selectedAppID.value,
      Info: {
        GoodID: good.ID as string
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
