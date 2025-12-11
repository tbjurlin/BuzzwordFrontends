<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutWrapper from './components/LayoutWrapper.vue'
import FooterBar from './components/FooterBar.vue'
import TopBar from './components/TopBar.vue'
import { useAuth } from './stores/auth'


const { isAuthenticated } = useAuth()
const brlUrl = import.meta.env.VITE_BRL_URL
</script>

<template>
  <TopBar v-if="isAuthenticated" />
  <LayoutWrapper v-if="!isAuthenticated">
    <RouterView />
  </LayoutWrapper>
  <div v-else class="authenticated-content">
    <RouterView />
  </div>
  <FooterBar />
</template>

<style scoped>
.authenticated-content {
  min-height: calc(100vh - 80px);
}
</style>
