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

          <!-- Bee There App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/companyLogos/BeeThereLogo.png"
                style="width: 15rem; height: 20rem; padding-top: 4;"
                alt="Bee There Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">Bee There</h3>
              <p class="app-description">Buzzword Solutions Meeting Software</p>
            </div>
            <button class="app-access-btn" disabled>
              Coming Soon...
            </button>
          </div>

          <!-- SaleBoat App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/companyLogos/SaleBoatLogo.png"
                style="width: 30rem; height: 30rem; padding-top: 4;"
                alt="SaleBoat Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">SaleBoat</h3>
              <p class="app-description">Lead Tracking Systems</p>
            </div>
            <button class="app-access-btn" disabled>
              Coming Soon...
            </button>
          </div>

          <!-- Salts App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/companyLogos/SaltsLogo.png"
                style="width: 10rem; height: 10rem; padding-top: 4;"
                alt="Salts Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">S.A.L.T.S</h3>
              <p class="app-description">Software Assignment License Tracking System</p>
            </div>
            <button class="app-access-btn" disabled>
              Coming Soon...
            </button>
          </div>

          <!-- SwaB App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/companyLogos/SwaBLogo.png"
                style="width: 25rem; height: 25rem; padding-top: 4;"
                alt="SwaB Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">SwaB</h3>
              <p class="app-description">System without any Buzzwords</p>
            </div>
            <button class="app-access-btn" disabled>
              Coming Soon...
            </button>
          </div>

           <!-- All The Buzz App Card -->
          <div class="app-card">
            <div class="app-icon">
              <img
                src="../assets/companyLogos/allTheBuzzLogo.png"
                alt="All The Buzz Logo"
                class="app-logo"
              />
            </div>
            <div class="app-info">
              <h3 class="app-name">All The Buzz</h3>
              <p class="app-description">...</p>
            </div>
            <button class="app-access-btn" disabled>
              Coming Soon...
            </button>
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
