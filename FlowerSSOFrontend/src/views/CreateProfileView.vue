<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, type UserRole } from '../stores/auth'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const { submitProfileRequest } = useAuth()

// Form fields
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const title = ref('')
const department = ref('')
const country = ref('')
const role = ref<UserRole>('user')

// UI state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Handle form submission
const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validation
  if (!email.value || !password.value || !confirmPassword.value || 
      !firstName.value || !lastName.value || !title.value || 
      !department.value || !country.value) {
    errorMessage.value = 'All fields are required'
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }

  // Password match validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // Password strength validation
  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    return
  }

  // Submit profile request
  submitProfileRequest({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    title: title.value,
    department: department.value,
    country: country.value,
    role: role.value
  })

  successMessage.value = 'Profile request submitted successfully! An administrator will review your request.'
  
  // Reset form
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  firstName.value = ''
  lastName.value = ''
  title.value = ''
  department.value = ''
  country.value = ''
  role.value = 'user'

  // Redirect to home after 3 seconds
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 3000)
}

// Cancel and go back to home
const handleCancel = () => {
  router.push({ name: 'home' })
}
</script>

<template>

  <TopBar/>
  <div class="create-profile-container">
    <div class="create-profile-card">
      <h2 class="create-profile-title">Create Profile</h2>
      <p class="create-profile-subtitle">
        Submit your information for account approval
      </p>

      <!-- Success message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="create-profile-form">
        <!-- Personal Information Section -->
        <div class="form-section">
          <h3 class="section-title">Personal Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">First Name *</label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                class="form-input"
                placeholder="John"
              />
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">Last Name *</label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                class="form-input"
                placeholder="Doe"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="john.doe@example.com"
              autocomplete="username"
            />
          </div>
        </div>

        <!-- Professional Information Section -->
        <div class="form-section">
          <h3 class="section-title">Professional Information</h3>

          <div class="form-group">
            <label for="title" class="form-label">Job Title *</label>
            <select id="title" v-model="title" class="form-select">
              <option value="" disabled>Select your job title</option>
              <option value="Aide">Aide</option>
              <option value="Developer">Developer</option>
              <option value="Sales Agent">Sales Agent</option>
              <option value="Manager">Manager</option>
              </select>
          </div>

          <div class="form-group">
            <label for="department" class="form-label">Department *</label>
            <select id="department" v-model="department" class="form-select">
              <option value="" disabled>Select your department</option>
              <option value="Legal">Legal</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              </select>
          </div>

          <div class="form-group">
            <label for="country" class="form-label">Country *</label>
            <select id = "country" v-model="country" class="form-select">
              <option value="" disabled>Select your country</option>
              <option value="USA">United States</option>
              <option value="Japan">Japan</option>
              <option value="Brazil">Brazil</option>
              <option value="Germany">Germany</option>
              <option value="SA">South Africa</option>
            </select>
          </div>

          <div class="form-group">
            <label for="role" class="form-label">User Role *</label>
            <select id="role" v-model="role" class="form-select">
              <option value="user">User</option>
              <option value="contributor">Contributor</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        <!-- Security Section -->
        <div class="form-section">
          <h3 class="section-title">Security</h3>

          <div class="form-group">
            <label for="password" class="form-label">Password *</label>
            <div class="password-wrapper">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Minimum 8 characters"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showPassword = !showPassword"
                aria-label="Toggle password visibility"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password *</label>
            <div class="password-wrapper">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Re-enter password"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="toggle-password-btn"
                @click="showConfirmPassword = !showConfirmPassword"
                aria-label="Toggle password visibility"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="handleCancel">
            Cancel
          </button>
          <button type="submit" class="btn-submit">
            Submit Request
          </button>
        </div>
        <p style="font-style: italic; font-size:12px; color: gray;">*Upon submitting, your profile will be sent for approval by an existing manager.*</p>
      </form>
    </div>
  </div>
</template>

<style scoped src="./styles/CreateProfileView.css"></style>
