<template>
  <div class="password-box">
    <h2 class="box-title">Change Password</h2>
    
    <form @submit.prevent="handleChangePassword" class="password-form">
      
      <div class="form-group">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="form-input"
          required
        />
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <button type="submit" class="change-password-btn">
        Change Password
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useBackend } from '@/composables/useBackend'
import { ref } from 'vue'

const props = defineProps<{userId: number}>()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const { changePassword } = useBackend()

const handleChangePassword = () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'New passwords do not match.'
    return
  }
  
  if (newPassword.value.length < 12) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }
  
  // Simulate API call
  changePassword(
    newPassword.value,
    () => {
      successMessage.value = "Password Successfully Changed!"
      errorMessage.value = ''
    },
    () => {
      errorMessage.value = "Password Change Failed"
      successMessage.value = ''
    }
  )
}
</script>

<style scoped src="./styles/PasswordChange.css"></style>
