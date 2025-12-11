<script setup lang="ts">
import FooterBar from './FooterBar.vue'
import NavMenu from './navigation/NavMenu.vue'
import SearchBar from './navigation/SearchBar.vue'
import VueFeather from 'vue-feather'

const FlowerSSOUrl = import.meta.env.VITE_FLOWER_SSO_URL || 'http://localhost:5174/'

const redirectToSSO = () => {
  // Redirect to FlowerSSO dashboard (user remains logged in)
  window.location.href = `${FlowerSSOUrl}/dashboard`
}
</script>

<template>
  <div class="layout">
    <!-- Header with Title -->
    <header class="header">
      <h1 class="title">
      <img src="@/assets/logo.png" alt="BRL Logo" class="BRL-logo" /> Buzzworthy Resource Locator</h1>
    </header>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <NavMenu />

      <!-- SSO Button -->
      <button
        class="sso-button"
        @click="redirectToSSO"
        aria-label="Go to SSO Dashboard"
      >
        <VueFeather type="user" size="20" />
      </button>

      <!-- Search Section on the Right -->
      <SearchBar />
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot></slot>
    </main>

    <!-- Footer -->
    <FooterBar />
  </div>
</template>

<style scoped>
@import './styles/LayoutWrapper.css';
</style>
