<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="nav-menu-container">
    <!-- Hamburger Button -->
    <button 
      class="hamburger-btn" 
      @click="toggleMenu"
      :aria-expanded="isMenuOpen"
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Navigation Menu -->
    <div class="nav-menu" :class="{ 'menu-open': isMenuOpen }">
      <RouterLink 
        to="/" 
        class="nav-link" 
        active-class="active"
        @click="closeMenu"
      >
        Home
      </RouterLink>
      <RouterLink 
        to="/create-resource" 
        class="nav-link" 
        active-class="active"
        @click="closeMenu"
      >
        Create Resource
      </RouterLink>
      <RouterLink 
        to="/your-resources" 
        class="nav-link" 
        active-class="active"
        @click="closeMenu"
      >
        Your Resources
      </RouterLink>
      <RouterLink 
        to="/about-us" 
        class="nav-link" 
        active-class="active"
        @click="closeMenu"
      >
        About Us
      </RouterLink>
    </div>

    <!-- Overlay for mobile menu -->
    <div 
      v-if="isMenuOpen" 
      class="menu-overlay" 
      @click="closeMenu"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped>
@import './styles/NavMenu.css';
</style>
