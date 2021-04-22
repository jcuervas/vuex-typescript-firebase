<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="recover"
            autofocus>
      <div class="items-center">
        <q-icon color="grey" name="account_circle"/>
      </div>

      <q-input
        v-model="email"
        :label="i18n.global.t('auth.emailPlaceholder')"
        color="grey-3"
        label-color="grey"
        outlined
        autocomplete="email"
        @keypress="onInputChange"/>

      <q-btn v-if="!sendingRecover || !recoveryDone"
             :color="!error ? 'primary' : 'grey'"
             :disabled="!!error"
             type="submit"
             :label="i18n.global.t('auth.recover')"
             icon-right="navigate_next"
             unelevated
             rounded/>

      <q-btn clickable tag="a" :to="{name: 'Home'}"
             color="grey"
             type="button"
             :label="i18n.global.t('back')"
             icon="navigate_before"
             unelevated class="rem-button rem-icon-left" rounded/>

      <p class="form-success" v-if="recoveryDone"><br/>{{ i18n.global.t('auth.recoverySuccessMessage') }}</p>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'src/store'
import { i18n } from 'boot/i18n'

export default defineComponent({
  name: 'Recover',
  setup () {
    const store = useStore()
    const email = ref<string>('')
    const error = ref<string>('')
    const recoveryDone = ref<boolean>(false)
    const sendingRecover = ref<boolean>(false)

    async function recover () {
      sendingRecover.value = true

      try {
        await store.dispatch('recover', email.value)
        recoveryDone.value = true
        email.value = ''
      } catch (e) {
        error.value = i18n.global.t(`errors.${(e as Error).message}`)
      }
    }

    function onInputChange () {
      error.value = ''
    }

    return {
      recover,
      email,
      i18n,
      error,
      sendingRecover,
      recoveryDone,
      formError,
      onInputChange
    }
  }
})
</script>
