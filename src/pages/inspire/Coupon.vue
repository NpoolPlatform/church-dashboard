<template>
  <q-table
    v-model:selected='selectedUsers'
    flat
    dense
    :loading='loading'
    :rows='myUsers'
    selection='multiple'
    row-key='ID'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedCouponPools'
    flat
    dense
    :rows='couponPools'
    selection='single'
    row-key='ID'
    @row-click='(evt, row, index) => onCouponPoolClick(row as CouponPool)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateCouponPool' />
        <q-btn :label='t("MSG_AIR_DROP")' @click='onAirDropCouponPool' />
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedDiscountPools'
    flat
    dense
    :rows='discountPools'
    selection='single'
    row-key='ID'
    @row-click='(evt, row, index) => onDiscountPoolClick(row as DiscountPool)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateDiscountPool' />
        <q-btn :label='t("MSG_AIR_DROP")' @click='onAirDropDiscountPool' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='userSpecialReductions'
    @row-click='(evt, row, index) => onUserSpecialReductionClick(row as UserSpecialReduction)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateUserSpecialReduction' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='couponsAllocated'
  />
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateCouponPool
      v-if='addingType === AddingType.AddingCouponPool'
      v-model:edit-coupon-pool='selectedCoupon'
      v-model:selected-app='selectedApp'
      @update='onUpdateCouponPool'
      @submit='onSubmitCouponPool'
    />
    <CreateDiscountPool
      v-if='addingType === AddingType.AddingDiscountCoupon'
      v-model:edit-discount-pool='selectedDiscount'
      v-model:selected-app='selectedApp'
      @update='onUpdateDiscountPool'
      @submit='onSubmitDiscountPool'
    />
    <CreateUserSpecialReduction
      v-if='addingType === AddingType.AddingUserSpecalReduction'
      v-model:edit-user-special-reduction='selectedUserReduction'
      v-model:selected-app='selectedApp'
      @update='onUpdateUserSpecialReduction'
      @submit='onSubmitUserSpecialReduction'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { AppUser } from 'src/store/user-helper/types'
import { CouponPool, DiscountPool, UserSpecialReduction } from 'src/store/inspire/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateCouponPool = defineAsyncComponent(() => import('src/components/inspire/CreateCouponPool.vue'))
const CreateDiscountPool = defineAsyncComponent(() => import('src/components/inspire/CreateDiscountPool.vue'))
const CreateUserSpecialReduction = defineAsyncComponent(() => import('src/components/inspire/CreateUserSpecialReduction.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))

const selectedCouponPools = ref([] as Array<CouponPool>)
const selectedDiscountPools = ref([] as Array<DiscountPool>)

const selectedCoupon = ref(undefined as unknown as CouponPool)
const selectedDiscount = ref(undefined as unknown as DiscountPool)
const selectedUserReduction = ref(undefined as unknown as UserSpecialReduction)

const users = computed(() => store.getters.getAppUserInfosByAppID(selectedAppID.value))
const myUsers = computed(() => {
  const allUsers = [] as Array<AppUser>
  if (users.value) {
    users.value.forEach((user) => {
      allUsers.push(user.User as AppUser)
    })
  }
  return allUsers
})

const couponPools = computed(() => store.getters.getCouponPoolsByAppID(selectedAppID.value))
const discountPools = computed(() => store.getters.getDiscountPoolsByAppID(selectedAppID.value))
const userSpecialReductions = computed(() => store.getters.getUserSpecialReductionsByAppID(selectedAppID.value))
const couponsAllocated = computed(() => store.getters.getCouponsAllocatedByAppID(selectedAppID.value))

const loading = ref(false)
const selectedUsers = ref([] as Array<AppUser>)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfosByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

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

  store.dispatch(InspireActionTypes.GetUserSpecialReductionsByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_USER_SPECIAL_REDUCTIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetCouponsAllocatedByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COUPONS_ALLOCATED_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

enum AddingType {
  AddingCouponPool = 'coupon-pool',
  AddingDiscountCoupon = 'discount-coupon',
  AddingUserSpecalReduction = 'user-special-recudtion',
  AddingNone = 'none'
}
const addingType = ref(AddingType.AddingNone)

const onCreateCouponPool = () => {
  adding.value = true
  modifying.value = true
  addingType.value = AddingType.AddingCouponPool
}

const onCouponPoolClick = (couponPool: CouponPool) => {
  selectedCoupon.value = couponPool
  updating.value = true
  modifying.value = true
  addingType.value = AddingType.AddingCouponPool
}

const onAirDropCouponPool = () => {
  if (selectedCouponPools.value.length > 0) {
    selectedUsers.value.forEach((user) => {
      store.dispatch(InspireActionTypes.CreateCouponAllocatedForOtherAppUser, {
        TargetAppID: selectedApp.value.App.ID,
        TargetUserID: user.ID as string,
        Info: {
          CouponID: selectedCouponPools.value[0].ID,
          Type: 'coupon'
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_COUPON_ALLOCATED_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    })
  }
}

const onCreateDiscountPool = () => {
  adding.value = true
  modifying.value = true
  addingType.value = AddingType.AddingDiscountCoupon
}

const onDiscountPoolClick = (discountPool: DiscountPool) => {
  selectedDiscount.value = discountPool
  updating.value = true
  modifying.value = true
  addingType.value = AddingType.AddingDiscountCoupon
}

const onAirDropDiscountPool = () => {
  if (selectedDiscountPools.value.length > 0) {
    selectedUsers.value.forEach((user) => {
      store.dispatch(InspireActionTypes.CreateCouponAllocatedForOtherAppUser, {
        TargetAppID: selectedApp.value.App.ID,
        TargetUserID: user.ID as string,
        Info: {
          CouponID: selectedDiscountPools.value[0].ID,
          Type: 'discount'
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_COUPON_ALLOCATED_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    })
  }
}

const onCreateUserSpecialReduction = () => {
  adding.value = true
  modifying.value = true
  addingType.value = AddingType.AddingUserSpecalReduction
}

const onUserSpecialReductionClick = (userSpecialReduction: UserSpecialReduction) => {
  selectedUserReduction.value = userSpecialReduction
  updating.value = true
  modifying.value = true
  addingType.value = AddingType.AddingUserSpecalReduction
}

const onUpdateCouponPool = (couponPool: CouponPool) => {
  // TODO: fileter the list
  console.log('update', couponPool)
}

const onSubmitCouponPool = (couponPool: CouponPool) => {
  let action = InspireActionTypes.CreateCouponPoolForOtherApp
  if (updating.value) {
    action = InspireActionTypes.UpdateCouponPool
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: couponPool,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_COUPON_POOL_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateDiscountPool = (discountPool: DiscountPool) => {
  // TODO: fileter the list
  console.log('update', discountPool)
}

const onSubmitDiscountPool = (discountPool: DiscountPool) => {
  let action = InspireActionTypes.CreateDiscountPoolForOtherApp
  if (updating.value) {
    action = InspireActionTypes.UpdateDiscountPool
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    TargetAppID: selectedApp.value.App.ID,
    Info: discountPool,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_DISCOUNT_POOL_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateUserSpecialReduction = (userSpecialReduction: UserSpecialReduction) => {
  // TODO: fileter the list
  console.log('update', userSpecialReduction)
}

const onSubmitUserSpecialReduction = (userSpecialReduction: UserSpecialReduction) => {
  adding.value = false
  updating.value = false
  modifying.value = false

  if (!updating.value) {
    selectedUsers.value.forEach((user) => {
      store.dispatch(InspireActionTypes.CreateUserSpecialReductionForOtherAppUser, {
        TargetAppID: selectedApp.value.App.ID,
        TargetUserID: user.ID as string,
        Info: userSpecialReduction,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_CREATE_USER_SPECIAL_REDUCTION_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    })
  } else {
    store.dispatch(InspireActionTypes.UpdateUserSpecialReduction, {
      Info: userSpecialReduction,
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_CREATE_USER_SPECIAL_REDUCTION_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }
}

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
    if (mutation.type === InspireMutationTypes.SetCouponPools) {
      loading.value = false
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
  addingType.value = AddingType.AddingNone
}

</script>
