<script setup lang="ts">
import { Comment, Flag } from '@/types';
import CommentFlagItem from './CommentFlagItem.vue';

// using Type syntax
const props = defineProps<{
  records: (Comment | Flag)[]
}>();
</script>

<template>
    <ol class="comment-list">
        <CommentFlagItem v-for="record in props.records" :record="record"/>
    </ol>
</template>

<style scoped>
@import "./styles/CommentFlagList.css";
</style>