<template>
  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <q-form @submit="login"
                class="col-3" autofocus>
          <q-input v-model="username" label="Usuario" autocomplete="username"/>
          <q-input v-model="password" :type="isPwd ? 'password' : 'text'"
                   label="Contraseña" autocomplete="password">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn color="primary" type="submit" label="Login"/>
          <p class="error">{{error}}</p>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const username = ref<string>('admin@remotion.es')
    const password = ref<string>('remotion')
    const isPwd = ref<boolean>(true)
    const error = ref<string>('')

    async function login () {
      try {
        await store.dispatch('authModule/login', {username: username.value, password: password.value})
        return router.push({ name: 'Home' })
      } catch (e) {
        error.value = e.message
      }
    }

    return {
      login,
      username,
      password,
      isPwd,
      error
    }
  }
})
</script>

<style scoped>

</style>
