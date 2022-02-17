<template>
  <q-table
    v-model:selected='candidateAccount'
    row-key='ID'
    flat
    dense
    :loading='loading'
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
        <q-btn dense @click='onSetAsGoodBenefitAccountClick'>
          {{ $t('MSG_SET_AS_GOOD_BENEFIT_ACCOUNT') }}
        </q-btn>
        <q-btn dense @click='onCreatePlatformCoinAccountClick'>
          {{ $t('MSG_CREATE_PLATFORM_COIN_ACCOUNT') }}
        </q-btn>
        <q-btn dense @click='onCreateUserCoinAccountClick'>
          {{ $t('MSG_CREATE_USER_HOLD_ACCOUNT') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedGood'
    row-key='ID'
    flat
    dense
    :rows='allGoods'
    selection='single'
    :title='t("MSG_GOOD_LIST")'
  />
  <q-table
    flat
    dense
    :rows='myGoodBenefit ? [myGoodBenefit] : []'
    :title='t("MSG_GOOD_BENEFIT_SETTING")'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onSetGoodBenefitIntervalHoursClick'>
          {{ $t('MSG_SET_GOOD_BENEFIT_INTERVAL_HOURS') }}
        </q-btn>
        <q-btn dense @click='onGoodPaymentSubmit'>
          {{ $t('MSG_SUBMIT') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='goodPayments'
    :title='t("MSG_GOOD_PAYMENT_ADDRESS_LIST")'
  />
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreatPlatformCoinAccount
      v-if='addingType === AddingType.AddingPlatformCoinAccount'
      @submit='onCreatePlatformCoinAccountSubmit'
    />
    <CreatUserCoinAccount
      v-if='addingType === AddingType.AddingUserCoinAccount'
      v-model:edit-account='selectedAccount'
      @update='onUpdateUserCoinAccount'
      @submit='onCreateUserCoinAccountSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as AccountsMutationTypes } from 'src/store/accounts/mutation-types'
import { ActionTypes as AccountsActionTypes } from 'src/store/accounts/action-types'
import { CoinAccount, GoodBenefit } from 'src/store/accounts/types'
import { GoodBase } from 'src/store/goods/types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { DefaultID } from 'src/const/const'

const CreatPlatformCoinAccount = defineAsyncComponent(() => import('src/components/good/CreatePlatformCoinAccount.vue'))
const CreatUserCoinAccount = defineAsyncComponent(() => import('src/components/good/CreateUserCoinAccount.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

enum AddingType {
  AddingPlatformCoinAccount = 1,
  AddingUserCoinAccount = 2
}

const addingType = ref(AddingType.AddingPlatformCoinAccount)

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
  addingType.value = AddingType.AddingUserCoinAccount
  updating.value = true
  modifying.value = true
}

const onCreatePlatformCoinAccountClick = () => {
  selectedAccount.value = undefined
  addingType.value = AddingType.AddingPlatformCoinAccount
  adding.value = true
  modifying.value = true
}

const onCreateUserCoinAccountClick = () => {
  selectedAccount.value = undefined
  addingType.value = AddingType.AddingUserCoinAccount
  adding.value = true
  modifying.value = true
}

const onCreatePlatformCoinAccountSubmit = (coinID: string) => {
  onMenuHide()

  store.dispatch(AccountsActionTypes.CreatePlatformCoinAccount, {
    CoinTypeID: coinID,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_PLATFORM_COIN_ACCOUNT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateUserCoinAccount = (account: CoinAccount) => {
  console.log(account)
}

const onCreateUserCoinAccountSubmit = (account: CoinAccount) => {
  onMenuHide()

  store.dispatch(AccountsActionTypes.CreateUserCoinAccount, {
    Info: account,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_USER_COIN_ACCOUNT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push(good.Good.Good)
  })
  return goods
})
const selectedGood = ref([] as Array<GoodBase>)
watch(selectedGood, () => {
  selectedGood.value.forEach((good) => {
    store.dispatch(AccountsActionTypes.GetGoodBenefitByGood, {
      GoodID: good.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleGoods,
        Error: {
          Title: t('MSG_GET_GOOD_BENEFIT_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })

    store.dispatch(AccountsActionTypes.GetGoodPaymentsByGood, {
      GoodID: good.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleGoods,
        Error: {
          Title: t('MSG_GET_GOOD_PAYMENT_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })

    myGoodBenefit.value.GoodID = good.ID as string
  })
})
const goodBenefit = computed(() => {
  if (selectedGood.value && selectedGood.value.length > 0) {
    const benefit = store.getters.getGoodBenefitByGood(selectedGood.value[0].ID as string)
    if (benefit) {
      return benefit
    }
  }
  return {
    ID: DefaultID,
    GoodID: DefaultID,
    BenefitAccountID: DefaultID,
    PlatformOfflineAccountID: DefaultID,
    UserOfflineAccountID: DefaultID,
    UserOnlineAccountID: DefaultID,
    BenefitIntervalHours: 24
  } as GoodBenefit
})
const myGoodBenefit = ref(goodBenefit.value)
watch(goodBenefit, () => {
  myGoodBenefit.value = goodBenefit.value
})

const goodPayments = computed(() => {
  if (selectedGood.value && selectedGood.value.length > 0) {
    return store.getters.getGoodPaymentsByGood(selectedGood.value[0].ID as string)
  }
  return []
})

const onSetGoodBenefitIntervalHoursClick = () => {
  myGoodBenefit.value.BenefitIntervalHours = 24
}

const onSetAsGoodBenefitAccountClick = () => {
  if (candidateAccount.value[0].PlatformHoldPrivateKey) {
    myGoodBenefit.value.BenefitAccountID = candidateAccount.value[0].ID as string
  }
}

const onGoodPaymentSubmit = () => {
  if (!selectedGood.value || selectedGood.value.length === 0) {
    return
  }

  let action = AccountsActionTypes.CreateGoodBenefit
  if (myGoodBenefit.value.ID && myGoodBenefit.value.ID.length > 0 && myGoodBenefit.value.ID !== DefaultID) {
    action = AccountsActionTypes.UpdateGoodBenefit
  }

  store.dispatch(action, {
    Info: myGoodBenefit.value,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_GOOD_BENEFIT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
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

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === AccountsMutationTypes.SetCoinAccounts) {
      loading.value = false
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>
