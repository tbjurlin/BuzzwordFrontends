<script setup lang="ts">
import { Comment } from '@/types';


const props = defineProps({
    comment: {
        type: Comment,
        required: true,
    }
});
</script>

<template>
    <li class="comment-container">
        <p>{{ props.comment.firstName }} {{ props.comment.lastName }}</p>
        <p>{{ props.comment.creationDate }}</p>
        <p>{{ props.comment.contents }}</p>
    </li>
</template>

<style scoped>
@import "./styles/CommentItem.css";
</style>