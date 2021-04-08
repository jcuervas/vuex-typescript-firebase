<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="login"
            class="col-3" autofocus greedy >
      <q-input name="username" label="Usuario" :model-value="state.username"/>
      <q-input name="password" label="Contraseña" :model-value="state.password"/>
      <q-btn color="primary" label="Login"/>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { LooseDictionary } from 'quasar/dist/types/ts-helpers'

interface FormData {
  username: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  setup () {
    const state = reactive<FormData>({
      username: '',
      password: ''
    })
    function login (ev : LooseDictionary) {
      console.log({ ev })
    }

    return {
      login,
      state
    }
  }
})
</script>

<style scoped>

</style>
