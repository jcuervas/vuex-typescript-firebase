<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="recover"
            class="col-3" autofocus>
      <q-input v-model="email" label="Usuario" autocomplete="username"/>
      <q-btn color="primary" type="submit" label="Login" class="custom"/>
      <p class="error">{{ error }}</p>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Recover',
  setup () {
    const store = useStore()
    const router = useRouter()
    const email = ref<string>('')
    const error = ref<string>('')

    async function recover () {
      try {
        await store.dispatch('authModule/recover', email.value)
        return router.push({ name: 'Home' })
      } catch (e) {
        error.value = e.message
      }
    }

    return {
      recover,
      email,
      error
    }
  }
})
</script>

<style scoped lang="scss">

</style>
