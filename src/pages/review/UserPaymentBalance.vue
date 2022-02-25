<template>
  <q-table
    v-model:selected='selectedPayments'
    flat
    dense
    :loading='loading'
    :rows='payments'
    selection='multiple'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE_USER_PAYMENT_BALANCE")' @click='onCreateUserPaymentBalances' />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='coins'
  />
  <q-table
    flat
    dense
    :rows='balances'
  />
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ActionTypes as ApplicationActionTypes } from '../../store/applications/action-types'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as ReviewMutationTypes } from '../../store/reviews/mutation-types'
import { MutationTypes as ApplicationMutationTypes } from '../../store/applications/mutation-types'
import { ActionTypes as BillingActionTypes } from '../../store/billing/action-types'
import { MutationTypes as BillingMutationTypes } from '../../store/billing/mutation-types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { Payment } from 'src/store/billing/types'
import { PaymentState } from 'src/store/billing/const'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const selectedAppID = computed({
  get: () => store.getters.getWithdrawSelectedAppID,
  set: (val) => {
    store.commit(ReviewMutationTypes.SetWithdrawSelectedAppID, val)
  }
})

const coins = computed(() => store.getters.getCoins)
const balances = computed(() => store.getters.getUserPaymentBalances)
const payments = computed(() => store.getters.getPayments)
const selectedPayments = ref([] as Array<Payment>)

const loading = ref(false)
const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  loading.value = true
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetPayments, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_PAYMENTS_FAIL'),
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

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === ReviewMutationTypes.SetWithdrawSelectedAppID) {
      store.dispatch(BillingActionTypes.GetUserPaymentBalancesByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleReviews,
          Error: {
            Title: t('MSG_GET_USER_PAYMENT_BALANCES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      loading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleReviews)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === ApplicationMutationTypes.SetApplications) {
      loading.value = false
    }

    if (mutation.type === BillingMutationTypes.SetUserBenefits) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onCreateUserPaymentBalances = () => {
  selectedPayments.value.forEach((payment) => {
    if (payment.State === PaymentState.Timeout && payment.StartAmount < payment.FinishAmount) {
      store.dispatch(BillingActionTypes.CreateUserPaymentBalanceForOtherAppUser, {
        TargetAppID: selectedAppID.value,
        TargetUserID: payment.UserID,
        Info: {
          PaymentID: payment.ID,
          Amount: payment.FinishAmount - payment.StartAmount
        },
        Message: {
          ModuleKey: ModuleKey.ModuleReviews,
          Error: {
            Title: t('MSG_CREATE_USER_PAYMENT_BALANCE_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }
  })
}

</script>
