<template>
  <q-table
    flat
    dense
    :rows='languages'
  />
  <q-table
    v-model:selected='selectedLang'
    flat
    dense
    :loading='loading'
    :rows='appLanguages'
    selection='single'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onAddAppLanguage'>
          {{ $t('MSG_ADD_LANGUAGE') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='messages'
    @row-click='(evt, row, index) => onMessageClick(row as LangMessage)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateMessage'>
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
  >
    <CreateAppLanguage
      v-if='addingType === AddingType.AddingAppLang'
      v-model:selected-app='selectedApp'
      @update='onUpdateAppLanguage'
      @submit='onSubmitAppLanguage'
    />
    <CreateAppMessage
      v-if='addingType === AddingType.AddingMessage'
      v-model:selected-app='selectedApp'
      v-model:edit-message='editMessage'
      @update='onUpdateMessage'
      @submit='onSubmitMessage'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { ActionTypes as LangActionTypes } from 'src/store/languages/action-types'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'
import { AppLanguage, Language, Message as LangMessage } from 'src/store/languages/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppLanguage = defineAsyncComponent(() => import('src/components/application/CreateAppLanguage.vue'))
const CreateAppMessage = defineAsyncComponent(() => import('src/components/application/CreateAppMessage.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)

enum AddingType {
  AddingAppLang = 'app-lang',
  AddingMessage = 'message',
  AddingNone = 'none'
}

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)
const addingType = ref(AddingType.AddingNone)

const selectedAppID = computed({
  get: () => store.getters.getAppEmailTemplateSelectedAppID,
  set: (val) => {
    store.commit(LangMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const languages = computed(() => store.getters.getLanguages)
const selectedLang = ref([] as Array<Language>)

const appLanguages = computed(() => store.getters.getAppLangInfosByApp(selectedAppID.value))
const messages = computed(() => store.getters.getMessagesByApp(selectedAppID.value))

const onAddAppLanguage = () => {
  modifying.value = true
  adding.value = true
  addingType.value = AddingType.AddingAppLang
}

const onCreateMessage = () => {
  modifying.value = true
  adding.value = true
  addingType.value = AddingType.AddingMessage
}

const editMessage = ref(undefined as unknown as LangMessage)
const onMessageClick = (message: LangMessage) => {
  updating.value = true
  modifying.value = true
  editMessage.value = message
}

const onUpdateAppLanguage = (appLanguage: AppLanguage) => {
  // TODO: fileter the list
  console.log('update', appLanguage)
}

const onSubmitAppLanguage = (appLanguage: AppLanguage) => {
  modifying.value = false
  store.dispatch(LangActionTypes.CreateAppLanguage, {
    TargetAppID: selectedApp.value.App.ID,
    Info: appLanguage,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APP_LANG_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateMessage = (message: LangMessage) => {
  // TODO: fileter the list
  console.log('update', message)
}

const onSubmitMessage = (message: LangMessage) => {
  modifying.value = false
  store.dispatch(LangActionTypes.CreateMessageForOtherApp, {
    TargetAppID: selectedApp.value.App.ID,
    Info: message,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APP_LANG_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

watch(selectedLang, () => {
  if (selectedLang.value.length > 0) {
    store.dispatch(LangActionTypes.GetMessagesByOtherAppLang, {
      TargetAppID: selectedAppID.value,
      LangID: selectedLang.value[0].ID,
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }
})

onMounted(() => {
  store.dispatch(LangActionTypes.GetLanguages, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_LANGUAGES_FAIL'),
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
    if (mutation.type === LangMutationTypes.SetSelectedAppID ||
      mutation.type === LangMutationTypes.SetAppLanguage) {
      loading.value = true
      store.dispatch(LangActionTypes.GetAppLangInfosByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === LangMutationTypes.SetAppLangInfos) {
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

</script>
