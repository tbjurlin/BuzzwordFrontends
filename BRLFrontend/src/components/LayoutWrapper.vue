<script setup lang="ts">
import NavMenu from './navigation/NavMenu.vue'
import SearchBar from './navigation/SearchBar.vue'
</script>

<template>
  <div class="layout">
    <!-- Header with Title -->
    <header class="header">
      <h1 class="title">Buzzworthy Resource Locator</h1>
    </header>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <NavMenu/>

      <!-- Search Section on the Right -->
      <div class="nav-right">
        <SearchBar/>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot></slot>
    </main>

    <!-- Footer -->
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
    </footer>
  </div>
</template>

<style scoped>
@import './styles/LayoutWrapper.css';
</style>
