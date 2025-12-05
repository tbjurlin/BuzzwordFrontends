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
    },
    type: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <form :class="type + '-entry'" @submit.prevent="handleSubmit">
        <label :for="type">Your {{ type }}:</label><br>
        <textarea :id="type" :name="'user_' + type" maxlength=200 :placeholder="'Enter your ' + type + 's here...'"></textarea><br>
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>
@import './styles/CommentFlagEntry.css';
</style>