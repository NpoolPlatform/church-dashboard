<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_LANGUAGE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='country.Country'
        :label='$t("MSG_COUNTRY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='country.Flag'
        :label='$t("MSG_COUNTRY_FLAG")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='country.Code'
        :label='$t("MSG_COUNTRY_CODE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='country.Short'
        :label='$t("MSG_SHORT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
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
import { ref, defineEmits, watch } from 'vue'
import { Country } from 'src/store/languages/types'

const country = ref({} as Country)

const emit = defineEmits<{(e: 'submit', info: Country): void,
  (e: 'update', info: Country): void
}>()

watch(country, () => {
  // TODO: fileter the list
  emit('update', country.value)
})

const onSubmit = () => {
  emit('submit', country.value)
}

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
