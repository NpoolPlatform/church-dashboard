<template>
  <q-table
    v-model:selected='selectedUsers'
    flat
    dense
    :loading='loading'
    :rows='myUsers'
    selection='multiple'
    row-key='ID'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='couponPools'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateCouponPool' />
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
    <CreateCouponPool
      v-model:edit-coupon-pool='selectedCoupon'
      v-model:selected-app='selectedApp'
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { AppUser } from 'src/store/user-helper/types'
import { CouponPool } from 'src/store/inspire/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateCouponPool = defineAsyncComponent(() => import('src/components/inspire/CreateCouponPool.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const selectedCoupon = ref(undefined as unknown as CouponPool)

const users = computed(() => store.getters.getAppUserInfosByAppID(selectedAppID.value))
const myUsers = computed(() => {
  const allUsers = [] as Array<AppUser>
  if (users.value) {
    users.value.forEach((user) => {
      allUsers.push(user.User as AppUser)
    })
  }
  return allUsers
})
const couponPools = computed(() => store.getters.getCouponPoolsByAppID(selectedAppID.value))

const loading = ref(false)
const selectedUsers = ref([] as Array<AppUser>)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfosByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetCouponPoolsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_ACTIVITIES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const onCreateCouponPool = () => {
  adding.value = true
  modifying.value = true
}

const onUpdate = (couponPool: CouponPool) => {
  // TODO: fileter the list
  console.log('update', couponPool)
}

const onSubmit = (couponPool: CouponPool) => {
  let action = InspireActionTypes.CreateCouponPoolForOtherApp
  if (updating.value) {
    action = InspireActionTypes.UpdateCouponPool
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: couponPool,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_COUPON_POOL_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetCouponPools) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>
