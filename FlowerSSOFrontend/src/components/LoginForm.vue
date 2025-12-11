<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import feather from 'feather-icons'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const keepSignedIn = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const handleSignIn = () => {
  errorMessage.value = ''
  
  const success = login(email.value, password.value)
  
  if (success) {
    // Clean up any URL parameters BEFORE navigating to dashboard
    if (window.location.search) {
      // Remove query parameters from URL without reloading
      window.history.replaceState({}, '', window.location.pathname)
    }
    // Always navigate to dashboard after successful login
    nextTick(() => {
      router.push({ name: 'dashboard' })
    })
  } else {
    errorMessage.value = 'Invalid credentials. Please try again.'
  }
}

onMounted(() => {
  feather.replace()
})

watch(showPassword, async () => {
  await nextTick()
  feather.replace()
})
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Sign In</h2>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleSignIn" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            class="form-input"
            placeholder=""
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder=""
              autocomplete="current-password"
            />
            <button
              type="button"
              class="show-password-btn"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              <i v-if="!showPassword" data-feather="eye"></i>
              <i v-else data-feather="eye-off"></i>
            </button>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              v-model="keepSignedIn"
              type="checkbox"
              class="form-checkbox"
            />
            <span>Keep me signed in</span>
          </label>
        </div>
        
        <button type="submit" class="sign-in-btn">
          Sign in
        </button>
      </form>

      <div class="help-links">
        <a href="#" class="help-link">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<style scoped src="./styles/LoginForm.css"></style>
