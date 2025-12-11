<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutWrapper from './components/LayoutWrapper.vue'
import FooterBar from './components/FooterBar.vue'
import TopBar from './components/TopBar.vue'
import { useAuth } from './stores/auth'
import { onMounted, ref } from 'vue'


const { isAuthenticated, checkAuth } = useAuth()
const brlUrl = import.meta.env.VITE_BRL_URL

onMounted(() => {
  checkAuth((_) => {})
})
</script>

<template>
  <div :class="{'authenticated-content': isAuthenticated}">
    <RouterView />
  </div>
  <FooterBar />
</template>

<style scoped>
.authenticated-content {
  min-height: calc(100vh - 80px);
}
</style>
