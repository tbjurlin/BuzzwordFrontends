<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'
import UserProfileModal from './UserProfileModal.vue'
import AdminPanelModal from './AdminPanelModal.vue'
import feather from 'feather-icons'
import type { Profile } from '@/types'
import { useBackend } from '@/composables/useBackend'

const router = useRouter()
const { logout } = useAuth()
const { profileCall } = useBackend()


const isProfileModalOpen = ref(false)
const isAdminModalOpen = ref(false)

const user = ref<Profile>()

const openProfileModal = () => {
  isProfileModalOpen.value = true
}

const closeProfileModal = () => {
  isProfileModalOpen.value = false
}

const openAdminModal = () => {
  isAdminModalOpen.value = true
}

const closeAdminModal = () => {
  isAdminModalOpen.value = false
}

const handleLogout = () => {
  logout()
  router.push({ name: 'home' })
}

onMounted(() => {
  // Replace feather icons after component is mounted
  feather.replace()

  profileCall(
    (profile) => user.value = profile,
    () => {}
  )
})
</script>

<template>
  <div class="topbar">
    <div v-if="user" class="topbar-content">
      <div class="topbar-left">
        <h3 class="welcome-text">Welcome, {{ user.firstName }}</h3>
      </div>
      
      <div class="topbar-right">
        <!-- Admin Panel Button - Only visible to admins (admin role) -->
        <button v-if="user.isAdmin" @click="openAdminModal" class="admin-panel-btn" aria-label="Open admin panel">
          <div class="admin-icon">
            <i data-feather="shield"></i>
          </div>
          <span class="admin-label">Admin Panel</span>
        </button>

        <button @click="openProfileModal" class="user-info-btn" aria-label="View user information">
          <div class="user-avatar">
            <i data-feather="user"></i>
          </div>
          <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
        </button>
        
        <button @click="handleLogout" class="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
    
    <!-- Admin Panel Modal -->
    <AdminPanelModal 
      :isOpen="isAdminModalOpen"
      @close="closeAdminModal"
    />
    
    <!-- User Profile Modal -->
    <UserProfileModal 
      :isOpen="isProfileModalOpen"
      @close="closeProfileModal"
    />
  </div>
</template>

<style scoped src="./styles/TopBar.css"></style>
