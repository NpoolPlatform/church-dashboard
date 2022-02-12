<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_COININFO') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='currencyName'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='currencyUnit'
        :label='$t("MSG_UNIT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='currencySymbol'
        :label='$t("MSG_LOGO")'
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
import { defineEmits, watch, computed, ref, toRef, defineProps } from 'vue'
import { PriceCurrency } from 'src/store/goods/types'

interface Props {
  editPriceCurrency?: PriceCurrency
}

const props = defineProps<Props>()
const editPriceCurrency = toRef(props, 'editPriceCurrency')

const currencyName = ref(editPriceCurrency.value?.Name)
const currencyUnit = ref(editPriceCurrency.value?.Unit)
const currencySymbol = ref(editPriceCurrency.value?.Symbol)

const currency = computed(() => {
  return {
    ID: editPriceCurrency.value?.ID,
    Name: currencyName.value,
    Unit: currencyUnit.value,
    Symbol: currencySymbol.value
  } as PriceCurrency
})

const emit = defineEmits<{(e: 'submit', info: PriceCurrency): void,
  (e: 'update', info: PriceCurrency): void
}>()

const onSubmit = () => {
  emit('submit', currency.value)
}

watch(currency, function () {
  emit('update', currency.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
