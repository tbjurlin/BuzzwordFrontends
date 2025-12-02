<script setup lang="ts">
import { ref, computed } from 'vue'

interface Resource {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  uploadedBy: string
  uploadedDate: string
  url: string
  downloads: number
}

const resources = ref<Resource[]>([
  {
    id: '1',
    title: 'Vue 3 Composition API Guide',
    description: 'Comprehensive guide to using Vue 3 Composition API for reactive components',
    category: 'education',
    tags: ['vue', 'javascript', 'frontend'],
    uploadedBy: 'John Doe',
    uploadedDate: '2025-01-15',
    url: 'https://example.com/vue-guide',
    downloads: 234,
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    description: 'Essential TypeScript patterns and best practices for production applications',
    category: 'development',
    tags: ['typescript', 'programming', 'best-practices'],
    uploadedBy: 'Jane Smith',
    uploadedDate: '2025-01-20',
    url: 'https://example.com/ts-practices',
    downloads: 567,
  },
  {
    id: '3',
    title: 'RESTful API Design Patterns',
    description: 'Learn about designing scalable and maintainable REST APIs',
    category: 'documentation',
    tags: ['api', 'rest', 'backend'],
    uploadedBy: 'Bob Wilson',
    uploadedDate: '2025-01-10',
    url: 'https://example.com/rest-api',
    downloads: 345,
  },
  {
    id: '4',
    title: 'Database Optimization Techniques',
    description: 'Research paper on modern database optimization and indexing strategies',
    category: 'research',
    tags: ['database', 'performance', 'sql'],
    uploadedBy: 'Alice Johnson',
    uploadedDate: '2025-01-05',
    url: 'https://example.com/db-optimization',
    downloads: 456,
  },
])

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedTags = ref<string[]>([])
const sortBy = ref('uploadedDate')

// Get all unique tags from resources
const availableTags = computed(() => {
  const tags = new Set<string>()
  resources.value.forEach((resource) => {
    resource.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

// Filter resources based on search and filters
const filteredResources = computed(() => {
  return resources.value.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = selectedCategory.value === 'all' || resource.category === selectedCategory.value

    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => resource.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })
})

// Sort resources
const sortedResources = computed(() => {
  const sorted = [...filteredResources.value]
  if (sortBy.value === 'uploadedDate') {
    sorted.sort((a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime())
  } else if (sortBy.value === 'downloads') {
    sorted.sort((a, b) => b.downloads - a.downloads)
  } else if (sortBy.value === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  }
  return sorted
})

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedTags.value = []
}
</script>

<template>
  <div class="view-resources">
    <!-- Empty view resources page - content can be added here -->
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ViewResourcesView.css';
</style>
