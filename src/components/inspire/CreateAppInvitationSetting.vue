<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_INVITATION_SETTING') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-input
        v-model='count'
        :label='$t("MSG_INVITATION_COUNT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='discount'
        :label='$t("MSG_DISCOUNT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='title'
        :label='$t("MSG_USER_TITLE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='badgeLarge'
        :label='$t("MSG_BADGE_LARGE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='badgeSmall'
        :label='$t("MSG_BADGE_SMALL")'
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
import { AppInvitationSetting } from 'src/store/inspire/types'

interface Props {
  selectedApp?: Application
  editSetting?: AppInvitationSetting
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editSetting = toRef(props, 'editSetting')

const editCount = computed(() => {
  return editSetting.value ? editSetting.value.Count : 0
})
const count = ref(editCount.value)

const editDiscount = computed(() => {
  return editSetting.value ? editSetting.value.Discount : 1
})
const discount = ref(editDiscount.value)

const editTitle = computed(() => {
  return editSetting.value ? editSetting.value.Title : 'NOT SET'
})
const title = ref(editTitle.value)

const editBadgeLarge = computed(() => {
  return editSetting.value ? editSetting.value.BadgeLarge : 'NOT SET'
})
const badgeLarge = ref(editBadgeLarge.value)

const editBadgeSmall = computed(() => {
  return editSetting.value ? editSetting.value.BadgeSmall : 'NOT SET'
})
const badgeSmall = ref(editBadgeSmall.value)

const editID = computed(() => {
  return editSetting.value ? editSetting.value.ID : undefined
})
const id = ref(editID.value)

const setting = computed(() => {
  return {
    ID: id.value as string,
    AppID: selectedApp.value?.App.ID,
    Count: count.value,
    Discount: discount.value,
    Title: title.value,
    BadgeLarge: badgeLarge.value,
    BadgeSmall: badgeSmall.value
  } as AppInvitationSetting
})

watch(setting, () => {
  emit('update', setting.value)
})

const emit = defineEmits<{(e: 'submit', info: AppInvitationSetting): void,
  (e: 'update', info: AppInvitationSetting): void
}>()

const onSubmit = () => {
  emit('submit', setting.value)
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
