<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_COININFO') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='coinName'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='coinUnit'
        :label='$t("MSG_UNIT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='coinLogo'
        :label='$t("MSG_LOGO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='coinReservedAmount'
        type='number'
        :label='$t("MSG_RESERVED_AMOUNT")'
        :rules='[(val: number) => val > 0 || $t("MSG_WARN_MUST_POSITIVE")]'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='coinPresale'
        :label='$t("MSG_COIN_PRESALE_WARN")'
      />
      <q-toggle
        v-model='coinForPay'
        :label='$t("MSG_COIN_FOR_PAY")'
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
import { defineEmits, watch, computed, ref, toRef, defineProps } from 'vue'
import { Coin } from 'src/store/coins/types'

interface Props {
  editCoin?: Coin
}

const props = defineProps<Props>()
const editCoin = toRef(props, 'editCoin')
const coinName = ref(editCoin.value?.Name)
const coinUnit = ref(editCoin.value?.Unit)
const coinLogo = ref(editCoin.value?.Logo)
const coinPresale = ref(editCoin.value?.PreSale)
const coinForPay = ref(editCoin.value?.ForPay)
const coinReservedAmount = ref(editCoin.value?.ReservedAmount)

const coin = computed(() => {
  return {
    ID: editCoin.value?.ID,
    Name: coinName.value,
    Unit: coinUnit.value,
    Logo: coinLogo.value,
    PreSale: coinPresale.value,
    ForPay: coinForPay.value,
    ReservedAmount: coinReservedAmount.value,
    ENV: editCoin.value?.ENV
  } as Coin
})

const emit = defineEmits<{(e: 'submit', info: Coin): void,
  (e: 'update', info: Coin): void
}>()

const onSubmit = () => {
  emit('submit', coin.value)
}

watch(coin, function () {
  emit('update', coin.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
