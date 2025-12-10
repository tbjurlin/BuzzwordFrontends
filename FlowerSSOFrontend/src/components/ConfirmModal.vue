<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDangerous?: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="handleCancel">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
          </div>
          
          <div class="modal-content">
            <p class="modal-message">{{ message }}</p>
          </div>

          <div class="modal-footer">
            <button 
              class="btn-cancel" 
              @click="handleCancel"
            >
              {{ cancelText || 'Cancel' }}
            </button>
            <button 
              :class="['btn-confirm', { 'btn-danger': isDangerous }]" 
              @click="handleConfirm"
            >
              {{ confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped src="./styles/ConfirmModal.css"></style>
