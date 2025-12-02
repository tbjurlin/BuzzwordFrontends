<script setup lang="ts">
import { ref } from 'vue'

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
</template>

<style scoped>
@import './styles/SearchBar.css';
</style>
