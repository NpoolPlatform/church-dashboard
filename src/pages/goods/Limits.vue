<template>
  <q-table
    v-model:selected='selectedCoin'
    :title='$t("MSG_COIN")' flat dense :rows='allCoins'
    selection='single'
  />
  <q-table
    v-model:selected='selectedGood'
    :title='$t("MSG_GOOD")' flat dense :rows='allGoods'
    selection='single'
  />
  <q-table :title='$t("MSG_PLATFORM_SETTING")' flat dense :rows='[platformSetting]'>
    <template v-if='!platformSetting.ID' #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreatPlatformSettingClick'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table :title='$t("MSG_COIN_SETTING")' flat dense :rows='coinSetting ? [coinSetting] : []'>
    <template v-if='!coinSetting' #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreatCoinSettingClick'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table :title='$t("MSG_COIN_SETTING")' flat dense :rows='goodSetting ? [goodSetting] : []'>
    <template v-if='!goodSetting' #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreatGoodSettingClick'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { ActionTypes as SettingActionTypes } from 'src/store/settings/action-types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { useI18n } from 'vue-i18n'
import { GoodBase } from 'src/store/goods/types'
import { FunctionVoid } from 'src/types/types'
import { Coin } from 'src/store/coins/types'

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
      Unit: good.Good.Unit,
      InheritFromGoodID: good.Good.InheritFromGoodID
    })
  })
  return goods
})
const selectedGood = ref([] as Array<GoodBase>)
const goodSetting = computed(() => {
  if (!selectedGood.value || selectedGood.value.length === 0) {
    return undefined
  }
  return store.getters.getGoodSettingByGood(selectedGood.value[0].ID as string)
})
watch(selectedGood, () => {
  selectedGood.value.forEach((good) => {
    store.dispatch(SettingActionTypes.GetGoodSettingByGood, {
      GoodID: good.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleGoods,
        Error: {
          Title: t('MSG_GET_GOOD_SETTING_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
})

const allCoins = computed(() => store.getters.getCoins)
const selectedCoin = ref([] as Array<Coin>)
const coinSetting = computed(() => {
  if (!selectedCoin.value || selectedCoin.value.length === 0) {
    return undefined
  }
  return store.getters.getCoinSettingByCoin(selectedCoin.value[0].ID as string)
})
watch(selectedCoin, () => {
  selectedCoin.value.forEach((coin) => {
    store.dispatch(SettingActionTypes.GetCoinSettingByCoin, {
      CoinTypeID: coin.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleGoods,
        Error: {
          Title: t('MSG_GET_COIN_SETTING_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
})

const platformSetting = computed(() => store.getters.getPlatformSetting)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const onCreatPlatformSettingClick = () => {
  console.log('TODO')
}

const onCreatCoinSettingClick = () => {
  console.log('TODO')
}

const onCreatGoodSettingClick = () => {
  console.log('TODO')
}

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
  store.dispatch(SettingActionTypes.GetPlatformSetting, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
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

</script>

<style lang='sass' scoped>
.good-tools
  margin-right: 8px

.add-menu
  width: 400px
  padding: 0 24px 24px 24px
</style>
