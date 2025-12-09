<template>
  <div class="password-box">
    <h2 class="box-title">Change Password</h2>
    
    <form @submit.prevent="handleChangePassword" class="password-form">
      <div class="form-group">
        <label for="currentPassword" class="form-label">Current Password</label>
        <input
          id="currentPassword"
          v-model="currentPassword"
          type="password"
          class="form-input"
          required
        />
      </div>
      
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
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleChangePassword = () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'New passwords do not match.'
    return
  }
  
  if (newPassword.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }
  
  // Simulate API call
  setTimeout(() => {
    successMessage.value = 'Password changed successfully!'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }, 1000)
}
</script>

<style scoped src="./styles/PasswordChange.css"></style>
