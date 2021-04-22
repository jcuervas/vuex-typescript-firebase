<template>
  <q-layout view="hHh lpR lfr">
    <q-header reveal bordered>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          v-if="breadCrumb.icon"
          flat
          dense
          round
          :icon="breadCrumb.icon"
          aria-label="Menu"
          @click="() => goTo(breadCrumb.to)"
        />

        <q-toolbar-title>
          {{ i18n.global.t(breadCrumb.label) }}
        </q-toolbar-title>

        <q-btn-dropdown color="primary" :label="state.user?.email">
          <q-list>
            <q-item clickable v-close-popup @click="onSettings">
              <q-item-section>
                <q-item-label>Configuracion</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Cerrar sesion</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      :width="70"
      class="bg-grey-1">
      <q-list>
        <q-item-label
          header
          class="text-grey-8">
        </q-item-label>

        <MenuLink
          v-for="link in menuLinks"
          :label="link.label && t(link.label)"
          :link="link.routeName"
          v-bind:key="link"
          :icon="link.icon"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MenuLink from 'components/MenuLink.vue'
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import firebase from 'firebase/compat/app'
import { i18n } from 'boot/i18n'
import { Toolbar } from 'src/router/routes'
import { menu } from 'src/models/menuItem'

interface LayoutState {
  user: firebase.User | null
}

export default defineComponent({
  name: 'MainLayout',
  components: {
    MenuLink
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive<LayoutState>({
      user: store.getters.getUser as firebase.User
    })
    const mainRole = store.getters.mainRole
    const menuLinks = menu.filter(item => item.showIf === mainRole)
    const breadCrumb = computed<Toolbar>(() => route.meta.toolbar as Toolbar)

    function onSettings () {
      return router.push({ name: 'Settings' })
    }

    async function logout () {
      try {
        await store.dispatch('logout')
        return router.push({ name: 'Login' })
      } catch (e) {
        // todo show modal with error
      }
    }

    function goTo (route: string) {
      return router.push({ name: route })
    }

    function t (key: string) {
      return i18n.global.t(`dashboard.${key}`)
    }

    return {
      menuLinks,
      logout,
      onSettings,
      state,
      i18n,
      t,
      goTo,
      breadCrumb
    }
  }
})
</script>
