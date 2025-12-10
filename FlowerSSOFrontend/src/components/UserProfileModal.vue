<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../stores/auth'
import { useRouter } from 'vue-router'
import PasswordChange from './PasswordChange.vue'
import ConfirmModal from './ConfirmModal.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const { currentUser, deleteUser } = useAuth()
const showPasswordChange = ref(false)
const showDeleteConfirm = ref(false)

const closeModal = () => {
  emit('close')
}

const togglePasswordChange = () => {
  showPasswordChange.value = !showPasswordChange.value
}

const confirmDeleteAccount = () => {
  showDeleteConfirm.value = true
}

const handleDeleteAccount = () => {
  if (currentUser.value) {
    deleteUser(currentUser.value.id)
    showDeleteConfirm.value = false
    closeModal()
    // User will be logged out automatically by deleteUser function
    router.push({ name: 'home' })
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">User Information</h2>
            <button class="close-btn" @click="closeModal" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-content">
            <div v-if="currentUser" class="profile-info">
              <!-- User Information Section -->
              <div class="info-section">
                <h3 class="section-title">Profile Details</h3>
                
                <div class="info-group">
                  <label class="info-label">Company Email</label>
                  <p class="info-value">{{ currentUser.email }}</p>
                </div>
                
                <div class="info-group">
                  <label class="info-label">Employee Name</label>
                  <p class="info-value">{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                </div>

                <div class="info-group">
                  <label class="info-label">Title</label>
                  <p class="info-value">{{ currentUser.title }}</p>
                </div>
                
                <div class="info-group">
                  <label class="info-label">Department</label>
                  <p class="info-value">{{ currentUser.department }}</p>
                </div>

                <div class="info-group">
                  <label class="info-label">Location</label>
                  <p class="info-value">{{ currentUser.country }}</p>
                </div>
              </div>

              <!-- Password Change Section -->
              <div class="password-section">
                <button 
                  @click="togglePasswordChange" 
                  class="toggle-password-btn"
                >
                  {{ showPasswordChange ? 'Cancel Change' : 'Change Password' }}
                </button>
                <button 
                    @click="confirmDeleteAccount" 
                    class="btn-delete-account"
                  >
                    Delete My Account
                  </button>
                <Transition name="slide">
                  <div v-if="showPasswordChange" class="password-change-wrapper">
                    <PasswordChange />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteConfirm"
      title="Delete Your Account"
      message="Are you sure you want to delete your account? This action is permanent and cannot be undone. You will be logged out immediately."
      confirm-text="Delete Account"
      cancel-text="Cancel"
      :is-dangerous="true"
      @confirm="handleDeleteAccount"
      @cancel="cancelDelete"
    />
  </Teleport>
</template>

<style scoped src="./styles/UserProfileModal.css"></style>
