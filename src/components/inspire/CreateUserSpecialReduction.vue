<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_USER_SPECIAL_REDUCTION') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-input
        v-model='startTime'
        :label='$t("MSG_START_TIME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='durationDays'
        :label='$t("MSG_DURATION_DAYS")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='amount'
        :label='$t("MSG_AMOUNT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='message'
        :label='$t("MSG_MESSAGE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
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
import { UserSpecialReduction } from 'src/store/inspire/types'
import { useStore } from 'src/store'

interface Props {
  selectedApp?: Application
  editUserSpecialReduction?: UserSpecialReduction
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editUserSpecialReduction = toRef(props, 'editUserSpecialReduction')

const editAmount = computed(() => {
  return editUserSpecialReduction.value ? editUserSpecialReduction.value.Amount : 10
})
const amount = ref(editAmount.value)

const editStart = computed(() => {
  return editUserSpecialReduction.value ? editUserSpecialReduction.value.Start : (new Date().getTime() / 1000 + 24 * 60 * 60).toFixed(0)
})
const startTime = ref(editStart.value)

const editDurationDays = computed(() => {
  return editUserSpecialReduction.value ? editUserSpecialReduction.value.DurationDays : 60
})
const durationDays = ref(editDurationDays.value)

const editMessage = computed(() => {
  return editUserSpecialReduction.value ? editUserSpecialReduction.value.Message : ''
})
const message = ref(editMessage.value)

const editDiscountPoolID = computed(() => {
  return editUserSpecialReduction.value ? editUserSpecialReduction.value.ID : undefined
})
const id = ref(editDiscountPoolID.value)

const store = useStore()
const userID = computed(() => store.getters.getLoginedUser.User?.ID)

const userSpecialReduction = computed(() => {
  return {
    ID: id.value as string,
    AppID: selectedApp.value?.App.ID,
    ReleaseByUserID: userID.value,
    Message: message.value,
    Start: startTime.value,
    DurationDays: durationDays.value,
    Amount: amount.value
  } as UserSpecialReduction
})

watch(userSpecialReduction, () => {
  emit('update', userSpecialReduction.value)
})

const emit = defineEmits<{(e: 'submit', info: UserSpecialReduction): void,
  (e: 'update', info: UserSpecialReduction): void
}>()

const onSubmit = () => {
  emit('submit', userSpecialReduction.value)
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
