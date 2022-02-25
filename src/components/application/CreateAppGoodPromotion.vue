<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_RECOMMEND') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-btn-dropdown
        dense
        split
        icon='window'
        no-caps
        align='left'
        :label='selectedGoodName'
      >
        <q-list>
          <q-item
            v-for='appGood in appGoods'
            :key='appGood.ID'
            v-close-popup
            clickable
            @click='onAppGoodItemClick(appGood)'
          >
            <q-item-label>{{ store.getters.getGoodByID(appGood.GoodID)?.Good?.Good.Title }}</q-item-label>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-item>
        <q-input v-model='message' :label='t("MSG_PROMOTION_REASON")' />
      </q-item>
      <q-item>
        <q-input v-model='start' :label='t("MSG_START_TIME")' />
      </q-item>
      <q-item>
        <q-input v-model='end' :label='t("MSG_END_TIME")' />
      </q-item>
      <q-item>
        <q-input v-model='price' :label='t("MSG_GOOD_PRICE")' />
      </q-item>
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
import { ref, defineProps, toRef, computed, defineEmits, watch, onMounted } from 'vue'
import { Application, AppGoodPromotion, AppGood } from 'src/store/applications/types'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  selectedApp?: Application
  editPromotion?: AppGoodPromotion
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editPromotion = toRef(props, 'editPromotion')

const appGoods = computed(() => store.getters.getAppGoodsByAppID(selectedApp.value?.App.ID as string))

const myAppGood = computed(() => {
  for (let i = 0; i < appGoods.value.length; i++) {
    if (appGoods.value[i].AppID === editPromotion.value?.AppID && appGoods.value[i].GoodID === editPromotion.value?.GoodID) {
      return appGoods.value[i]
    }
  }
  return {} as AppGood
})
const selectedAppGood = ref(myAppGood.value)
const selectedGood = computed(() => store.getters.getGoodByID(selectedAppGood.value?.GoodID))

const selectedGoodName = ref(selectedGood.value?.Good?.Good.Title)
watch(selectedGood, () => {
  selectedGoodName.value = selectedGood.value.Good.Good.Title
})

const selectedGoodID = computed(() => selectedGood.value?.Good?.Good.ID)

const start = ref(editPromotion.value?.Start ? editPromotion.value?.Start : (new Date().getTime() / 1000 + 24 * 60 * 60).toFixed(0))
const end = ref(editPromotion.value?.End ? editPromotion.value?.End : (new Date().getTime() / 1000 + 60 * 24 * 60 * 60).toFixed(0))
const price = ref(editPromotion.value?.Price ? editPromotion.value?.Price : selectedAppGood.value?.Price)
watch(selectedAppGood, () => {
  price.value = selectedAppGood.value?.Price
})

const message = ref(editPromotion.value?.Message)

const goodPromotion = computed(() => {
  return {
    ID: editPromotion.value?.ID,
    AppID: selectedApp.value?.App.ID,
    GoodID: selectedGoodID.value,
    Message: message.value,
    Start: start.value,
    End: end.value,
    Price: price.value
  } as AppGoodPromotion
})

watch(goodPromotion, () => {
  emit('update', goodPromotion.value)
})

const emit = defineEmits<{(e: 'submit', info: AppGoodPromotion): void,
  (e: 'update', info: AppGoodPromotion): void
}>()

const onSubmit = () => {
  emit('submit', goodPromotion.value)
}

const onAppGoodItemClick = (appGood: AppGood) => {
  selectedAppGood.value = appGood
}

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>

<style lang='sass' scoped>
.container
  padding: 24px
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
