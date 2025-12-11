<script setup lang="ts">
import { Flag } from '@/types';
import { useFlag } from '@/composables/useFlag';
import VueFeather from 'vue-feather';
import { ref } from 'vue';

const createFlag = useFlag().createFlag;
const textInput = ref("");

const props = defineProps({
    flags: {
        type: Array as () => Flag[],
        required: true,
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

function handleClose() {
    emit('close');
}

function formatDate(date: Date | string): string {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function handleSubmitFlag() {
    if (textInput.value.trim()) {
        createFlag(
            props.resourceId,
            textInput.value,
            (_newId) => {
                textInput.value = "";
                emit('submitted');
            },
            (_reason) => {}
        )
    }
}
</script>

<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleClose">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>Flags ({{ flags.length }})</h2>
                <button class="close-button" @click="handleClose">
                    <VueFeather type="x"/>
                </button>
            </div>
            <div class="modal-body">
                <!-- Flags List Section -->
                <div class="flags-section">
                    <div v-if="flags.length === 0" class="no-flags">
                        <p>No current flags</p>
                    </div>
                    <div v-else class="flags-list">
                        <div v-for="flag in flags" :key="flag.id" class="flag-item">
                            <div class="flag-header">
                                <span class="flag-author">{{ flag.firstName }} {{ flag.lastName }}</span>
                                <span class="flag-date">{{ formatDate(flag.creationDate) }}</span>
                            </div>
                            <p class="flag-content">{{ flag.contents }}</p>
                        </div>
                    </div>
                </div>

                <!-- Add Flag Section -->
                <div class="add-flag-section">
                    <h3>Add a Flag</h3>
                    <form @submit.prevent="handleSubmitFlag" class="flag-form">
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
                            <button type="submit" class="submit-button">Submit Flag</button>
                        </div>
                    </form>
                </div>
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
    background-color: var(--color-background);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    padding: 0;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
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

.modal-body {
    overflow-y: auto;
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.flags-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.no-flags {
    text-align: center;
    padding: 2rem 1rem;
    color: var(--color-text-soft);
    font-style: italic;
}

.flags-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flag-item {
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 1rem;
    background-color: var(--color-background-soft);
}

.flag-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    gap: 1rem;
}

.flag-author {
    font-weight: 600;
    color: var(--color-heading);
}

.flag-date {
    font-size: 0.85rem;
    color: var(--color-text-soft);
}

.flag-content {
    margin: 0;
    color: var(--color-text);
    line-height: 1.5;
    word-wrap: break-word;
}

.add-flag-section {
    border-top: 2px solid var(--color-border);
    padding-top: 1.5rem;
}

.add-flag-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--color-heading);
    font-size: 1.1rem;
}

.flag-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flag-form label {
    font-weight: 500;
    color: var(--color-heading);
    font-size: 0.95rem;
}

.flag-form textarea {
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
    min-height: 100px;
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
}

.submit-button {
    padding: 0.75rem 1.5rem;
    background-color: var(--color-button);
    color: var(--color-text);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;
}

.submit-button:hover {
    opacity: 0.9;
}
</style>
