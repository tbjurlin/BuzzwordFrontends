<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'
import feather from 'feather-icons'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const { pendingRequests } = useAuth()

// Get count of pending requests
const pendingCount = computed(() => pendingRequests.value.length)

const closeModal = () => {
  emit('close')
}

// Navigate to pending requests page and close modal
const goToPendingRequests = () => {
  router.push({ name: 'admin-pending-requests' })
  closeModal()
}

// Watch for modal open state and replace feather icons when it opens
watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    feather.replace()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Admin Panel</h2>
            <button class="close-btn" @click="closeModal" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="admin-panel-info">
              <!-- Admin Actions Section -->
              <div class="admin-section">
                <h3 class="section-title">Administrative Actions</h3>
                
                <div class="admin-actions">
                  <button class="admin-action-card" @click="goToPendingRequests">
                    <div class="action-icon">
                      <i data-feather="users"></i>
                    </div>
                    <div class="action-info">
                      <h3 class="action-title">Pending Account Requests</h3>
                      <p class="action-description">
                        Review and approve new user registrations
                      </p>
                      <span v-if="pendingCount > 0" class="pending-badge">
                        {{ pendingCount }} pending
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped src="./styles/AdminPanelModal.css"></style>
