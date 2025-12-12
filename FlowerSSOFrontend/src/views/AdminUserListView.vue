<script setup lang="ts">
import { computed, onMounted, watch, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'
import feather from 'feather-icons'
import ConfirmModal from '../components/ConfirmModal.vue'
import TopBar from '../components/TopBar.vue'
import type { Profile } from '@/types'
import { useBackend } from '@/composables/useBackend'

const router = useRouter()
const { logout } = useAuth()
const { profileCall, listUsers, deleteUser } = useBackend()

// Expose users to template
const users = ref<Profile[]>()
const user = ref<Profile>()

// Confirmation modal state
const showDeleteConfirm = ref(false)

// Get role badge class for styling
const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'manager':
      return 'role-badge-manager'
    case 'developer':
      return 'role-badge-contributor'
    default:
      return 'role-badge-user'
  }
}

const userToDelete = ref<Profile | null>()

// Open delete confirmation
const confirmDelete = (user: Profile) => {
  userToDelete.value = user
  showDeleteConfirm.value = true
}

// Handle delete user
const handleDeleteUser = () => {
  if (userToDelete.value) {
    deleteUser(userToDelete.value.id,
      () => {
        if (user.value && userToDelete.value && userToDelete.value.id === user.value.id) {
          logout()
        }
        listUsers((usrs) => {
            users.value = usrs
          },
          (_reason) => {}
        )
      },
      () => {}
    )
    showDeleteConfirm.value = false
  }
}

// Cancel delete
const cancelDelete = () => {
  showDeleteConfirm.value = false
  userToDelete.value = null
}

const refresh = () => {
  profileCall((profile) => {
      user.value = profile
      if (profile.isAdmin) {
        listUsers((usrs) => {
            users.value = usrs
            console.log("Users: " + usrs)
          },
          (_reason) => {
            router.push('dashboard')
          }
        )
      } else {
        router.push('dashboard')
      }
    },
    (_reason) => {
      router.push('dashboard')
    }
  )
}

// Replace feather icons when component mounts
onMounted(() => {
  feather.replace()

  profileCall((profile) => {
      user.value = profile
      if (profile.isAdmin) {
        listUsers((usrs) => {
            users.value = usrs
            console.log("Users: " + usrs)
          },
          (_reason) => {
            router.push('dashboard')
          }
        )
      } else {
        router.push('dashboard')
      }
    },
    (_reason) => {
      router.push('dashboard')
    }
  )
})

// Watch for changes in users and re-render icons
watch(users, async () => {
  await nextTick()
  feather.replace()
})
</script>

<template>
  <TopBar />
  <div v-if="user && users" class="user-list-container">
    <div class="user-list-header">
      <div class="header-content">
        <h1 class="page-title">User Management</h1>
        <p class="page-subtitle">View all registered users and their information</p>
      </div>
      <button class="btn-back" @click="router.push({ name: 'dashboard'})">Back to Dashboard</button>
    </div>

    <div class="user-list-content">
      <!-- Empty State -->
      <div v-if="users.length === 0" class="empty-state">
        <div class="empty-icon">
          <i data-feather="users"></i>
        </div>
        <h3 class="empty-title">No Users Found</h3>
        <p class="empty-text">There are no registered users in the system.</p>
      </div>

      <!-- Users List -->
      <div v-else class="users-list">
        <div class="users-count">
          {{ users.length }} registered {{ users.length === 1 ? 'user' : 'users' }}
        </div>

        <div
          v-for="user in users"
          :key="user.id"
          class="user-card"
        >
          <!-- User Header -->
          <div class="user-header">
            <div class="user-info">
              <div class="user-avatar">
                {{ user.fName.charAt(0) }}{{ user.lName.charAt(0) }}
              </div>
              <div class="user-details">
                <h3 class="user-name">
                  {{ user.fName }} {{ user.lName }}
                </h3>
                <p class="user-email">{{ user.email }}</p>
              </div>
            </div>
            <div class="user-header-actions">
              <div :class="['role-badge', getRoleBadgeClass(user.title)]">
                {{ user.title.toUpperCase() }}
              </div>
              <button 
                class="btn-delete" 
                @click="confirmDelete(user)"
                :title="`Delete ${user.fName} ${user.lName}`"
              >
                <i data-feather="trash-2"></i>
              </button>
            </div>
          </div>

          <!-- User Details -->
          <div class="user-details-grid">
            <div class="detail-row">
              <span class="detail-label">
                <i data-feather="briefcase" class="detail-icon"></i>
                Job Title:
              </span>
              <span class="detail-value">{{ user.title }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">
                <i data-feather="layout" class="detail-icon"></i>
                Department:
              </span>
              <span class="detail-value">{{ user.dept }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">
                <i data-feather="globe" class="detail-icon"></i>
                Country:
              </span>
              <span class="detail-value">{{ user.loc }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">
                <i data-feather="hash" class="detail-icon"></i>
                User ID:
              </span>
              <span class="detail-value">{{ user.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteConfirm"
      title="Delete User"
      :message="`Are you sure you want to delete ${userToDelete?.fName} ${userToDelete?.lName}? This action cannot be undone.`"
      confirm-text="Delete"
      cancel-text="Cancel"
      :is-dangerous="true"
      @confirm="handleDeleteUser"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped src="./styles/AdminUserListView.css"></style>
