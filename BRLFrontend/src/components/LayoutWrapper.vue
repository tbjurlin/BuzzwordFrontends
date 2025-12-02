<script setup lang="ts">
import FooterBar from './FooterBar.vue'
import NavMenu from './navigation/NavMenu.vue'
import SearchBar from './navigation/SearchBar.vue'
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
