<script setup lang="ts">
import { Comment, Flag } from '@/types';


const props = defineProps<{
    record: Comment | Flag
}>();
</script>

<template>
    <hr />
    <li class="comment-container">
        <p>{{ props.record.firstName }} {{ props.record.lastName }}</p>
        <p>{{ props.record.creationDate }}</p>
        <p>{{ props.record.contents }}</p>
    </li>
</template>

<style scoped>
@import "./styles/CommentFlagItem.css";
</style>