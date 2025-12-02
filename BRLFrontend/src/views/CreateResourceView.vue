<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  title: '',
  description: '',
  category: 'education',
  tags: '',
  url: '',
  file: null as File | null,
})

const selectedTags = ref<string[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

const categories = ['education', 'research', 'development', 'documentation', 'other']

const handleSubmit = () => {
  // Validate form
  if (!formData.value.title || !formData.value.description) {
    alert('Please fill in all required fields')
    return
  }

  console.log('Submitting resource:', {
    ...formData.value,
    tags: selectedTags.value,
  })

  // Reset form
  formData.value = {
    title: '',
    description: '',
    category: 'education',
    tags: '',
    url: '',
    file: null,
  }
  selectedTags.value = []
  alert('Resource created successfully!')
}

const addTag = () => {
  if (formData.value.tags.trim() && !selectedTags.value.includes(formData.value.tags.trim())) {
    selectedTags.value.push(formData.value.tags.trim())
    formData.value.tags = ''
  }
}

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag)
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    formData.value.file = input.files[0]
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="create-resource-view">
    <!-- Empty create resource page - content can be added here -->
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/CreateResourceView.css';
</style>
