<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { currentUser, logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1 class="profile-title">User Profile</h1>

        <div class="info-group">
          <label class="info-label">Company Email</label>
          <p class="info-value">{{ currentUser.email }}</p>
        </div>
        
        <div class="info-group">
          <label class="info-label">First Name</label>
          <p class="info-value">{{ currentUser.firstName }}</p>
        </div>
        
        <div class="info-group">
          <label class="info-label">Last Name</label>
          <p class="info-value">{{ currentUser.lastName }}</p>
        </div>
        
        <div class="info-group">
          <label class="info-label">User ID</label>
          <p class="info-value">{{ currentUser.companyID}}</p>
        </div>

        <div class="info-group">
            <label class="info-label">Company Role</label>
            <p class="info-value">{{ currentUser.companyRole }}</p>
        </div>

        <div class="info-group">
          <label class="info-label">Location</label>
            <p class="info-value">{{ currentUser.location }}</p>
      </div>
      
      <div class="profile-actions">
        <button @click="handleLogout" class="logout-btn">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}

.profile-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 2rem;
  text-align: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  padding: 0.75rem 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  border-left: 3px solid #AAB9F2;
}

.profile-actions {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
}

.logout-btn {
  background-color: #AAB9F2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #0061c2;
}

.logout-btn:active {
  background-color: #005099;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }
  
  .profile-card {
    padding: 2rem 1.5rem;
  }
}
</style>
