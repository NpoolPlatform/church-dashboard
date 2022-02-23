<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_ACTIVITY') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-input
        v-model='activityName'
        :label='$t("MSG_ACTIVITY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='startTime'
        :label='$t("MSG_START_TIME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='endTime'
        :label='$t("MSG_END_TIME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='systemActivity' :label='$t("MSG_SYSTEM_ACTIVITY")' dense
      />
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { defineProps, toRef, computed, defineEmits, watch, ref } from 'vue'
import { Application } from 'src/store/applications/types'
import { Activity } from 'src/store/inspire/types'
import { useStore } from 'src/store'

interface Props {
  selectedApp?: Application
  editActivity?: Activity
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editActivity = toRef(props, 'editActivity')

const editActivityName = computed(() => {
  return editActivity.value ? editActivity.value.Name : ''
})
const activityName = ref(editActivityName.value)

const editActivityStart = computed(() => {
  return editActivity.value ? editActivity.value.Start : (new Date().getTime() / 1000 + 24 * 60 * 60).toFixed(0)
})
const startTime = ref(editActivityStart.value)

const editActivityEnd = computed(() => {
  return editActivity.value ? editActivity.value.End : (new Date().getTime() / 1000 + 60 * 24 * 60 * 60).toFixed(0)
})
const endTime = ref(editActivityEnd.value)

const editActivitySystem = computed(() => {
  return editActivity.value && editActivity.value.SystemActivity ? editActivity.value.SystemActivity : false
})
const systemActivity = ref(editActivitySystem.value)

const editActivityID = computed(() => {
  return editActivity.value ? editActivity.value.ID : undefined
})
const id = ref(editActivityID.value)

const store = useStore()
const userID = computed(() => store.getters.getLoginedUser.User?.ID)

const activity = computed(() => {
  return {
    ID: id.value as string,
    AppID: selectedApp.value?.App.ID,
    CreatedBy: userID.value,
    Name: activityName.value,
    Start: startTime.value,
    End: endTime.value,
    SystemActivity: systemActivity.value
  } as Activity
})

watch(activity, () => {
  emit('update', activity.value)
})

const emit = defineEmits<{(e: 'submit', info: Activity): void,
  (e: 'update', info: Activity): void
}>()

const onSubmit = () => {
  emit('submit', activity.value)
}

</script>

<style lang='sass' scoped>
.container
  padding: 24px
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
