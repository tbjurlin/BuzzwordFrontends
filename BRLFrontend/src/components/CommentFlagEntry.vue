<script setup lang="ts">
import { useComment } from '@/composables/useComment';
import { useFlag } from '@/composables/useFlag';
import { ref } from 'vue';

const createComment = useComment().createComment;
const createFlag = useFlag().createFlag;
const textInput = ref("");

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
    if (props.type == "comment") {
        createComment(
            props.resourceId,
            textInput.value,
            (_newId) => {
                textInput.value = "";
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
                props.handleSuccessfulSubmit();
            },
            (_reason) => {}
        )
    }
}
</script>

<template>
    <form :class="type + '-entry'" @submit.prevent="handleSubmit">
        <label :for="type">Your {{ type }}:</label><br>
        <textarea :id="type" v-model="textInput" :name="'user_' + type" maxlength=200 :placeholder="'Enter your ' + type + 's here...'"></textarea><br>
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>
@import './styles/CommentFlagEntry.css';
</style>