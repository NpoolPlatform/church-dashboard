<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_COUPON_POOL') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-input
        v-model='myName'
        :label='$t("MSG_NAME")'
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
        v-model='durationDays'
        :label='$t("MSG_DURATION_DAYS")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='denomination'
        :label='$t("MSG_DENOMINATION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='circulation'
        :label='$t("MSG_CIRCULATION")'
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
import { CouponPool } from 'src/store/inspire/types'
import { useStore } from 'src/store'

interface Props {
  selectedApp?: Application
  editCouponPool?: CouponPool
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editCouponPool = toRef(props, 'editCouponPool')

const editDenomination = computed(() => {
  return editCouponPool.value ? editCouponPool.value.Denomination : 10
})
const denomination = ref(editDenomination.value)

const editCirculation = computed(() => {
  return editCouponPool.value ? editCouponPool.value.Circulation : 10
})
const circulation = ref(editCirculation.value)

const editStart = computed(() => {
  return editCouponPool.value ? editCouponPool.value.Start : (new Date().getTime() / 1000 + 24 * 60 * 60).toFixed(0)
})
const startTime = ref(editStart.value)

const editDurationDays = computed(() => {
  return editCouponPool.value ? editCouponPool.value.DurationDays : 60
})
const durationDays = ref(editDurationDays.value)

const editMessage = computed(() => {
  return editCouponPool.value ? editCouponPool.value.Message : ''
})
const message = ref(editMessage.value)

const editName = computed(() => {
  return editCouponPool.value ? editCouponPool.value.Name : ''
})
const myName = ref(editName.value)

const editCouponPoolID = computed(() => {
  return editCouponPool.value ? editCouponPool.value.ID : undefined
})
const id = ref(editCouponPoolID.value)

const store = useStore()
const userID = computed(() => store.getters.getLoginedUser.User?.ID)

const couponPool = computed(() => {
  return {
    ID: id.value as string,
    AppID: selectedApp.value?.App.ID,
    ReleaseByUserID: userID.value,
    Name: myName.value,
    Message: message.value,
    Start: startTime.value,
    DurationDays: durationDays.value,
    Denomination: denomination.value,
    Circulation: circulation.value
  } as CouponPool
})

watch(couponPool, () => {
  emit('update', couponPool.value)
})

const emit = defineEmits<{(e: 'submit', info: CouponPool): void,
  (e: 'update', info: CouponPool): void
}>()

const onSubmit = () => {
  emit('submit', couponPool.value)
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
