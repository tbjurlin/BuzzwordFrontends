<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import feather from 'feather-icons'

const username = ref('')
const password = ref('')
const keepSignedIn = ref(false)
const showPassword = ref(false)

const handleSignIn = () => {
  console.log('Sign in clicked', { username: username.value })
  // Add your authentication logic here
}

onMounted(() => {
  // Replace feather icons after component is mounted
  feather.replace()
})

// Watch for showPassword changes and update the icons
watch(showPassword, async () => {
  await nextTick()
  feather.replace()
})
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Sign In</h2>
      
      <form @submit.prevent="handleSignIn" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="username"
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
        <a href="#" class="help-link">Unlock account?</a>
        <a href="#" class="help-link">Help</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  margin: 0 0 2rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #0073e6;
  box-shadow: 0 0 0 3px rgba(0, 115, 230, 0.1);
}

.password-wrapper {
  position: relative;
}

.show-password-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show-password-btn i {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.show-password-btn:hover {
  color: #333;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.sign-in-btn {
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.sign-in-btn:hover {
  background-color: #0061c2;
}

.sign-in-btn:active {
  background-color: #005099;
}

.help-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.help-link {
  color: #0073e6;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
}

.help-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
}
</style>
