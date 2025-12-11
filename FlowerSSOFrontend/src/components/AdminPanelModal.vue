<script setup lang="ts">
import { computed, watch, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, type UserRole } from '../stores/auth'
import feather from 'feather-icons'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const { pendingRequests, createUser } = useAuth()

// Get count of pending requests
const pendingCount = computed(() => pendingRequests.value.length)

// View state: 'main' | 'create-user'
const currentView = ref<'main' | 'create-user'>('main')

// Form fields for creating a new user
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

const closeModal = () => {
  // Reset to main view when closing
  currentView.value = 'main'
  resetForm()
  emit('close')
}

// Navigate to pending requests page and close modal
const goToPendingRequests = () => {
  router.push({ name: 'admin-pending-requests' })
  closeModal()
}

// Navigate to user list page and close modal
const goToUserList = () => {
  router.push({ name: 'admin-users' })
  closeModal()
}

// Show create user form
const showCreateUserForm = () => {
  currentView.value = 'create-user'
  resetForm()
}

// Go back to main admin panel view
const backToMain = () => {
  currentView.value = 'main'
  resetForm()
}

// Reset form fields and messages
const resetForm = () => {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  firstName.value = ''
  lastName.value = ''
  title.value = ''
  department.value = ''
  country.value = ''
  role.value = 'user'
  errorMessage.value = ''
  successMessage.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
}

// Handle form submission
const handleCreateUser = () => {
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

  // Create new user directly (no approval needed)
  const success = createUser({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    title: title.value,
    department: department.value,
    country: country.value,
    role: role.value
  })

  if (success) {
    successMessage.value = 'User created successfully!'
    
    // Reset form and go back to main view after 2 seconds
    setTimeout(() => {
      backToMain()
    }, 2000)
  } else {
    errorMessage.value = 'A user with this email already exists'
  }
}

// Watch for modal open state and replace feather icons when it opens
watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    feather.replace()
  }
})

// Watch for view changes to update feather icons
watch(currentView, async () => {
  await nextTick()
  feather.replace()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">{{ currentView === 'main' ? 'Admin Panel' : 'Create New User' }}</h2>
            <button class="close-btn" @click="closeModal" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-content">
            <!-- Main Admin Panel View -->
            <div v-if="currentView === 'main'" class="admin-panel-info">
              <div class="admin-section">
                <h3 class="section-title">Admin Actions</h3>
                
                <div class="admin-actions">
                  <button class="admin-action-card" @click="showCreateUserForm">
                    <div class="action-icon">
                      <i data-feather="user-plus"></i>
                    </div>
                    <div class="action-info">
                      <h3 class="action-title">Create New User</h3>
                      <p class="action-description">
                        Create a new user account directly
                      </p>
                    </div>
                  </button>
                  <button class="admin-action-card" @click="goToUserList">
                    <div class="action-icon">
                      <i data-feather="users"></i>
                    </div>
                    <div class="action-info">
                      <h3 class="action-title">User List</h3>
                      <p class="action-description">
                        View and manage all registered users
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Create User Form View -->
            <div v-else-if="currentView === 'create-user'" class="create-user-form-container">
              <!-- Success message -->
              <div v-if="successMessage" class="success-message">
                {{ successMessage }}
              </div>

              <!-- Error message -->
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>

              <form @submit.prevent="handleCreateUser" class="create-user-form">
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
                      <option value="" disabled>Select job title</option>
                      <option value="Aide">Aide</option>
                      <option value="Developer">Developer</option>
                      <option value="Sales Agent">Sales Agent</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="department" class="form-label">Department *</label>
                    <select id="department" v-model="department" class="form-select">
                      <option value="" disabled>Select department</option>
                      <option value="Legal">Legal</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="country" class="form-label">Country *</label>
                    <select id="country" v-model="country" class="form-select">
                      <option value="" disabled>Select country</option>
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
                  <button type="button" class="btn-cancel" @click="backToMain">
                    Cancel
                  </button>
                  <button type="submit" class="btn-submit">
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped src="./styles/AdminPanelModal.css"></style>
