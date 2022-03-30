<template>
  <q-table
    dense
    flat
    :rows='languages'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateLanguageClick'>
          {{ $t('MSG_ADD_LANGUAGE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    dense
    flat
    :rows='countries'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateCountryClick'>
          {{ $t('MSG_ADD_COUNTRY') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='adding'
    position='right'
    full-width
    square
    no-shake
  >
    <CreateLang v-if='addingType === AddingType.AddingLang' @update='onUpdateLang' @submit='onSubmitLang' />
    <CreateCountry v-if='addingType === AddingType.AddingCountry' @update='onUpdateCountry' @submit='onSubmitCountry' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as LangActionTypes } from 'src/store/languages/action-types'
import { Country, Language } from 'src/store/languages/types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'

const CreateLang = defineAsyncComponent(() => import('src/components/lang/CreateLang.vue'))
const CreateCountry = defineAsyncComponent(() => import('src/components/lang/CreateCountry.vue'))

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const adding = ref(false)
enum AddingType {
  AddingLang = 'lang',
  AddingCountry = 'country'
}
const addingType = ref(AddingType.AddingLang)

const languages = computed(() => store.getters.getLanguages)
const countries = computed(() => store.getters.getCountries)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleInternationalization)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })

  store.dispatch(LangActionTypes.GetLanguages, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_LANGUAGES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onCreateLanguageClick = () => {
  adding.value = true
  addingType.value = AddingType.AddingLang
}

const onCreateCountryClick = () => {
  adding.value = true
  addingType.value = AddingType.AddingCountry
}

const onUpdateLang = (lang: Language) => {
  console.log('update', lang)
}

const onSubmitLang = (lang: Language) => {
  adding.value = false
  store.dispatch(LangActionTypes.AddLanguage, {
    Info: lang,
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_CREATE_LANGUAGE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onUpdateCountry = (country: Country) => {
  console.log('update', country)
}

const onSubmitCountry = (country: Country) => {
  adding.value = false
  store.dispatch(LangActionTypes.CreateCountry, {
    Info: country,
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_CREATE_COUNTRY_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

</script>
