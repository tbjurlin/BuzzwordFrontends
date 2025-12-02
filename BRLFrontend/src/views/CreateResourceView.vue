<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  title: '',
  description: '',
  url: '',
  file: null as File | null,
})

const fileInputRef = ref<HTMLInputElement | null>(null)

const handleSubmit = () => {
  // Validate form
  if (!formData.value.title || !formData.value.description) {
    alert('Please fill in all required fields')
    return
  }

  // TODO: Implement actual API call to submit resource
  // For now, just log and show success message

  // Reset form
  formData.value = {
    title: '',
    description: '',
    url: '',
    file: null,
  }
  alert('Resource created successfully!')
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    formData.value.file = input.files[0] || null
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="create-resource-view">
    <h2>Create New Resource</h2>
    <form @submit.prevent="handleSubmit" class="resource-form">
      <div class="form-group">
        <label for="title">Title *</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="Enter resource title"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Description *</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Enter resource description"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="url">URL</label>
        <input id="url" v-model="formData.url" type="url" placeholder="Enter resource URL" />
      </div>

      <div class="form-group">
        <label>File Upload</label>
        <input
          ref="fileInputRef"
          type="file"
          style="display: none"
          @change="handleFileSelect"
        />
        <button type="button" class="btn-secondary" @click="triggerFileInput">
          Choose File
        </button>
        <span v-if="formData.file" class="file-name">{{ formData.file.name }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">Create Resource</button>
        <button type="button" class="btn-secondary" @click="handleSubmit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/CreateResourceView.css';
</style>
