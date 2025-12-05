<script setup lang="ts">
import { Comment } from '@/types';
import CommentItem from './CommentItem.vue';

// using Type syntax
const props = defineProps<{
  comments: Comment[]
}>();
</script>

<template>
    <ol class="comment-list">
        <CommentItem v-for="comment in props.comments" :comment="comment"/>
    </ol>
</template>

<style scoped>
@import "./styles/CommentList.css";
</style>