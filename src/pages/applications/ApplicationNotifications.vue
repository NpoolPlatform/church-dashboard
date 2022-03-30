<template>
  <q-table
    row-key='ID'
    flat
    dense
    :loading='loading'
    :rows='announcements'
    @row-click='(evt, row, index) => onAnnouncementClick(row as Announcement)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAnnouncement'>
          {{ $t('MSG_CREATE_ANNOUNCEMENT') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
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
    <CreateAnnouncement
      v-if='addingType === AddingType.AddingAnnouncement'
      v-model:selected-app='selectedApp'
      v-model:edit-announcement='editAnnouncement'
      @update='onUpdateAnnouncement'
      @submit='onSubmitAnnouncement'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { ActionTypes as MailboxActionTypes } from 'src/store/mailbox/action-types'
import { MutationTypes as MailboxMutationTypes } from 'src/store/mailbox/mutation-types'
import { Announcement } from 'src/store/mailbox/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAnnouncement = defineAsyncComponent(() => import('src/components/application/CreateAnnouncement.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)

enum AddingType {
  AddingAnnouncement = 'announcement',
  AddingNotification = 'notification',
  AddingMailbox = 'mailbox',
  AddingNone = 'none'
}

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)
const addingType = ref(AddingType.AddingNone)

const selectedAppID = computed({
  get: () => store.getters.getAppEmailTemplateSelectedAppID,
  set: (val) => {
    store.commit(MailboxMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const announcements = computed(() => store.getters.getAnnouncementsByApp(selectedAppID.value))

const onCreateAnnouncement = () => {
  modifying.value = true
  adding.value = true
  addingType.value = AddingType.AddingAnnouncement
}

const editAnnouncement = ref(undefined as unknown as Announcement)
const onAnnouncementClick = (announcement: Announcement) => {
  editAnnouncement.value = announcement
  updating.value = true
  modifying.value = true
  addingType.value = AddingType.AddingAnnouncement
}

const onUpdateAnnouncement = (announcement: Announcement) => {
  // TODO: fileter the list
  console.log('update', announcement)
}

const onSubmitAnnouncement = (announcement: Announcement) => {
  modifying.value = false

  let action = MailboxActionTypes.CreateAnnouncementForOtherApp
  if (updating.value) {
    action = MailboxActionTypes.UpdateAnnouncement
  }

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: announcement,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_ANNOUNCEMENT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === MailboxMutationTypes.SetSelectedAppID) {
      loading.value = true
      store.dispatch(MailboxActionTypes.GetAnnouncementsByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_ANNOUNCEMENTS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === MailboxMutationTypes.SetAnnouncements) {
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

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  addingType.value = AddingType.AddingNone

  editAnnouncement.value = undefined as unknown as Announcement
}

</script>
