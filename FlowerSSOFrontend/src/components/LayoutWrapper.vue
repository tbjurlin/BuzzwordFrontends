<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../stores/auth'
import { useRoute } from 'vue-router'

const { isAuthenticated } = useAuth()


const route = useRoute()

// Determine what application is requesting SSO
const requestingApp = computed(() => {
  if (route.query.redirect && typeof route.query.redirect === 'string') {
    try {
      const url = new URL(route.query.redirect)
      // You can customize this based on your application URLs
      if (url.origin.includes('BRL') || url.port === '5173') {
        return 'Buzzworthy Resource Locator'
      }
    } catch (e) {
      // Invalid URL, use default
    }
  }
  return 'Flower SSO'
})
</script>

<template>
  <div class="layout">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="connecting-message">
        <h4 v-if="isAuthenticated">Connected to <img src="../assets/favIcon.png" alt ="Flower SSO logo" class="company-logo"></h4>
        <h4 v-else>Connecting to <img src="../assets/favIcon.png" alt ="Flower SSO logo" class="company-logo">
        <span class="connecting-text">Sign in with your account to access the {{ requestingApp }}</span>
        </h4>
      </div>
    </header>

    <!-- Logo Section -->
    <div class="logo-section">
      <img src="../assets/logo.png" alt="FlowerSSO full Logo" class="company-logo" />
      <h1 class="title">FlowerSSO</h1>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
@import './styles/LayoutWrapper.css';
</style>
