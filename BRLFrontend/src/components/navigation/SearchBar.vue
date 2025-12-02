<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  // TODO: Implement search functionality
  // This should emit an event or update a shared state
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
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
</template>

<style scoped>
@import './styles/SearchBar.css';
</style>
