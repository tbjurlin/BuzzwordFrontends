<script setup lang="ts">
<<<<<<< Updated upstream
import FooterBar from './FooterBar.vue';
import NavMenu from './navigation/NavMenu.vue'
import SearchBar from './navigation/SearchBar.vue'
=======
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const searchQuery = ref('')

const handleSearch = () => {
  // Implement search functionality
  console.log('Search for:', searchQuery.value)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
>>>>>>> Stashed changes
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
      <NavMenu/>

      <!-- Search Section on the Right -->
<<<<<<< Updated upstream
      <SearchBar/>
=======
      <div class="nav-right">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search resources..."
            class="search-input"
            @keypress="handleKeyPress"
          />
          <button @click="handleSearch" class="search-btn">Search</button>
        </div>
      </div>
>>>>>>> Stashed changes
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot></slot>
    </main>

    <!-- Footer -->
<<<<<<< Updated upstream
    <FooterBar/>
=======
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Copyright</h4>
          <p>&copy; 2025 Buzzworthy Resource Locator. All rights reserved.</p>
        </div>
        <div class="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#documentation">Documentation</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@brl.com">Email Support</a></li>
            <li><a href="#contact-form">Contact Form</a></li>
          </ul>
        </div>
      </div>
      <hr>
    </footer>
>>>>>>> Stashed changes
  </div>
</template>

<style scoped>
@import './styles/LayoutWrapper.css';
</style>
