<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const searchQuery = ref('')
const selectedTag = ref('all')

const tags = [
  { value: 'all', label: 'All Tags' },
  { value: 'research', label: 'Research' },
  { value: 'development', label: 'Development' },
  { value: 'documentation', label: 'Documentation' },
]

const handleSearch = () => {
  // Implement search functionality
  console.log('Search for:', searchQuery.value, 'with tag:', selectedTag.value)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="layout">
    <!-- Header with Title -->
    <header class="header">
      <h1 class="title">Buzzworthy Resource Locator</h1>
    </header>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-left">
        <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
        <RouterLink to="/create-resource" class="nav-link" active-class="active">
          Create Resource
        </RouterLink>
        <RouterLink to="/view-resources" class="nav-link" active-class="active">
          View Resources
        </RouterLink>
        <a href="https://flower-sso.example.com" class="nav-link" target="_blank">
          Flower SSO
        </a>
      </div>

      <!-- Search Section on the Right -->
      <div class="nav-right">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search resources..."
            class="search-input"
            @keypress="handleKeyPress"
          />
          <select v-model="selectedTag" class="tag-select">
            <option v-for="tag in tags" :key="tag.value" :value="tag.value">
              {{ tag.label }}
            </option>
          </select>
          <button @click="handleSearch" class="search-btn">Search</button>
        </div>
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
