<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_GOOD') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myTitle'
        :label='$t("MSG_GOOD_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='deviceLabel'
        >
          <q-list>
            <q-item
              v-for='(device, index) in devices'
              :key='index'
              v-close-popup
              clickable
              @click='onDeviceItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ device.Type }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='vendorLocationLabel'
        >
          <q-list>
            <q-item
              v-for='(vendorLocation, index) in vendorLocations'
              :key='index'
              v-close-popup
              clickable
              @click='onVendorLocationItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ vendorLocationToLabel(vendorLocation) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='myCoinType'
        >
          <q-list>
            <q-item
              v-for='(coin, index) in coins'
              :key='index'
              v-close-popup
              clickable
              @click='onCoinItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ coin.Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='priceCurrencyType'
        >
          <q-list>
            <q-item
              v-for='(priceCurrency, index) in priceCurrencys'
              :key='index'
              v-close-popup
              clickable
              @click='onPriceCurrencyItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ priceCurrency.Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div>
        <q-select
          v-model='selectedFeeTypes'
          multiple
          emit-value
          :options='myFeeTypes'
          :label='t("MSG_FEE_TYPE")'
        />
      </div>
    </q-item-section>
    <q-item-section>
      <q-toggle
        v-model='myActuals' :label='$t("MSG_ACTUALS")' dense
      />
      <q-toggle
        v-model='mySeparateFee' :label='$t("MSG_SEPARATE_FEE")' dense
      />
      <q-toggle
        v-model='myClassic' :label='$t("MSG_MODE_CLASSIC")' dense
      />
      <div>
        <q-btn-toggle
          v-model='myBenefitType'
          no-caps
          rounded
          unelevated
          class='toggle-btn'
          :options='benefitTypes'
        />
      </div>
    </q-item-section>
    <q-item-section>
      <q-input
        v-model='myTotal'
        :label='$t("MSG_GOOD_TOTAL")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myUnitPower'
        :label='$t("MSG_GOOD_UNIT_POWER")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myPrice'
        :label='$t("MSG_GOOD_PRICE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myDurationDays'
        :label='$t("MSG_GOOD_DURATION_DAYS")'
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
import { DefaultID } from 'src/const/const'
import { FeeType, Good, VendorLocation } from 'src/store/goods/types'
import { defineProps, toRef, computed, ref, defineEmits, onBeforeMount, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { MutationTypes as GoodMutationTypes } from 'src/store/goods/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'

const store = useStore()

interface Props {
  editGood?: Good
}

const props = defineProps<Props>()
const editGood = toRef(props, 'editGood')

const devices = computed(() => store.getters.getAllDevices)
const vendorLocations = computed(() => store.getters.getAllVendorLocations)
const coins = computed(() => store.getters.getCoins)
const feeTypes = computed(() => store.getters.getAllFeeTypes)
const priceCurrencys = computed(() => store.getters.getAllPriceCurrencys)

const selectedCoinIndex = ref(0)
const myCoinType = computed(() => coins.value[selectedCoinIndex.value]?.Name)
const coinID = computed(() => coins.value[selectedCoinIndex.value]?.ID)

const selectedDeviceIndex = ref(0)
const deviceLabel = computed(() => devices.value[selectedDeviceIndex.value]?.Type)
const deviceID = computed(() => devices.value[selectedDeviceIndex.value]?.ID)

const selectedVendorLocationIndex = ref(0)
const vendorLocationLabel = computed(() =>
  vendorLocationToLabel(vendorLocations.value[selectedVendorLocationIndex.value])
)
const vendorLocationID = computed(() => vendorLocations.value[selectedVendorLocationIndex.value]?.ID)

const myTitle = ref(editGood.value?.Title)
const myActuals = ref(editGood.value?.Actuals)
const mySeparateFee = ref(editGood.value?.SeparateFee)
const myClassic = ref(editGood.value?.Classic)
const myTotal = ref(editGood.value?.Total)
const myPrice = ref(editGood.value?.Price)
const myDurationDays = ref(editGood.value?.DurationDays)
const myUnitPower = ref(editGood.value?.UnitPower)

const selectedPriceCurrencyIndex = ref(0)
const priceCurrencyType = computed(() => priceCurrencys.value[selectedPriceCurrencyIndex.value]?.Name)
const priceCurrencyID = computed(() => priceCurrencys.value[selectedPriceCurrencyIndex.value]?.ID)

const myDeliveryAt = ref(0)
const myUnit = ref(editGood.value?.Unit ? editGood.value?.Unit : 'TiB')

interface MyFeeType {
  label: string
  value: FeeType
}

const myFeeTypes = computed(() => {
  const localFeeTypes = [] as Array<MyFeeType>
  feeTypes.value.forEach((feeType) => {
    localFeeTypes.push({
      label: feeType.FeeType,
      value: feeType
    })
  })
  return localFeeTypes
})
const selectedFeeTypes = ref([])

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const benefitTypes = [
  {
    label: t('MSG_BENEFIT_TYPE_PLATFORM'),
    value: 'platform'
  }, {
    label: t('MSG_BENEFIT_TYPE_POOL'),
    value: 'pool'
  }
]
const myBenefitType = ref('platform')

const vendorLocationToLabel = (vendorLocation: VendorLocation) => {
  return vendorLocation?.Country + ' / ' +
    vendorLocation?.Province + ' / ' +
    vendorLocation?.City + ' / ' +
    vendorLocation?.Address
}

const emit = defineEmits<{(e: 'submit', good: Good): void,
  (e: 'update', good: Good): void
}>()

const good = computed(() => {
  return {
    ID: editGood.value?.ID,
    DeviceInfoID: deviceID.value as string,
    SeparateFee: mySeparateFee.value,
    UnitPower: myUnitPower.value,
    DurationDays: myDurationDays.value,
    CoinInfoID: coinID.value as string,
    Actuals: myActuals.value,
    DeliveryAt: myDeliveryAt.value,
    InheritFromGoodID: DefaultID,
    VendorLocationID: vendorLocationID.value as string,
    Price: myPrice.value,
    BenefitType: myBenefitType.value,
    Classic: myClassic.value,
    SupportCoinTypeIDs: editGood.value?.SupportCoinTypeIDs,
    Title: myTitle.value,
    Total: myTotal.value,
    Unit: myUnit.value,
    FeeIDs: editGood.value?.FeeIDs,
    PriceCurrency: priceCurrencyID.value as string
  } as Good
})

const onSubmit = () => {
  emit('submit', good.value)
}

watch(good, () => {
  emit('update', good.value)
})

const onDeviceItemClick = (index: number) => {
  selectedDeviceIndex.value = index
}

const onVendorLocationItemClick = (index: number) => {
  selectedVendorLocationIndex.value = index
}

const onCoinItemClick = (index: number) => {
  selectedCoinIndex.value = index
}

const onPriceCurrencyItemClick = (index: number) => {
  selectedPriceCurrencyIndex.value = index
}

const unsubscribe = ref<FunctionVoid>()

onBeforeMount(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === GoodMutationTypes.SetAllDevices) {
      store.dispatch(GoodActionTypes.GetAllVendorLocations, {
        Message: {
          ModuleKey: ModuleKey.ModuleGoods,
          Error: {
            Title: t('MSG_GET_ALL_VENDOR_LOCATIONS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === GoodMutationTypes.SetAllVendorLocations) {
      store.dispatch(GoodActionTypes.GetAllFeeTypes, {
        Message: {
          ModuleKey: ModuleKey.ModuleGoods,
          Error: {
            Title: t('MSG_GET_ALL_FEE_TYPES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === GoodMutationTypes.SetAllFeeTypes) {
      store.dispatch(GoodActionTypes.GetAllFees, {
        Message: {
          ModuleKey: ModuleKey.ModuleGoods,
          Error: {
            Title: t('MSG_GET_ALL_FEES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === GoodMutationTypes.SetAllFees) {
      store.dispatch(GoodActionTypes.GetAllPriceCurrencys, {
        Message: {
          ModuleKey: ModuleKey.ModuleGoods,
          Error: {
            Title: t('MSG_GET_ALL_PRICE_CURRENCYS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }
  })

  store.dispatch(GoodActionTypes.GetAllDevices, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_DEVICES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>

<style lang='sass' scoped>
.container
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white

.selector-icon
  padding: 10px 8px 10px 0px
  color: $grey-6

.toggle-btn
  border: 1px solid #027be3
</style>
