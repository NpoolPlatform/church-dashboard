<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_VENDOR_LOCATION') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myCountry'
        :label='$t("MSG_COUNTRY")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myProvince'
        :label='$t("MSG_PROVINCE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myCity'
        :label='$t("MSG_CITY")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myAddress'
        :label='$t("MSG_ADDRESS")'
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
import { ref, defineEmits, watch, defineProps, toRef, computed } from 'vue'
import { VendorLocation } from 'src/store/goods/types'

interface Props {
  editVendorLocation?: VendorLocation
}

const props = defineProps<Props>()
const editVendorLocation = toRef(props, 'editVendorLocation')

const myCountry = ref(editVendorLocation.value?.Country)
const myProvince = ref(editVendorLocation.value?.Province)
const myCity = ref(editVendorLocation.value?.City)
const myAddress = ref(editVendorLocation.value?.Address)

const location = computed(() => {
  return {
    ID: editVendorLocation.value?.ID,
    Country: myCountry.value,
    Province: myProvince.value,
    City: myCity.value,
    Address: myAddress.value
  } as VendorLocation
})

const emit = defineEmits<{(e: 'submit', info: VendorLocation): void,
  (e: 'update', info: VendorLocation): void
}>()

const onSubmit = () => {
  emit('submit', location.value)
}

watch(location, () => {
  emit('update', location.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
