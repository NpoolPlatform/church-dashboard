<template>
  <q-table
    v-model:selected='selectedGood'
    flat
    dense
    :rows='allGoods'
    selection='single'
  />
  <q-table
    flat
    dense
    :rows='platformBenefits'
  />
  <q-table
    flat
    dense
    :rows='userBenefits'
  />
  <q-table
    flat
    dense
    :rows='transactions'
  />
  <q-table
    flat
    dense
    :rows='userWithdraws'
  />
  <q-table
    flat
    dense
    :rows='payments'
  />
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as BillingActionTypes } from 'src/store/billing/action-types'
import { useI18n } from 'vue-i18n'
import { GoodBase } from 'src/store/goods/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

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
const selectedGood = ref([] as Array<GoodBase>)

const platformBenefits = computed(() => store.getters.getPlatformBenefits)
const userBenefits = computed(() => store.getters.getUserBenefits)
const transactions = computed(() => store.getters.getCoinAccountTransactions)
const userWithdraws = computed(() => store.getters.getUserWithdraws)
const payments = computed(() => store.getters.getPayments)

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetPlatformBenefits, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_PLATFORM_BENEFITS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetUserBenefits, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_USER_BENEFITS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetCoinAccountTransactions, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_COIN_ACCOUNT_TRANSACTIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetUserWithdrawItems, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_USER_WITHDRAWS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetPayments, {
    Message: {
      ModuleKey: ModuleKey.ModuleBilling,
      Error: {
        Title: t('MSG_GET_PAYMENTS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>
