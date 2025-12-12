<script setup lang="ts">
import { useComment } from '@/composables/useComment';
import { useFlag } from '@/composables/useFlag';
import { ref, computed } from 'vue';

const createComment = useComment().createComment;
const createFlag = useFlag().createFlag;
const textInput = ref("");
const limitReachedError = ref(false);

const maxLength = 200;
const charCount = computed(() => textInput.value.length);
const isAtLimit = computed(() => charCount.value >= maxLength);

const props = defineProps({
    resourceId: {
        type: Number,
        required: true,
    },
    handleSuccessfulSubmit: {
        type: Function,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})

function handleSubmit() {
    console.log("commenting")
    console.log(textInput.value)
    if (!textInput.value.trim()) {
        return;
    }
    console.log("commenting")
    
    if (props.type == "comment") {
        createComment(
            props.resourceId,
            textInput.value,
            (_newId) => {
                textInput.value = "";
                limitReachedError.value = false;
                props.handleSuccessfulSubmit();
            },
            (_reason) => {}
        )
    } else {
        createFlag(
            props.resourceId,
            textInput.value,
            (_newId) => {
                textInput.value = "";
                limitReachedError.value = false;
                props.handleSuccessfulSubmit();
            },
            (_reason) => {}
        )
    }
}

function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.length > maxLength) {
        limitReachedError.value = true;
        textInput.value = target.value.substring(0, maxLength);
    } else {
        limitReachedError.value = false;
    }
}
</script>

<template>
    <form :class="type + '-entry'" @submit.prevent="handleSubmit">
        <label :for="type">Add {{ type }}:</label><br>
        <div class="textarea-wrapper">
            <textarea 
                :id="type" 
                v-model="textInput"
                :name="'user_' + type" 
                maxlength="200"
                :placeholder="'Enter your ' + type + 's here...'"
                class="char-limited-textarea"
            ></textarea>
            <div v-if="limitReachedError" class="limit-error">Character limit reached</div>
            <div class="char-count">{{ charCount }}/{{ maxLength }}</div>
        </div><br>
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>
@import './styles/CommentFlagEntry.css';
</style>