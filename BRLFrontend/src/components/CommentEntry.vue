<script setup lang="ts">

function handleSubmit() {

    props.handleSuccessfulSubmit();
}

const props = defineProps({
    resourceId: {
        type: Number,
        required: true,
    },
    handleSuccessfulSubmit: {
        type: Function,
        required: true,
    }
})
</script>

<template>
    <form class="comment-entry" @submit.prevent="handleSubmit">
        <label for="comments">Your Comments:</label><br>
        <textarea id="comments" name="user_comments" maxlength=200 placeholder="Enter your comments here..."></textarea><br>
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>
@import './styles/CommentEntry.css';
</style>