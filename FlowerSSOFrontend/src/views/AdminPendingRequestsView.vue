<script setup lang="ts">
import { computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, type PendingUserRequest } from '../stores/auth'
import feather from 'feather-icons'

const router = useRouter()
const { pendingRequests, approveRequest, denyRequest, isAdmin, currentUser } = useAuth()

// Check if user has admin access
const hasAccess = computed(() => isAdmin())

// Redirect if not admin
if (!hasAccess.value) {
  router.push({ name: 'dashboard' })
}

// Format date for display
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get role badge class for styling
const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'manager':
      return 'role-badge-manager'
    case 'contributor':
      return 'role-badge-contributor'
    default:
      return 'role-badge-user'
  }
}

// Handle approve action
const handleApprove = (requestId: string) => {
  if (confirm('Are you sure you want to approve this account request?')) {
    approveRequest(requestId)
  }
}

// Handle deny action
const handleDeny = (requestId: string) => {
  if (confirm('Are you sure you want to deny this account request? This action cannot be undone.')) {
    denyRequest(requestId)
  }
}

// Go back to dashboard
const goBack = () => {
  router.push({ name: 'dashboard' })
}

// Replace feather icons when component mounts
onMounted(() => {
  feather.replace()
})

// Watch for changes in pending requests and re-render icons
watch(pendingRequests, async () => {
  await nextTick()
  feather.replace()
})
</script>

<template>
  <div class="pending-requests-container">
    <div class="pending-requests-header">
      <div class="header-content">
        <h1 class="page-title">Pending Account Requests</h1>
        <p class="page-subtitle">Review and approve new user registrations</p>
      </div>
      <button class="btn-back" @click="goBack">Back to Dashboard</button>
    </div>

    <div class="pending-requests-content">
      <!-- Empty State -->
      <div v-if="pendingRequests.length === 0" class="empty-state">
        <div class="empty-icon">
          <i data-feather="clipboard"></i>
        </div>
        <h3 class="empty-title">No Pending Requests</h3>
        <p class="empty-text">There are no account creation requests waiting for approval.</p>
      </div>

      <!-- Requests List -->
      <div v-else class="requests-list">
        <div class="requests-count">
          {{ pendingRequests.length }} pending {{ pendingRequests.length === 1 ? 'request' : 'requests' }}
        </div>

        <div
          v-for="request in pendingRequests"
          :key="request.id"
          class="request-card"
        >
          <!-- Request Header -->
          <div class="request-header">
            <div class="user-info">
              <div class="user-avatar">
                {{ request.firstName.charAt(0) }}{{ request.lastName.charAt(0) }}
              </div>
              <div class="user-details">
                <h3 class="user-name">
                  {{ request.firstName }} {{ request.lastName }}
                </h3>
                <p class="user-email">{{ request.email }}</p>
              </div>
            </div>
            <div :class="['role-badge', getRoleBadgeClass(request.role)]">
              {{ request.role.toUpperCase() }}
            </div>
          </div>

          <!-- Request Details -->
          <div class="request-details">
            <div class="detail-row">
              <span class="detail-label">Job Title:</span>
              <span class="detail-value">{{ request.title }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Department:</span>
              <span class="detail-value">{{ request.department }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Country:</span>
              <span class="detail-value">{{ request.country }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Request Date:</span>
              <span class="detail-value">{{ formatDate(request.requestDate) }}</span>
            </div>
          </div>

          <!-- Special Notice for Manager/Contributor Requests -->
          <div v-if="request.role === 'manager' || request.role === 'contributor'" class="elevated-role-notice">
            <i data-feather="alert-triangle" class="warning-icon"></i>
            <strong>Elevated Role Request:</strong>
            This user is requesting {{ request.role }} privileges. Please verify their credentials carefully.
          </div>

          <!-- Request Actions -->
          <div class="request-actions">
            <button
              class="btn-deny"
              @click="handleDeny(request.id)"
            >
              Deny
            </button>
            <button
              class="btn-approve"
              @click="handleApprove(request.id)"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./styles/AdminPendingRequestsView.css"></style>
