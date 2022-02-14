<template>
  <q-table
    v-model:selected='selectedCoin'
    row-key='ID'
    :title='$t("MSG_COIN")' flat dense :rows='allCoins'
    selection='single'
  />
  <q-table :title='$t("MSG_PLATFORM_SETTING")' flat dense :rows='[platformSetting]'>
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn v-if='!platformSetting.ID' dense @click='onCreatePlatformSettingClick'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
        <q-btn v-else dense @click='onPlatformSettingSubmit'>
          {{ $t('MSG_SUBMIT') }}
        </q-btn>
      </div>
    </template>
    <template #body='props'>
      <q-tr :props='props'>
        <q-td key='ID' :props='props'>
          {{ props.row.ID }}
        </q-td>
        <q-td key='WarmAccountUSDAmount' :props='props'>
          {{ props.row.WarmAccountUSDAmount }}
          <q-popup-edit v-slot='scope' v-model='warmAccountUSDAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-table :title='$t("MSG_COIN_SETTING")' flat dense :rows='coinSetting ? [coinSetting] : []'>
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn v-if='!coinSetting' dense @click='onCreateCoinSettingClick'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
        <q-btn v-else dense @click='onCoinSettingSubmit'>
          {{ $t('MSG_SUBMIT') }}
        </q-btn>
      </div>
    </template>
    <template #body='props'>
      <q-tr :props='props'>
        <q-td key='ID' :props='props'>
          {{ props.row.ID }}
        </q-td>
        <q-td key='CoinTypeID' :props='props'>
          {{ props.row.CoinTypeID }}
        </q-td>
        <q-td key='WarmAccountCoinAmount' :props='props'>
          {{ props.row.WarmAccountCoinAmount }}
          <q-popup-edit v-slot='scope' v-model='warmAccountCoinAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { ActionTypes as SettingActionTypes } from 'src/store/settings/action-types'
import { MutationTypes as SettingMutationTypes } from 'src/store/settings/mutation-types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { useI18n } from 'vue-i18n'
import { FunctionVoid } from 'src/types/types'
import { Coin } from 'src/store/coins/types'
import { DefaultID } from 'src/const/const'
import { CoinSetting } from 'src/store/settings/types'

const store = useStore()

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

const myWarmAccountCoinAmount = computed(() => coinSetting.value?.WarmAccountCoinAmount)
const warmAccountCoinAmount = ref(myWarmAccountCoinAmount.value)
watch(myWarmAccountCoinAmount, () => {
  warmAccountCoinAmount.value = myWarmAccountCoinAmount.value
})
watch(warmAccountCoinAmount, () => {
  store.commit(SettingMutationTypes.SetCoinSetting, {
    ID: coinSetting.value?.ID,
    CoinTypeID: coinSetting.value?.CoinTypeID,
    WarmAccountCoinAmount: warmAccountCoinAmount.value as number
  } as CoinSetting)
})

const platformSetting = computed(() => store.getters.getPlatformSetting)
const myWarmAccountUSDAmount = computed(() => platformSetting.value.WarmAccountUSDAmount)

const warmAccountUSDAmount = ref(myWarmAccountUSDAmount.value)
watch(myWarmAccountUSDAmount, () => {
  warmAccountUSDAmount.value = myWarmAccountUSDAmount.value
})
watch(warmAccountUSDAmount, () => {
  store.commit(SettingMutationTypes.SetPlatformSetting, {
    ID: platformSetting.value.ID,
    WarmAccountUSDAmount: warmAccountUSDAmount.value
  })
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const onCreatePlatformSettingClick = () => {
  store.commit(SettingMutationTypes.SetPlatformSetting, {
    WarmAccountUSDAmount: 0
  })
}

const onPlatformSettingSubmit = () => {
  let action = SettingActionTypes.CreatePlatformSetting
  if (platformSetting.value.ID !== DefaultID) {
    action = SettingActionTypes.UpdatePlatformSetting
  }
  store.dispatch(action, {
    Info: platformSetting.value,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_PLATFORM_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onCreateCoinSettingClick = () => {
  if (!selectedCoin.value || selectedCoin.value.length === 0) {
    return
  }
  store.commit(SettingMutationTypes.SetCoinSetting, {
    ID: coinSetting.value ? coinSetting.value.ID : undefined,
    CoinTypeID: selectedCoin.value[0].ID as string,
    WarmAccountCoinAmount: coinSetting.value ? coinSetting.value.WarmAccountCoinAmount : 0
  })
}

const onCoinSettingSubmit = () => {
  let action = SettingActionTypes.CreateCoinSetting
  if (coinSetting.value && coinSetting.value.ID && coinSetting.value.ID !== DefaultID) {
    action = SettingActionTypes.UpdateCoinSetting
  }
  store.dispatch(action, {
    Info: coinSetting.value as CoinSetting,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_COIN_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
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
