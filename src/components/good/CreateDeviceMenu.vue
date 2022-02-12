<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_DEVICE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myDeviceType'
        :label='$t("MSG_DEVICE_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='manufacturer'
        :label='$t("MSG_DEVICE_MANUFACTURER")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='consumption'
        :label='$t("MSG_DEVICE_CONSUMPTION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='shipmentAt'
        :label='$t("MSG_DEVICE_SHIPMENT_AT")'
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
import { DeviceInfo } from 'src/store/goods/types'

interface Props {
  editDevice?: DeviceInfo
}

const props = defineProps<Props>()

const editDevice = toRef(props, 'editDevice')
const myDeviceType = ref(editDevice.value?.Type)

const manufacturer = ref(editDevice.value?.Manufacturer)
const consumption = ref(editDevice.value?.Consumption)
const shipmentAt = ref(editDevice.value?.ShipmentAt)

const device = computed(() => {
  return {
    ID: editDevice.value?.ID,
    Manufacturer: manufacturer.value,
    Consumption: consumption.value,
    ShipmentAt: shipmentAt.value,
    Type: myDeviceType.value
  } as DeviceInfo
})

const emit = defineEmits<{(e: 'submit', info: DeviceInfo): void,
  (e: 'update', info: DeviceInfo): void
}>()

const onSubmit = () => {
  emit('submit', device.value)
}

watch(device, function () {
  emit('update', device.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
