<template>
  <ApplicationSelector v-model:selected-app-id='selectedAppID' />
  <q-table
    v-model:selected='selectedActivities'
    flat
    dense
    :rows='activities'
    selection='single'
    row-key='ID'
  />
  <q-table
    v-model:selected='selectedCouponPools'
    flat
    dense
    :rows='couponPools'
    selection='single'
    row-key='ID'
  />
  <q-table
    v-model:selected='selectedDiscountPools'
    flat
    dense
    :rows='discountPools'
    selection='single'
    row-key='ID'
  />
  <q-option-group
    v-model='event'
    :options='events'
  />
  <q-table
    flat
    dense
    :rows='eventCoupons'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateEventCoupon' />
      </div>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, watch, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { CouponPool, DiscountPool, Activity } from 'src/store/inspire/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})

const selectedCouponPools = ref([] as Array<CouponPool>)
const selectedDiscountPools = ref([] as Array<DiscountPool>)
const selectedActivities = ref([] as Array<Activity>)

const couponPools = computed(() => store.getters.getCouponPoolsByAppID(selectedAppID.value))
const discountPools = computed(() => store.getters.getDiscountPoolsByAppID(selectedAppID.value))
const activities = computed(() => store.getters.getActivitiesByAppID(selectedAppID.value))
const eventCoupons = computed(() => store.getters.getEventCouponsByAppID(selectedAppID.value))

const events = [
  {
    label: 'Sharing',
    value: 'sharing'
  }, {
    label: 'Invitation Registration',
    value: 'invitation-registeration'
  }, {
    label: 'Invitation Purchase',
    value: 'invitation-purchase'
  }, {
    label: 'Register',
    value: 'register'
  }, {
    label: 'KYC Authenticate',
    value: 'kyc-authenticate'
  }, {
    label: 'Total Amount',
    value: 'total-amount'
  }, {
    label: 'Single Amount',
    value: 'single-amount'
  }
]
const event = ref()

const onCreateEventCoupon = () => {
  if (!event.value) {
    return
  }

  selectedActivities.value.forEach((act) => {
    selectedCouponPools.value.forEach((coupon) => {
      store.dispatch(InspireActionTypes.CreateEventCouponForOtherApp, {
        TargetAppID: selectedAppID.value,
        Info: {
          ActivityID: act.ID as string,
          Event: event.value as string,
          Type: 'coupon',
          CouponID: coupon.ID
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_EVENT_COUPON_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    })

    selectedDiscountPools.value.forEach((coupon) => {
      store.dispatch(InspireActionTypes.CreateEventCouponForOtherApp, {
        TargetAppID: selectedAppID.value,
        Info: {
          ActivityID: act.ID as string,
          Event: event.value as string,
          Type: 'discount',
          CouponID: coupon.ID
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_EVENT_COUPON_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    })
  })
}

const loading = ref(false)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(InspireActionTypes.GetCouponPoolsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COUPON_POOLS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetDiscountPoolsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_DISCOUNT_POOLS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetActivitiesByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_ACTIVITIES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetEventCouponsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_EVENT_COUPONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetEventCoupons) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
