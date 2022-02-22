<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='activities'
    @row-click='(evt, row, index) => onRowClick(row as Activity)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateActivityClick'>
          {{ $t('MSG_CREATE_ACTIVITY') }}
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
    <CreateActivity
      v-model:edit-activity='selectedActivity'
      v-model:selected-app='selectedApp'
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { Activity } from 'src/store/inspire/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateActivity = defineAsyncComponent(() => import('src/components/inspire/CreateActivity.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const selectedAppID = computed({
  get: () => store.getters.getInspireSelectedAppID,
  set: (val) => {
    store.commit(InspireMutationTypes.SetInspireSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))
const activities = computed(() => store.getters.getActivitiesByAppID(selectedAppID.value))

const selectedActivity = ref()

const onRowClick = (row: Activity) => {
  selectedActivity.value = row
  updating.value = true
  modifying.value = true
}

const onCreateActivityClick = () => {
  selectedActivity.value = undefined
  adding.value = true
  modifying.value = true
}

const onUpdate = (activity: Activity) => {
  // TODO: fileter the list
  console.log('update', activity)
}

const onSubmit = (activity: Activity) => {
  let action = InspireActionTypes.CreateActivityForOtherApp
  if (updating.value) {
    action = InspireActionTypes.UpdateActivity
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: activity,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_ACTIVITY_FAIL'),
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
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetInspireSelectedAppID) {
      store.dispatch(InspireActionTypes.GetActivitiesByOtherApp, {
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
    }

    if (mutation.type === InspireMutationTypes.SetActivities) {
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
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>
