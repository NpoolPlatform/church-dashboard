<template>
  <div class='row good-tools'>
    <q-space />
    <GoodTools
      @create-device='onCreateDeviceClick'
      @create-good='onCreateGoodClick'
      @create-vendor-location='onCreateVendorLocationClick'
      @create-fee-type='onCreateFeeTypeClick'
      @create-coininfo='onCreateCoinInfoClick'
    />
  </div>
  <q-table
    :title='$t("MSG_DEVICE")' flat dense :rows='filterDevices'
    @row-click='(evt, row, index) => onDeviceClick(row as DeviceInfo)'
  />
  <q-table
    :title='$t("MSG_VENDOR_LOCATION")' flat dense :rows='filterVendorLocations'
    @row-click='(evt, row, index) => onVendorLocationClick(row as VendorLocation)'
  />
  <q-table
    :title='$t("MSG_COIN")' flat dense :rows='allCoins'
    @row-click='(evt, row, index) => onCoinClick(row as Coin)'
  />
  <q-table :title='$t("MSG_FEE_TYPE")' flat dense :rows='filterFeeTypes' />
  <q-table :title='$t("MSG_GOOD")' flat dense :rows='filterGoods' />
  <q-table :title='$t("MSG_PRICE_CURRENCY")' flat dense :rows='filterPriceCurrencys' />
  <q-dialog
    v-model='adding'
    position='right'
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateGoodMenu
      v-if='addingType === AddingType.AddingGood'
      v-model:devices='allDevices'
      v-model:vendor-locations='allVendorLocations'
      v-model:coins='allCoins'
      v-model:fee-types='selectedFeeTypes'
      v-model:price-currencys='allPriceCurrencys'
      v-model:input-title='inputGoodTitle'
      v-model:input-actuals='inputGoodActuals'
      v-model:input-benefit-type='inputGoodBenefitType'
      v-model:input-classic='inputGoodClassic'
      v-model:input-total='inputGoodTotal'
      v-model:input-duration-days='inputGoodDurationDays'
      v-model:input-separate-fee='inputGoodSeparateFee'
      v-model:input-price='inputGoodPrice'
      v-model:input-coin-type='inputGoodCoinType'
      v-model:input-unit-power='inputGoodUnitPower'
      class='add-menu'
      @submit='onCreateGoodSubmit'
    />
    <CreateDeviceMenu
      v-if='addingType === AddingType.AddingDevice'
      v-model:edit-device='selectedDevice'
      class='add-menu'
      @update='onUpdateDevice'
      @submit='onCreateDeviceSubmit'
    />
    <CreateVendorLocationMenu
      v-if='addingType === AddingType.AddingVendorLocation'
      v-model:edit-vendor-location='selectedVendorLocation'
      class='add-menu'
      @update='onUpdateVendorLocation'
      @submit='onCreateVendorLocationSubmit'
    />
    <CreateFeeTypeMenu
      v-if='addingType === AddingType.AddingFeeType'
      v-model:input-fee-type='inputFeeType'
      v-model:input-fee-description='inputFeeDescription'
      v-model:input-pay-type='inputPayType'
      class='add-menu'
      @submit='onCreateFeeTypeSubmit'
    />
    <CreateCoinInfo
      v-if='addingType === AddingType.AddingCoinInfo'
      v-model:edit-coin='selectedCoin'
      class='add-menu'
      @update='onUpdateCoinInfo'
      @submit='onCreateCoinInfoSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, defineAsyncComponent, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { useI18n } from 'vue-i18n'
import { DeviceInfo, FeeType, Good, GoodBase, VendorLocation } from 'src/store/goods/types'
import { FunctionVoid } from 'src/types/types'
import { Coin, CreateCoinRequest, UpdateCoinRequest } from 'src/store/coins/types'

const CreateGoodMenu = defineAsyncComponent(() => import('src/components/good/CreateGoodMenu.vue'))
const CreateDeviceMenu = defineAsyncComponent(() => import('src/components/good/CreateDeviceMenu.vue'))
const CreateVendorLocationMenu = defineAsyncComponent(() => import('src/components/good/CreateVendorLocationMenu.vue'))
const CreateFeeTypeMenu = defineAsyncComponent(() => import('src/components/good/CreateFeeTypeMenu.vue'))
const CreateCoinInfo = defineAsyncComponent(() => import('src/components/good/CreateCoinInfo.vue'))
const GoodTools = defineAsyncComponent(() => import('src/components/good/GoodTools.vue'))

enum AddingType {
  AddingNone = 'none',
  AddingDevice = 'device',
  AddingVendorLocation = 'vendor-location',
  AddingGood = 'good',
  AddingFeeType = 'fee-type',
  AddingFee = 'fee',
  AddingCoinInfo = 'coininfo'
}

const addingType = ref(AddingType.AddingNone)
const adding = ref(false)

const inputFeeType = ref('')
const inputFeeDescription = ref('')
const inputPayType = ref('')

const inputGoodTitle = ref('')
const inputGoodActuals = ref(true)
const inputGoodBenefitType = ref('')
const inputGoodClassic = ref(true)
const inputGoodTotal = ref(0)
const inputGoodDurationDays = ref(360)
const inputGoodSeparateFee = ref(true)
const inputGoodPrice = ref(0)
const inputGoodCoinType = ref('')
const inputGoodUnitPower = ref(1)

const store = useStore()

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push({
      ID: good.Good.ID,
      SeparateFee: good.Good.SeparateFee,
      UnitPower: good.Good.UnitPower,
      DurationDays: good.Good.DurationDays,
      Actuals: good.Good.Actuals,
      DeliveryAt: good.Good.DeliveryAt,
      Price: good.Good.Price,
      BenefitType: good.Good.BenefitType,
      Classic: good.Good.Classic,
      Title: good.Good.Title,
      Total: good.Good.Total,
      Unit: good.Good.Unit
    })
  })
  return goods
})
const filterGoods = computed(() => allGoods.value)

const allVendorLocations = computed(() => store.getters.getAllVendorLocations)
const selectedVendorLocation = ref()
const filterVendorLocations = computed(() => {
  return addingType.value !== AddingType.AddingNone && selectedVendorLocation.value ? allVendorLocations.value.filter((loc) => {
    const vLoc = selectedVendorLocation.value as VendorLocation
    return loc.Address.toLowerCase().includes(vLoc.Address.toLowerCase()) &&
      loc.City.toLowerCase().includes(vLoc.City.toLowerCase()) &&
      loc.Country.toLowerCase().includes(vLoc.Country.toLowerCase()) &&
      loc.Province.toLowerCase().includes(vLoc.Province.toLowerCase())
  }) : allVendorLocations.value
})
const onVendorLocationClick = (vendorLocation: VendorLocation) => {
  selectedVendorLocation.value = vendorLocation
  addingType.value = AddingType.AddingVendorLocation
}

const allDevices = computed(() => store.getters.getAllDevices)
const selectedDevice = ref()
const filterDevices = computed(() => {
  return addingType.value !== AddingType.AddingNone && selectedDevice.value ? allDevices.value.filter((dev) => {
    const device = selectedDevice.value as DeviceInfo
    return dev.Type.toLowerCase().includes(device.Type.toLowerCase())
  }) : allDevices.value
})
const onDeviceClick = (device: DeviceInfo) => {
  selectedDevice.value = device
  addingType.value = AddingType.AddingDevice
}

const allCoins = computed(() => store.getters.getCoins)
const selectedCoin = ref()
const onCoinClick = (coin: Coin) => {
  selectedCoin.value = coin
  addingType.value = AddingType.AddingCoinInfo
}

const allFeeTypes = computed(() => store.getters.getAllFeeTypes)
const filterFeeTypes = computed(() => {
  return allFeeTypes.value
})
const selectedFeeTypes = ref(allFeeTypes.value)

const allPriceCurrencys = computed(() => store.getters.getAllPriceCurrencys)
const filterPriceCurrencys = computed(() => {
  return allPriceCurrencys.value
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
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

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleGoods)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

watch(addingType, (val) => {
  adding.value = val !== AddingType.AddingNone
})

const onCreateDeviceClick = () => {
  addingType.value = AddingType.AddingDevice
}

const onCreateGoodClick = () => {
  addingType.value = AddingType.AddingGood
}

const onCreateVendorLocationClick = () => {
  addingType.value = AddingType.AddingVendorLocation
}

const onCreateFeeTypeClick = () => {
  addingType.value = AddingType.AddingFeeType
}

const onCreateCoinInfoClick = () => {
  addingType.value = AddingType.AddingCoinInfo
}

const onUpdateDevice = (device: DeviceInfo) => {
  selectedDevice.value = device
}

const onCreateDeviceSubmit = (device: DeviceInfo) => {
  addingType.value = AddingType.AddingNone
  let action = GoodActionTypes.CreateDevice
  if (device.ID && device.ID.length > 0) {
    action = GoodActionTypes.UpdateDevice
  }

  store.dispatch(action, {
    Info: device,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_DEVICE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateVendorLocation = (vendorLication: VendorLocation) => {
  selectedVendorLocation.value = vendorLication
}

const onCreateVendorLocationSubmit = (vendorLocation: VendorLocation) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateVendorLocation, {
    Info: vendorLocation,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_DEVICE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onCreateFeeTypeSubmit = (feeType: FeeType) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateFeeType, {
    Info: feeType,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_FEE_TYPE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  inputFeeType.value = ''
  inputFeeDescription.value = ''
  inputPayType.value = ''
}

const onUpdateCoinInfo = (coin: Coin) => {
  console.log('update', coin)
}

const onCreateCoinInfoSubmit = (coin: Coin) => {
  addingType.value = AddingType.AddingNone

  if (coin.ID && coin.ID.length > 0) {
    const req = {
      ID: coin.ID,
      PreSale: coin.PreSale,
      Logo: coin.Logo,
      ReservedAmount: coin.ReservedAmount
    } as UpdateCoinRequest
    req.Message = {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_COIN_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
    store.dispatch(CoinActionTypes.UpdateCoin, req)
  } else {
    const req = coin as CreateCoinRequest
    req.Message = {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_COIN_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
    store.dispatch(CoinActionTypes.CreateCoin, req)
  }
}

const onCreateGoodSubmit = (good: Good) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateGood, {
    Info: good,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_GOOD_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  inputGoodTitle.value = ''
  inputGoodActuals.value = true
  inputGoodBenefitType.value = ''
  inputGoodClassic.value = true
  inputGoodTotal.value = 0
  inputGoodDurationDays.value = 360
  inputGoodSeparateFee.value = true
  inputGoodPrice.value = 0
  inputGoodCoinType.value = ''
  inputGoodUnitPower.value = 1
}

const onMenuHide = () => {
  addingType.value = AddingType.AddingNone
}

</script>

<style lang='sass' scoped>
.good-tools
  margin-right: 8px

.add-menu
  width: 400px
  padding: 0 24px 24px 24px
</style>
