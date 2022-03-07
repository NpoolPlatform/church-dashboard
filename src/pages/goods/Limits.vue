<template>
  <q-table
    v-model:selected='candidateAccount'
    row-key='ID'
    flat
    dense
    :rows='fileterAccounts'
    selection='single'
    @row-click='(evt, row, index) => onRowClick(row as CoinAccount)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-input
          v-model='candidateAccountID'
          flat
          dense
          :label='$t("MSG_ACCOUNT_ID")'
        />
        <q-btn dense @click='onSetAsGoodPlatformOfflineAccountClick'>
          {{ $t('MSG_SET_AS_GOOD_PLATFORM_OFFLINE_ACCOUNT') }}
        </q-btn>
        <q-btn dense @click='onSetAsGoodUserOfflineClick'>
          {{ $t('MSG_SET_AS_GOOD_USER_OFFLINE_ACCOUNT') }}
        </q-btn>
        <q-btn dense @click='onSetAsGoodUserOnlineClick'>
          {{ $t('MSG_SET_AS_GOOD_USER_ONLINE_ACCOUNT') }}
        </q-btn>
        <q-btn dense @click='onSetAsGoodIncomingClick'>
          {{ $t('MSG_SET_GOOD_INCOMING_ACCOUNT') }}
        </q-btn>
      </div>
    </template>
  </q-table>
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
        <q-td key='PaymentAccountUSDAmount' :props='props'>
          {{ props.row.PaymentAccountUSDAmount }}
          <q-popup-edit v-slot='scope' v-model='paymentAccountUSDAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
        <q-td key='WithdrawAutoReviewUSDAmount' :props='props'>
          {{ props.row.WithdrawAutoReviewUSDAmount }}
          <q-popup-edit v-slot='scope' v-model='withdrawAutoReviewUSDAmount' buttons persistent>
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
        <q-td key='PaymentAccountCoinAmount' :props='props'>
          {{ props.row.PaymentAccountCoinAmount }}
          <q-popup-edit v-slot='scope' v-model='paymentAccountCoinAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
        <q-td key='PlatformOfflineAccountID' :props='props'>
          {{ props.row.PlatformOfflineAccountID }}
        </q-td>
        <q-td key='UserOfflineAccountID' :props='props'>
          {{ props.row.UserOfflineAccountID }}
        </q-td>
        <q-td key='UserOnlineAccountID' :props='props'>
          {{ props.row.UserOnlineAccountID }}
        </q-td>
        <q-td key='GoodIncomingAccountID' :props='props'>
          {{ props.row.GoodIncomingAccountID }}
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
import { CoinAccount } from 'src/store/accounts/types'
import { ActionTypes as AccountsActionTypes } from 'src/store/accounts/action-types'

const store = useStore()

const allCoins = computed(() => store.getters.getCoins)
const selectedCoin = ref([] as Array<Coin>)
const coinSetting = computed({
  get: () => {
    if (!selectedCoin.value || selectedCoin.value.length === 0) {
      return undefined
    }
    return store.getters.getCoinSettingByCoin(selectedCoin.value[0].ID as string)
  },
  set: (val) => {
    store.commit(SettingMutationTypes.SetCoinSetting, val)
  }
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

const accounts = computed(() => store.getters.getCoinAccounts)
const candidateAccountID = ref('')
const fileterAccounts = computed(() => {
  return accounts.value.filter((account) => {
    return account.ID?.includes(candidateAccountID.value)
  })
})

const selectedAccount = ref()
const candidateAccount = ref([] as Array<CoinAccount>)

const onRowClick = (row: CoinAccount) => {
  selectedAccount.value = row
}

const platformSetting = computed({
  get: () => store.getters.getPlatformSetting,
  set: (val) => store.commit(SettingMutationTypes.SetPlatformSetting, val)
})
const myWarmAccountUSDAmount = computed(() => platformSetting.value.WarmAccountUSDAmount)
const myPaymentAccountUSDAmount = computed(() => platformSetting.value.PaymentAccountUSDAmount)
const myWithdrawAutoReviewUSDAmount = computed(() => platformSetting.value.WithdrawAutoReviewUSDAmount)

const warmAccountUSDAmount = ref(myWarmAccountUSDAmount.value)
watch(myWarmAccountUSDAmount, () => {
  warmAccountUSDAmount.value = myWarmAccountUSDAmount.value
})

const paymentAccountUSDAmount = ref(myPaymentAccountUSDAmount.value)
watch(myPaymentAccountUSDAmount, () => {
  paymentAccountUSDAmount.value = myPaymentAccountUSDAmount.value
})

const withdrawAutoReviewUSDAmount = ref(myWithdrawAutoReviewUSDAmount.value)
watch(myWithdrawAutoReviewUSDAmount, () => {
  withdrawAutoReviewUSDAmount.value = myWithdrawAutoReviewUSDAmount.value
})

const myPlatformSetting = computed(() => {
  return {
    ID: platformSetting.value.ID,
    WarmAccountUSDAmount: warmAccountUSDAmount.value,
    PaymentAccountUSDAmount: paymentAccountUSDAmount.value,
    WithdrawAutoReviewUSDAmount: withdrawAutoReviewUSDAmount.value
  }
})

watch(warmAccountUSDAmount, () => {
  platformSetting.value = myPlatformSetting.value
})
watch(paymentAccountUSDAmount, () => {
  platformSetting.value = myPlatformSetting.value
})
watch(withdrawAutoReviewUSDAmount, () => {
  platformSetting.value = myPlatformSetting.value
})

const myWarmAccountCoinAmount = computed(() => coinSetting.value?.WarmAccountCoinAmount)
const warmAccountCoinAmount = ref(myWarmAccountCoinAmount.value)
watch(myWarmAccountCoinAmount, () => {
  warmAccountCoinAmount.value = myWarmAccountCoinAmount.value
})

const myPaymentAccountCoinAmount = computed(() => coinSetting.value?.PaymentAccountCoinAmount)
const paymentAccountCoinAmount = ref(myPaymentAccountCoinAmount.value)
watch(myPaymentAccountCoinAmount, () => {
  paymentAccountCoinAmount.value = myPaymentAccountCoinAmount.value
})

const platformOfflineAccountID = ref(coinSetting.value?.PlatformOfflineAccountID)
const userOfflineAccountID = ref(coinSetting.value?.UserOfflineAccountID)
const userOnlineAccountID = ref(coinSetting.value?.UserOnlineAccountID)
const goodIncomingAccountID = ref(coinSetting.value?.GoodIncomingAccountID)

watch(coinSetting, () => {
  platformOfflineAccountID.value = coinSetting.value?.PlatformOfflineAccountID
  userOfflineAccountID.value = coinSetting.value?.UserOfflineAccountID
  userOnlineAccountID.value = coinSetting.value?.UserOnlineAccountID
  goodIncomingAccountID.value = coinSetting.value?.GoodIncomingAccountID
})

const myCoinSetting = computed(() => {
  return {
    ID: coinSetting.value?.ID,
    CoinTypeID: coinSetting.value?.CoinTypeID as string,
    WarmAccountCoinAmount: warmAccountCoinAmount.value as number,
    PaymentAccountCoinAmount: paymentAccountCoinAmount.value as number,
    PlatformOfflineAccountID: platformOfflineAccountID.value,
    UserOfflineAccountID: userOfflineAccountID.value,
    UserOnlineAccountID: userOnlineAccountID.value,
    GoodIncomingAccountID: goodIncomingAccountID.value
  }
})

watch(warmAccountCoinAmount, () => {
  coinSetting.value = myCoinSetting.value
})
watch(paymentAccountCoinAmount, () => {
  coinSetting.value = myCoinSetting.value
})
watch(platformOfflineAccountID, () => {
  coinSetting.value = myCoinSetting.value
})
watch(userOfflineAccountID, () => {
  coinSetting.value = myCoinSetting.value
})
watch(userOnlineAccountID, () => {
  coinSetting.value = myCoinSetting.value
})
watch(goodIncomingAccountID, () => {
  coinSetting.value = myCoinSetting.value
})

const onSetAsGoodPlatformOfflineAccountClick = () => {
  if (!candidateAccount.value[0].PlatformHoldPrivateKey) {
    platformOfflineAccountID.value = candidateAccount.value[0].ID as string
  }
}

const onSetAsGoodUserOfflineClick = () => {
  if (!candidateAccount.value[0].PlatformHoldPrivateKey) {
    userOfflineAccountID.value = candidateAccount.value[0].ID as string
  }
}

const onSetAsGoodUserOnlineClick = () => {
  if (candidateAccount.value[0].PlatformHoldPrivateKey) {
    userOnlineAccountID.value = candidateAccount.value[0].ID as string
  }
}

const onSetAsGoodIncomingClick = () => {
  if (!candidateAccount.value[0].PlatformHoldPrivateKey) {
    goodIncomingAccountID.value = candidateAccount.value[0].ID as string
  }
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const onCreatePlatformSettingClick = () => {
  store.commit(SettingMutationTypes.SetPlatformSetting, {
    ID: DefaultID,
    WarmAccountUSDAmount: 0,
    PaymentAccountUSDAmount: 0,
    WithdrawAutoReviewUSDAmount: 0
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
    ID: coinSetting.value?.ID,
    CoinTypeID: selectedCoin.value[0].ID as string,
    WarmAccountCoinAmount: coinSetting.value?.WarmAccountCoinAmount as number,
    PaymentAccountCoinAmount: coinSetting.value?.PaymentAccountCoinAmount as number,
    PlatformOfflineAccountID: coinSetting.value?.PlatformOfflineAccountID,
    UserOfflineAccountID: coinSetting.value?.UserOfflineAccountID,
    UserOnlineAccountID: coinSetting.value?.UserOnlineAccountID,
    GoodIncomingAccountID: coinSetting.value?.GoodIncomingAccountID
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
  store.dispatch(AccountsActionTypes.GetCoinAccounts, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_COIN_ACCOUNTS_FAIL'),
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
        Title: t('MSG_GET_PLATFORM_SETTING_FAIL'),
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
