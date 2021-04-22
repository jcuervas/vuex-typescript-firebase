<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      @submit="login"
      class="rem-form-page"
      autofocus>

      <q-input
        v-model="username"
        autocomplete="username"
        :label="i18n.t('auth.userPlaceholder')"
        color="grey-3"
        label-color="grey"
        outlined
        @keypress="onInputChange"
        lazy-rules
        :rules="[ val => val && val.length > 0 || i18n.global.t('errors.inputValidation')]"
      />

      <q-input v-model="password" :type="isPwd ? 'password' : 'text'"
               :label="i18n.global.t('auth.passwordPlaceHolder')"
               autocomplete="password"
               color="grey-3"
               label-color="grey"
               outlined
               lazy-rules
               :rules="[ val => val && val.length > 0 || i18n.global.t('errors.inputValidation')]">
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
        />
      </q-input>

      <q-btn :color="!error ? 'primary' : 'grey'" :disabled="!!error" type="submit"
             :label="i18n.global.t('auth.login')" icon-right="navigate_next" unelevated
             class="rem-button rem-icon-right"
             rounded/>

      <p v-if="error" class="q-field--error">{{ error }}</p>

      <div class="rem-centered-items">
        <router-link :to="{name: 'Recover'}">{{ i18n.global.t('auth.forgotPassword') }}</router-link>
      </div>
    </q-form>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import useAuth from 'src/hooks/useAuth'
import { i18n } from 'boot/i18n'

export default defineComponent({
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const username = ref<string>('')
    const password = ref<string>('')
    const isPwd = ref<boolean>(true)
    const error = ref<string>('')

    async function login () {

      try {
        await store.dispatch('login', {
          username: username.value,
          password: password.value
        })
        if (!useAuth.hasAnyClaim()) {
          error.value = i18n.t('error.userNoAssignedRoles')
          return store.dispatch('logout')
        }
        return router.push({ name: 'Home' })
      } catch (e) {
        error.value = (e as Error).message
      }
    }

    function onInputChange () {
      error.value = ''
    }

    return {
      login,
      username,
      password,
      isPwd,
      state,
      i18n,
      onInputChange,
      error
    }
  }
})
</script>
