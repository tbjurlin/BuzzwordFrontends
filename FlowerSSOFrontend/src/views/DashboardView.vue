<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { currentUser, checkAuth } = useAuth()

// Ensure user data is loaded when component mounts
onMounted(() => {
  checkAuth()
  
  // If still no user after checkAuth, redirect to home
  if (!currentUser.value) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div class="dashboard-container">
    <div v-if="currentUser" class="dashboard-content">
      <!-- Connected Apps Box -->
      <div class="connected-apps-box">
        <h2 class="box-title">Connected Apps</h2>
        
        <div class="apps-grid">
          <!-- BRL App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/BRLlogo.png"
                alt="BRL Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">BRL Dashboard</h3>
              <p class="app-description">Business Resource Library</p>
            </div>
            <button class="app-access-btn" disabled>
              Access App
            </button>
          </div>

          <!-- Placeholder for future apps -->
          <div class="app-card placeholder-card">
            <div class="app-icon">
              <div class="placeholder-icon">+</div>
            </div>
            <div class="app-info">
              <h3 class="app-name">More Apps Coming Soon</h3>
              <p class="app-description">Additional integrations in progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-message">
      <p>Loading dashboard...</p>
    </div>
  </div>
</template>

<style scoped src="./styles/DashboardView.css"></style>
