<script setup lang="ts">
import { Comment, Flag } from '@/types';
import CommentFlagItem from './CommentFlagItem.vue';

// using Type syntax
const props = defineProps<{
  records: (Comment | Flag)[],
  resourceId: number,
}>();

const emit = defineEmits(['edit', 'delete']);

const handleEdit = (record: Comment | Flag) => {
    emit('edit', record);
};

const handleDelete = (record: Comment | Flag) => {
    emit('delete', record);
};
</script>

<template>
    <ol class="comment-list">
        <CommentFlagItem 
            v-for="record in props.records" 
            :key="record.id"
            :record="record"
            :resource-id="resourceId"
            @edit="handleEdit"
            @delete="handleDelete"
        />
    </ol>
</template>

<style scoped>
@import "./styles/CommentFlagList.css";
</style>