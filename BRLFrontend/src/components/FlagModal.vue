<script setup lang="ts">
import { useFlag } from '@/composables/useFlag';
import { ref } from 'vue';
import VueFeather from 'vue-feather';

const createFlag = useFlag().createFlag;
const textInput = ref("");

const props = defineProps({
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

function handleSubmit() {
    if (textInput.value.trim()) {
        createFlag(
            props.resourceId,
            textInput.value,
            (_newId) => {
                textInput.value = "";
                emit('submitted');
                emit('close');
            },
            (_reason) => {}
        )
    }
}

function handleClose() {
    emit('close');
}
</script>

<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleClose">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>Flag Resource</h2>
                <button class="close-button" @click="handleClose">
                    <VueFeather type="x"/>
                </button>
            </div>
            <form @submit.prevent="handleSubmit" class="flag-form">
                <label for="flag-comment">Why are you flagging this resource?</label>
                <textarea 
                    id="flag-comment" 
                    v-model="textInput" 
                    name="flag_comment" 
                    maxlength="200" 
                    placeholder="Enter your flag comment here..."
                    required
                ></textarea>
                <div class="form-actions">
                    <button type="button" class="cancel-button" @click="handleClose">Cancel</button>
                    <button type="submit" class="submit-button">Submit Flag</button>
                </div>
            </form>
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
    background-color: var(--color-background);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    padding: 0;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    padding: 0;
    display: flex;
    align-items: center;
}

.close-button:hover {
    color: var(--theme-blood);
}

.flag-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flag-form label {
    font-weight: 500;
    color: var(--color-heading);
}

.flag-form textarea {
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
    min-height: 120px;
    color: var(--color-text);
}

.flag-form textarea:focus {
    outline: none;
    border-color: var(--color-button);
    box-shadow: 0 0 0 3px rgba(255, 191, 0, 0.1);
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
}

.cancel-button,
.submit-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.cancel-button {
    background-color: var(--color-background-soft);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}

.cancel-button:hover {
    background-color: var(--color-hover);
}

.submit-button {
    background-color: var(--color-button);
    color: var(--color-text);
}

.submit-button:hover {
    opacity: 0.9;
}
</style>
