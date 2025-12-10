<script setup lang="ts">
import { useResource } from '@/composables/useResource'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const formData = ref({
  title: '',
  description: '',
  url: '',
})

const fileInputRef = ref<HTMLInputElement | null>(null)

const createResource = useResource().createResource;
const router = useRouter();

const handleSubmit = () => {
  // Validate form
  if (!formData.value.title || !formData.value.description) {
    alert('Please fill in all required fields')
    return
  }

  createResource(
    formData.value.title,
    formData.value.url,
    formData.value.description,
    (newId) => {
      // Reset form
      formData.value = {
        title: '',
        description: '',
        url: '',
      }

      router.push({ name: 'resource', params: { id: newId } })
    },
    (reason) => {}
  )

  // TODO: Implement actual API call to submit resource
  // For now, just log and show success message

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
