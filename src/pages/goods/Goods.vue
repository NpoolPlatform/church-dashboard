<template>
  <div class='row good-tools'>
    <q-space />
    <GoodTools
      @create-device='onCreateDeviceClick'
      @create-good='onCreateGoodClick'
      @create-vendor-location='onCreateVendorLocationClick'
      @create-fee-type='onCreateFeeTypeClick'
      @create-coininfo='onCreateCoinInfoClick'
      @create-price-currency='onCreatePriceCurrencyClick'
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
    :title='$t("MSG_COIN")' flat dense :rows='filterCoins'
    @row-click='(evt, row, index) => onCoinClick(row as Coin)'
  />
  <q-table
    :title='$t("MSG_FEE_TYPE")' flat dense :rows='filterFeeTypes'
    @row-click='(evt, row, index) => onFeeTypeClick(row as FeeType)'
  />
  <q-table
    :title='$t("MSG_PRICE_CURRENCY")' flat dense :rows='filterPriceCurrencys'
    @row-click='(evt, row, index) => onPriceCurrencyClick(row as PriceCurrency)'
  />
  <q-table
    :title='$t("MSG_GOOD")' flat dense :rows='filterGoods'
    @row-click='(evt, row, index) => onGoodClick(row as Good)'
  />
  <q-dialog
    v-model='adding'
    position='right'
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateGoodMenu
      v-if='addingType === AddingType.AddingGood'
      v-model:edit-good='selectedGood'
      class='add-menu'
      @update='onUpdateGood'
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
      v-model:edit-fee-type='selectedFeeType'
      class='add-menu'
      @update='onUpdateFeeType'
      @submit='onCreateFeeTypeSubmit'
    />
    <CreateCoinInfo
      v-if='addingType === AddingType.AddingCoinInfo'
      v-model:edit-coin='selectedCoin'
      class='add-menu'
      @update='onUpdateCoinInfo'
      @submit='onCreateCoinInfoSubmit'
    />
    <CreatePriceCurrency
      v-if='addingType === AddingType.AddingPriceCurrency'
      v-model:edit-coin='selectedCoin'
      class='add-menu'
      @update='onUpdatePriceCurrency'
      @submit='onCreatePriceCurrencySubmit'
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
import { DeviceInfo, FeeType, Good, GoodBase, PriceCurrency, VendorLocation } from 'src/store/goods/types'
import { FunctionVoid } from 'src/types/types'
import { Coin, CreateCoinRequest, UpdateCoinRequest } from 'src/store/coins/types'
import { expandGoodToGood } from 'src/store/goods/utils'

const CreateGoodMenu = defineAsyncComponent(() => import('src/components/good/CreateGoodMenu.vue'))
const CreateDeviceMenu = defineAsyncComponent(() => import('src/components/good/CreateDeviceMenu.vue'))
const CreateVendorLocationMenu = defineAsyncComponent(() => import('src/components/good/CreateVendorLocationMenu.vue'))
const CreateFeeTypeMenu = defineAsyncComponent(() => import('src/components/good/CreateFeeTypeMenu.vue'))
const CreateCoinInfo = defineAsyncComponent(() => import('src/components/good/CreateCoinInfo.vue'))
const CreatePriceCurrency = defineAsyncComponent(() => import('src/components/good/CreatePriceCurrency.vue'))
const GoodTools = defineAsyncComponent(() => import('src/components/good/GoodTools.vue'))

enum AddingType {
  AddingNone = 'none',
  AddingDevice = 'device',
  AddingVendorLocation = 'vendor-location',
  AddingGood = 'good',
  AddingFeeType = 'fee-type',
  AddingFee = 'fee',
  AddingCoinInfo = 'coininfo',
  AddingPriceCurrency = 'price-currency'
}

const addingType = ref(AddingType.AddingNone)
const adding = ref(false)

const store = useStore()

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push({
      ID: good.Good.Good.ID,
      SeparateFee: good.Good.Good.SeparateFee,
      UnitPower: good.Good.Good.UnitPower,
      DurationDays: good.Good.Good.DurationDays,
      Actuals: good.Good.Good.Actuals,
      DeliveryAt: good.Good.Good.DeliveryAt,
      Price: good.Good.Good.Price,
      BenefitType: good.Good.Good.BenefitType,
      Classic: good.Good.Good.Classic,
      Title: good.Good.Good.Title,
      Total: good.Good.Good.Total,
      Unit: good.Good.Good.Unit
    } as GoodBase)
  })
  return goods
})
const filterGoods = ref(allGoods.value)
const selectedGood = ref(undefined as unknown as Good)

const onGoodClick = (good: GoodBase) => {
  selectedGood.value = expandGoodToGood(store.getters.getGoodByID(good.ID as string))
  addingType.value = AddingType.AddingGood
}
const onUpdateGood = (good: Good) => {
  filterGoods.value = doFilterGood(good)
}

const doFilterGood = (targetGood: Good) => {
  return addingType.value !== AddingType.AddingNone && selectedGood.value ? allGoods.value.filter((good) => {
    return good.Title.toLowerCase().includes(targetGood.Title?.toLowerCase())
  }) : allGoods.value
}
watch(selectedGood, () => {
  filterGoods.value = doFilterGood(selectedGood.value)
})
watch(allGoods, () => {
  filterGoods.value = doFilterGood(selectedGood.value)
})

const allVendorLocations = computed(() => store.getters.getAllVendorLocations)
const selectedVendorLocation = ref(undefined as unknown as VendorLocation)
const filterVendorLocations = ref(allVendorLocations.value)

const onVendorLocationClick = (vendorLocation: VendorLocation) => {
  selectedVendorLocation.value = vendorLocation
  addingType.value = AddingType.AddingVendorLocation
}
const onUpdateVendorLocation = (vendorLication: VendorLocation) => {
  filterVendorLocations.value = doFilterVendorLocation(vendorLication)
}

const doFilterVendorLocation = (vendorLication: VendorLocation) => {
  return addingType.value !== AddingType.AddingNone && selectedVendorLocation.value ? allVendorLocations.value.filter((loc) => {
    return loc.Address.toLowerCase().includes(vendorLication.Address.toLowerCase()) &&
      loc.City.toLowerCase().includes(vendorLication.City.toLowerCase()) &&
      loc.Country.toLowerCase().includes(vendorLication.Country.toLowerCase()) &&
      loc.Province.toLowerCase().includes(vendorLication.Province.toLowerCase())
  }) : allVendorLocations.value
}
watch(selectedVendorLocation, () => {
  filterVendorLocations.value = doFilterVendorLocation(selectedVendorLocation.value)
})
watch(allVendorLocations, () => {
  filterVendorLocations.value = doFilterVendorLocation(selectedVendorLocation.value)
})

const allDevices = computed(() => store.getters.getAllDevices)
const selectedDevice = ref(undefined as unknown as DeviceInfo)
const filterDevices = ref(allDevices.value)

const onDeviceClick = (device: DeviceInfo) => {
  selectedDevice.value = device
  addingType.value = AddingType.AddingDevice
}
const onUpdateDevice = (device: DeviceInfo) => {
  filterDevices.value = doFilterDevice(device)
}

const doFilterDevice = (device: DeviceInfo) => {
  return addingType.value !== AddingType.AddingNone && selectedDevice.value ? allDevices.value.filter((dev) => {
    return dev.Type.toLowerCase().includes(device.Type.toLowerCase())
  }) : allDevices.value
}
watch(selectedDevice, () => {
  filterDevices.value = doFilterDevice(selectedDevice.value)
})
watch(allDevices, () => {
  filterDevices.value = doFilterDevice(selectedDevice.value)
})

const allCoins = computed(() => store.getters.getCoins)
const selectedCoin = ref(undefined as unknown as Coin)
const filterCoins = ref(allCoins.value)
const onCoinClick = (coin: Coin) => {
  selectedCoin.value = coin
  addingType.value = AddingType.AddingCoinInfo
}
const onUpdateCoinInfo = (coin: Coin) => {
  filterCoins.value = doFilterCoin(coin)
}

const doFilterCoin = (myCoin: Coin) => {
  return addingType.value !== AddingType.AddingNone && selectedCoin.value ? allCoins.value.filter((coin) => {
    return coin.Name.toLowerCase().includes(myCoin.Name.toLowerCase())
  }) : allCoins.value
}
watch(selectedCoin, () => {
  filterCoins.value = doFilterCoin(selectedCoin.value)
})
watch(allCoins, () => {
  filterCoins.value = doFilterCoin(selectedCoin.value)
})

const allFeeTypes = computed(() => store.getters.getAllFeeTypes)
const filterFeeTypes = ref(allFeeTypes.value)
const selectedFeeType = ref(undefined as unknown as FeeType)

const onFeeTypeClick = (feeType: FeeType) => {
  selectedFeeType.value = feeType
  addingType.value = AddingType.AddingFeeType
}
const onUpdateFeeType = (feeType: FeeType) => {
  filterFeeTypes.value = doFilterFeeType(feeType)
}

const doFilterFeeType = (myFeeType: FeeType) => {
  return addingType.value !== AddingType.AddingNone && selectedFeeType.value ? allFeeTypes.value.filter((feeType) => {
    return feeType.FeeType.toLowerCase().includes(myFeeType.FeeType.toLowerCase())
  }) : allFeeTypes.value
}
watch(selectedFeeType, () => {
  filterFeeTypes.value = doFilterFeeType(selectedFeeType.value)
})
watch(allFeeTypes, () => {
  filterFeeTypes.value = doFilterFeeType(selectedFeeType.value)
})

const allPriceCurrencys = computed(() => store.getters.getAllPriceCurrencys)
const filterPriceCurrencys = ref(allPriceCurrencys.value)
const selectedPriceCurrency = ref(undefined as unknown as PriceCurrency)

const onPriceCurrencyClick = (currency: PriceCurrency) => {
  selectedPriceCurrency.value = currency
  addingType.value = AddingType.AddingPriceCurrency
}
const onUpdatePriceCurrency = (currency: PriceCurrency) => {
  filterPriceCurrencys.value = doFilterPriceCurrency(currency)
}

const doFilterPriceCurrency = (myCurrency: PriceCurrency) => {
  return addingType.value !== AddingType.AddingNone && selectedPriceCurrency.value ? allPriceCurrencys.value.filter((currency) => {
    return currency.Name.toLowerCase().includes(myCurrency.Name.toLowerCase())
  }) : allPriceCurrencys.value
}
watch(selectedPriceCurrency, () => {
  filterPriceCurrencys.value = doFilterPriceCurrency(selectedPriceCurrency.value)
})
watch(allPriceCurrencys, () => {
  filterPriceCurrencys.value = doFilterPriceCurrency(selectedPriceCurrency.value)
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
  if (addingType.value === AddingType.AddingNone) {
    selectedDevice.value = undefined as unknown as DeviceInfo
    selectedVendorLocation.value = undefined as unknown as VendorLocation
    selectedCoin.value = undefined as unknown as Coin
    selectedFeeType.value = undefined as unknown as FeeType
  }
})

const onCreateDeviceClick = () => {
  addingType.value = AddingType.AddingDevice
}

const onCreateGoodClick = () => {
  selectedGood.value = undefined as unknown as Good
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

const onCreatePriceCurrencyClick = () => {
  addingType.value = AddingType.AddingPriceCurrency
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

const onCreateVendorLocationSubmit = (vendorLocation: VendorLocation) => {
  addingType.value = AddingType.AddingNone
  let action = GoodActionTypes.CreateVendorLocation
  if (vendorLocation.ID && vendorLocation.ID.length > 0) {
    action = GoodActionTypes.UpdateVendorLocation
  }

  store.dispatch(action, {
    Info: vendorLocation,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_VENDOR_LOCATION_FAIL'),
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
}

const onCreateCoinInfoSubmit = (coin: Coin) => {
  addingType.value = AddingType.AddingNone

  if (coin.ID && coin.ID.length > 0) {
    const req = {
      ID: coin.ID,
      PreSale: coin.PreSale,
      Logo: coin.Logo,
      ReservedAmount: coin.ReservedAmount,
      ForPay: coin.ForPay
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

const onCreatePriceCurrencySubmit = (currency: PriceCurrency) => {
  console.log(currency)
}

const onCreateGoodSubmit = (good: Good) => {
  addingType.value = AddingType.AddingNone
  let action = GoodActionTypes.CreateGood
  if (good.ID && good.ID.length > 0) {
    action = GoodActionTypes.UpdateGood
  }

  store.dispatch(action, {
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
}

const onMenuHide = () => {
  addingType.value = AddingType.AddingNone

  selectedCoin.value = undefined as unknown as Coin
  selectedDevice.value = undefined as unknown as DeviceInfo
  selectedGood.value = undefined as unknown as Good
  selectedFeeType.value = undefined as unknown as FeeType
  selectedPriceCurrency.value = undefined as unknown as PriceCurrency
  selectedVendorLocation.value = undefined as unknown as VendorLocation
}

</script>

<style lang='sass' scoped>
.good-tools
  margin-right: 8px

.add-menu
  width: 400px
  padding: 0 24px 24px 24px
</style>
