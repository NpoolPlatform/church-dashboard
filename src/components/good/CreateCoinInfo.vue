<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_COININFO') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='name'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='unit'
        :label='$t("MSG_UNIT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='logo'
        :label='$t("MSG_LOGO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='reservedAmount'
        type='number'
        :label='$t("MSG_RESERVED_AMOUNT")'
        :rules='[(val: number) => val > 0 || $t("MSG_WARN_MUST_POSITIVE")]'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='presale'
        :label='$t("MSG_COIN_PRESALE_WARN")'
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

const coinName = computed(() => editCoin.value?.Name)
const name = ref(coinName.value)

const coinUnit = computed(() => editCoin.value?.Unit)
const unit = ref(coinUnit.value)

const coinLogo = computed(() => editCoin.value?.Logo)
const logo = ref(coinLogo.value)

const coinPresale = computed(() => editCoin.value?.PreSale ? editCoin.value?.PreSale : true)
const presale = ref(coinPresale.value)

const coinReservedAmount = computed(() => editCoin.value?.ReservedAmount)
const reservedAmount = ref(coinReservedAmount.value)

const coin = computed(() => {
  return {
    ID: editCoin.value?.ID,
    Name: name.value,
    Unit: unit.value,
    Logo: logo.value,
    PreSale: presale.value,
    ReservedAmount: reservedAmount.value,
    ENV: editCoin.value?.ENV
  } as Coin
})

const emit = defineEmits<{(e: 'submit', info: Coin): void,
  (e: 'update', info: Coin): void
}>()

const onSubmit = () => {
  emit('submit', coin.value)
}

watch(coin.value, function () {
  emit('update', coin.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
