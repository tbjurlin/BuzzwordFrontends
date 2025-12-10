<script setup lang="ts">
import { useResource } from '@/composables/useResource'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const formData = ref({
  title: '',
  description: '',
  url: '',
})

const errorMessage = ref('')
const isSubmitting = ref(false)
const isLoading = ref(true)

const titleMaxLength = 64;

const titleCharCount = computed(() => formData.value.title.length);

const { getResourceById, updateResource } = useResource();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const resourceId = Number(route.params.id);
  if (resourceId) {
    getResourceById(
      resourceId,
      (resource) => {
        formData.value = {
          title: resource.title,
          description: resource.description,
          url: resource.url,
        }
        isLoading.value = false;
      },
      (reason) => {
        isLoading.value = false;
        errorMessage.value = 'Failed to load resource. Please try again.';
      }
    );
  }
});

const handleSubmit = () => {
  // Prevent double submission
  if (isSubmitting.value) {
    return;
  }

  errorMessage.value = '';

  // Validate form
  if (!formData.value.title || !formData.value.description) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  if (formData.value.title.trim().length === 0) {
    errorMessage.value = 'Title cannot be empty or contain only spaces.'
    return;
  }

  if (formData.value.description.trim().length === 0) {
    errorMessage.value = 'Description cannot be empty or contain only spaces.'
    return;
  }

  isSubmitting.value = true;

  updateResource(
    Number(route.params.id),
    formData.value.title,
    formData.value.url,
    formData.value.description,
    () => {
      isSubmitting.value = false;
      errorMessage.value = '';
      router.push({ name: 'resource', params: { id: route.params.id } })
    },
    (reason) => {
      isSubmitting.value = false;
      // Handle API errors
      if (reason.response?.status === 403) {
        errorMessage.value = 'You do not have permission to edit this resource.';
      } else if (reason.response?.data?.message) {
        errorMessage.value = reason.response.data.message;
      } else if (reason.message) {
        errorMessage.value = reason.message;
      } else {
        errorMessage.value = 'Failed to update resource. Please try again.';
      }
    }
  )
}

</script>

<template>
  <div class="edit-resource-view">
    <div v-if="isLoading" class="loading-message">
      Loading resource...
    </div>
    <div v-else>
      <h2>Edit Resource</h2>
      <form @submit.prevent="handleSubmit" class="resource-form">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="title">Title *</label>
          <div class="input-wrapper">
            <input
              id="title"
              v-model="formData.title"
              :maxlength="titleMaxLength"
              type="text"
              placeholder="Enter resource title"
              required
              :disabled="isSubmitting"
            />
            <div class="char-count">{{ titleCharCount }}/{{ titleMaxLength }}</div>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <div class="textarea-wrapper">
            <textarea
              id="description"
              v-model="formData.description"
              placeholder="Enter resource description"
              rows="4"
              required
              :disabled="isSubmitting"
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="url">URL</label>
          <input id="url" v-model="formData.url" type="url" placeholder="Enter resource URL" :disabled="isSubmitting" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Updating...' : 'Update Resource' }}
          </button>
          <button type="button" class="btn-secondary" @click="router.back()">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/CreateResourceView.css';
</style>
