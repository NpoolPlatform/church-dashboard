<template>
  <q-table
    dense
    flat
    :rows='languages'
    @row-click='(evt, row, index) => onLanguageClick(row as Language)'
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
    @row-click='(evt, row, index) => onCountryClick(row as Country)'
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
    @hide='onMenuHide'
  >
    <CreateLang
      v-if='addingType === AddingType.AddingLang'
      :edit-language='editLanguage'
      @update='onUpdateLang'
      @submit='onSubmitLang'
    />
    <CreateCountry
      v-if='addingType === AddingType.AddingCountry'
      :edit-country='editCountry'
      @update='onUpdateCountry'
      @submit='onSubmitCountry'
    />
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
const updating = ref(false)
const editLanguage = ref(undefined as unknown as Language)
const editCountry = ref(undefined as unknown as Country)

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

const onLanguageClick = (language: Language) => {
  adding.value = true
  updating.value = true
  editLanguage.value = language
}

const onCreateCountryClick = () => {
  adding.value = true
  addingType.value = AddingType.AddingCountry
}

const onCountryClick = (country: Country) => {
  adding.value = true
  updating.value = true
  editCountry.value = country
}

const onUpdateLang = (lang: Language) => {
  console.log('update', lang)
}

const onSubmitLang = (lang: Language) => {
  adding.value = false

  let action = LangActionTypes.AddLanguage
  if (updating.value) {
    action = LangActionTypes.UpdateLanguage
  }

  store.dispatch(action, {
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

  let action = LangActionTypes.CreateCountry
  if (updating.value) {
    action = LangActionTypes.UpdateCountry
  }

  store.dispatch(action, {
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

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  editLanguage.value = undefined as unknown as Language
}

</script>
