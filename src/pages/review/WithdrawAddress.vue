<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='reviews'
    @row-click='(evt, row, index) => onRowClick(index)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='reviewing'
    position='right'
    full-width
    square
    no-shake
  >
    <WithdrawAddress
      v-model:withdraw-address-review='addressReview'
      @approve='onReviewApprove'
      @reject='onReviewReject'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ActionTypes as ApplicationActionTypes } from '../../store/applications/action-types'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as ReviewMutationTypes } from '../../store/reviews/mutation-types'
import { MutationTypes as ApplicationMutationTypes } from '../../store/applications/mutation-types'
import { ActionTypes as ReviewActionTypes } from '../../store/reviews/action-types'
import { Review, WithdrawAddressReview } from '../../store/reviews/types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'
import { State } from '../../store/reviews/const'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const WithdrawAddress = defineAsyncComponent(() => import('src/components/withdraw/Address.vue'))

const selectedAppID = computed({
  get: () => store.getters.getWithdrawAddressSelectedAppID,
  set: (val) => {
    store.commit(ReviewMutationTypes.SetWithdrawAddressSelectedAppID, val)
  }
})

const addresseReviews = computed(() => store.getters.getWithdrawAddressReviews)
const reviews = computed(() => {
  const reviews = [] as Array<Review>
  addresseReviews.value.forEach((review) => {
    reviews.push(review.Review)
  })
  return reviews
})
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
    if (mutation.type === ReviewMutationTypes.SetWithdrawAddressSelectedAppID) {
      loading.value = true
      store.dispatch(ReviewActionTypes.GetWithdrawAddressReviewsByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleReviews,
          Error: {
            Title: t('MSG_GET_WITHDRAW_ADDRESS_REVIEWS_FAIL'),
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

    if (mutation.type === ReviewMutationTypes.SetWithdrawAddressReviews) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const reviewing = ref(false)
const selectedIndex = ref(0)
const addressReview = computed(() => {
  if (addresseReviews.value) {
    return addresseReviews.value[selectedIndex.value]
  }
  return undefined as unknown as WithdrawAddressReview
})

const onRowClick = (index: number) => {
  reviewing.value = true
  selectedIndex.value = index
}

const onReviewApprove = () => {
  reviewing.value = false
  store.dispatch(ReviewActionTypes.UpdateReview, {
    Info: {
      ID: addressReview.value?.Review.ID as string,
      ReviewerID: store.getters.getLoginedUser.User?.ID,
      State: State.Approved
    },
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_REVIEW_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onReviewReject = (message: string) => {
  reviewing.value = false
  store.dispatch(ReviewActionTypes.UpdateReview, {
    Info: {
      ID: addressReview.value?.Review.ID as string,
      ReviewerID: store.getters.getLoginedUser.User?.ID,
      State: State.Rejected,
      Message: message
    },
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_REVIEW_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

</script>
