<script setup lang="ts">
import { useAuth } from '../stores/auth'

const { isAuthenticated } = useAuth()
</script>

<template>
  <div class="layout">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="connecting-message">
        <h4 v-if="isAuthenticated">Connected to <img src="../assets/favIcon.png" alt ="Flower SSO logo" class="company-logo"></h4>
        <h4 v-else>Connecting to <img src="../assets/favIcon.png" alt ="Flower SSO logo" class="company-logo">
        <span class="connecting-text">Sign in with your account to access BRL Dashboard</span>
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
