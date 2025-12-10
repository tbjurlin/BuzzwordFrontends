<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter();

const handleSearch = () => {
  router.push({
    name: 'search',
    query: {
      q: searchQuery.value
    }
  })
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
