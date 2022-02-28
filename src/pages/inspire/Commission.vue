<template>
  <ApplicationSelector v-model:selected-app-id='selectedAppID' />
  <q-table
    v-model:selected='selectedUser'
    flat
    dense
    :rows='myUsers ? myUsers : []'
    selection='single'
    row-key='ID'
  />
  <q-table
    flat
    dense
    :rows='appCommissionSetting ? [appCommissionSetting] : []'
    :title='t("MSG_APP_COMMISSION_SETTING")'
  >
    <template v-if='!appCommissionSetting' #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateAppCommissionSetting' />
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedAppInvitationSetting'
    flat
    dense
    :rows='appInvitationSettings ? appInvitationSettings : []'
    selection='single'
    row-key='ID'
  />
  <q-table
    v-model:selected='selectedAppPurchaseAmountSetting'
    flat
    dense
    :rows='appPurchaseAmountSettings ? appPurchaseAmountSettings : []'
    selection='single'
    row-key='ID'
  />
  <q-table
    v-model:selected='selectedAppUserInvitationSetting'
    flat
    dense
    :rows='appUserInvitationSettings ? appUserInvitationSettings : []'
    selection='single'
    row-key='ID'
  />
  <q-table
    v-model:selected='selectedAppUserPurchaseAmountSetting'
    flat
    dense
    :rows='appUserPurchaseAmountSettings ? appUserPurchaseAmountSettings : []'
    selection='single'
    row-key='ID'
  />
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateAppCommissionSetting
      v-if='addingType === AddingType.AddingAppCommissionSetting'
      v-model:edit-setting='appCommissionSetting'
      v-model:selected-app='selectedApp'
      @update='onUpdateAppCommissionSetting'
      @submit='onSubmitAppCommissionSetting'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, watch, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import {
  AppCommissionSetting,
  AppInvitationSetting,
  AppPurchaseAmountSetting,
  AppUserInvitationSetting,
  AppUserPurchaseAmountSetting
} from 'src/store/inspire/types'
import { AppUser } from 'src/store/user-helper/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppCommissionSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppCommissionSetting.vue'))
// const CreateAppInvitationSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppInvitationSetting.vue'))
// const CreateAppPurchaseAmountSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppPurchaseAmountSetting.vue'))
// const CreateAppUserInvitationSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppUserInvitationSetting.vue'))
// const CreateAppUserPurchaseAmountSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppUserPurchaseAmountSetting.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getInspireSelectedAppID,
  set: (val) => {
    store.commit(InspireMutationTypes.SetInspireSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const selectedAppInvitationSetting = ref([] as Array<AppInvitationSetting>)
const selectedAppPurchaseAmountSetting = ref([] as Array<AppPurchaseAmountSetting>)
const selectedAppUserInvitationSetting = ref([] as Array<AppUserInvitationSetting>)
const selectedAppUserPurchaseAmountSetting = ref([] as Array<AppUserPurchaseAmountSetting>)

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
const selectedUser = ref([] as Array<AppUser>)
const selectedUserID = computed(() => {
  if (selectedUser.value.length > 0) {
    return selectedUser.value[0].ID
  }
  return undefined
})

const appCommissionSetting = computed(() => store.getters.getAppCommissionSettingByAppID(selectedAppID.value))
const appInvitationSettings = computed(() => store.getters.getAppInvitationSettingsByAppID(selectedAppID.value))
const appPurchaseAmountSettings = computed(() => store.getters.getAppPurchaseAmountSettingsByAppID(selectedAppID.value))
const appUserInvitationSettings = computed(() => store.getters.getAppUserInvitationSettingsByAppUser(selectedAppID.value, selectedUserID.value as string))
const appUserPurchaseAmountSettings = computed(() => store.getters.getAppUserPurchaseAmountSettingsByAppUser(selectedAppID.value, selectedUserID.value as string))

const loading = ref(false)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfosByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppCommissionSettingByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_COMMISSION_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppInvitationSettingsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_INVITATION_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppPurchaseAmountSettingsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_PURCHASE_AMOUNT_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppUserInvitationSettingsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_USER_INVITATION_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppUserPurchaseAmountSettingsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_USER_PURCHASE_AMOUNT_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetAppInvitationSettings) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

enum AddingType {
  AddingNone = 'none',
  AddingAppCommissionSetting = 'app-commission-setting'
}
const addingType = ref(AddingType.AddingNone)

const onCreateAppCommissionSetting = () => {
  addingType.value = AddingType.AddingAppCommissionSetting
  adding.value = true
  modifying.value = true
}

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
  addingType.value = AddingType.AddingNone
}

const onUpdateAppCommissionSetting = (setting: AppCommissionSetting) => {
  console.log(setting)
}

const onSubmitAppCommissionSetting = (setting: AppCommissionSetting) => {
  let action = InspireActionTypes.CreateAppCommissionSettingForOtherApp
  if (updating.value) {
    action = InspireActionTypes.UpdateAppCommissionSetting
  }

  store.dispatch(action, {
    TargetAppID: selectedAppID.value,
    Info: setting,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_CREATE_APP_COMMISSION_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  onMenuHide()
}

</script>
