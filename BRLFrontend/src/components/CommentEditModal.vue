<script setup lang="ts">
import { Comment } from '@/types';
import { useComment } from '@/composables/useComment';
import VueFeather from 'vue-feather';
import { ref, watch } from 'vue';

const { updateComment } = useComment();
const textInput = ref("");
const isSaving = ref(false);

const props = defineProps({
    comment: {
        type: Object as () => Comment | null,
        default: null,
    },
    resourceId: {
        type: Number,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close', 'submitted']);

watch(() => props.isOpen, (newVal) => {
    if (newVal && props.comment) {
        textInput.value = props.comment.contents;
    }
});

function handleClose() {
    textInput.value = "";
    emit('close');
}

function handleSubmit() {
    if (!textInput.value.trim() || !props.comment) {
        return;
    }

    isSaving.value = true;
    updateComment(
        props.resourceId,
        props.comment.id,
        textInput.value,
        () => {
            isSaving.value = false;
            textInput.value = "";
            emit('submitted');
        },
        (error) => {
            isSaving.value = false;
            console.error('Failed to update comment:', error);
            alert('Failed to update comment. Please try again.');
        }
    );
}
</script>

<template>
    <div v-if="isOpen && comment" class="modal-overlay" @click="handleClose">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>Edit Comment</h2>
                <button class="close-button" @click="handleClose" :disabled="isSaving">
                    <VueFeather type="x"/>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="handleSubmit" class="comment-form">
                    <div class="form-group">
                        <label for="comment-text">Comment</label>
                        <textarea 
                            id="comment-text" 
                            v-model="textInput" 
                            maxlength="200"
                            placeholder="Edit your comment..."
                            required
                        ></textarea>
                        <div class="char-count">{{ textInput.length }}/200</div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-button" @click="handleClose" :disabled="isSaving">
                            Cancel
                        </button>
                        <button type="submit" class="submit-button" :disabled="isSaving">
                            {{ isSaving ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.close-button:hover:not(:disabled) {
    background-color: #f0f0f0;
}

.close-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.modal-body {
    padding: 1.5rem;
}

.comment-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
    color: #333;
}

.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    min-height: 100px;
    max-height: 200px;
}

.form-group textarea:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.char-count {
    font-size: 0.875rem;
    color: #666;
    text-align: right;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.cancel-button,
.submit-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.cancel-button {
    background-color: #f0f0f0;
    color: #333;
}

.cancel-button:hover:not(:disabled) {
    background-color: #e0e0e0;
}

.submit-button {
    background-color: #4CAF50;
    color: white;
}

.submit-button:hover:not(:disabled) {
    background-color: #45a049;
}

.cancel-button:disabled,
.submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
