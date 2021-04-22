<template>
  <router-view/>
</template>
<script>
// $q symbol is not found if lang=ts is specified so we provide here for others components
import { defineComponent, provide } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup () {
    provide('$q', useQuasar())
  }
})
</script>

<style lang="scss">

</style>
