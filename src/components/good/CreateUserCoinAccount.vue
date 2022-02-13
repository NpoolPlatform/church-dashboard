<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_PLATFORM_COIN_ACCOUNT') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='myCoinType'
        >
          <q-list>
            <q-item
              v-for='(myCoin, index) in coins'
              :key='index'
              v-close-popup
              clickable
              @click='onCoinItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ myCoin.Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <q-input v-model='myAddress' :label='t("MSG_ADDRESS")' />
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { computed, ref, defineEmits, onMounted, defineProps, toRef, watch } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { CoinAccount } from 'src/store/accounts/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  editAccount?: CoinAccount
}

const props = defineProps<Props>()
const editAccount = toRef(props, 'editAccount')

const coins = computed(() => {
  return store.getters.getCoins.filter((coin) => {
    return !coin.PreSale
  })
})

const selectedCoinIndex = computed(() => {
  if (coins.value) {
    for (let i = 0; i < coins.value.length; i++) {
      if (coins.value[i].ID === editAccount.value?.CoinTypeID) {
        return i
      }
    }
  }
  return 0
})
const myCoinType = computed(() => {
  return coins.value && coins.value.length > 0 ? coins.value[selectedCoinIndex.value].Name : undefined
})
const coinID = computed(() => {
  return coins.value && coins.value.length > 0 ? coins.value[selectedCoinIndex.value].ID : undefined
})
const myAddress = ref(editAccount.value?.Address)

const account = computed(() => {
  return {
    ID: editAccount.value?.ID,
    CoinTypeID: coinID.value,
    Address: myAddress.value,
    PlatformHoldPrivateKey: editAccount.value?.PlatformHoldPrivateKey
  } as CoinAccount
})

const emit = defineEmits<{(e: 'submit', account: CoinAccount): void,
  (e: 'update', account: CoinAccount): void,
}>()

const onSubmit = () => {
  emit('submit', account.value)
}

watch(account, () => {
  emit('update', account.value)
})

const onCoinItemClick = (index: number) => {
  selectedCoinIndex.value = index
}

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
})

</script>

<style lang='sass' scoped>
.container
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white

.selector-icon
  padding: 10px 8px 10px 0px
  color: $grey-6

.toggle-btn
  border: 1px solid #027be3
</style>
