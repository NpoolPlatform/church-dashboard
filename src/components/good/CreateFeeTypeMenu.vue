<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_FEE_TYPE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myFeeType'
        :label='$t("MSG_FEE_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myFeeDescription'
        :label='$t("MSG_FEE_TYPE_DESCRIPTION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <div>
        <q-btn-toggle
          v-model='myPayType'
          no-caps
          rounded
          unelevated
          class='toggle-btn'
          :options='payTypes'
        />
      </div>
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
import { ref, defineEmits, watch, defineProps, toRef, computed } from 'vue'
import { FeeType } from 'src/store/goods/types'
import { useI18n } from 'vue-i18n'

interface Props {
  editFeeType?: FeeType
}

const props = defineProps<Props>()
const editFeeType = toRef(props, 'editFeeType')

const myFeeType = ref(editFeeType.value?.FeeType)
const myFeeDescription = ref(editFeeType.value?.FeeType)
const myPayType = ref(editFeeType.value?.PayType)

const feeType = computed(() => {
  return {
    ID: editFeeType.value?.ID,
    FeeType: myFeeType.value,
    FeeDescription: myFeeDescription.value,
    PayType: myPayType.value
  } as FeeType
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const payTypes = [
  {
    label: t('MSG_PAY_TYPE_AMOUNT'),
    value: 'amount'
  }, {
    label: t('MSG_PAY_TYPE_PERCENT'),
    value: 'percent'
  }
]

const emit = defineEmits<{(e: 'submit', info: FeeType): void,
  (e: 'update', info: FeeType): void
}>()

const onSubmit = () => {
  emit('submit', feeType.value)
}

watch(feeType, () => {
  emit('update', feeType.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white

.toggle-btn
  border: 1px solid #027be3
</style>
