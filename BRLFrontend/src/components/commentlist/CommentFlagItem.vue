<script setup lang="ts">
import { Comment, Flag } from '@/types';
import dayjs from 'dayjs';
import VueFeather from 'vue-feather';


const props = defineProps<{
    record: Comment | Flag,
    resourceId: number,
}>();

const emit = defineEmits(['edit', 'delete']);

const formatDate = (date: string | Date) => {
    return dayjs(date).format('MM/DD/YYYY');
};

const isComment = (record: Comment | Flag): record is Comment => {
    return 'contents' in record && record.constructor.name === 'Comment';
};

const isFlag = (record: Comment | Flag): record is Flag => {
    return 'contents' in record && record.constructor.name === 'Flag';
};

const handleEdit = () => {
    emit('edit', props.record);
};

const handleDelete = () => {
    emit('delete', props.record);
};
</script>

<template>
    <hr />
    <li class="comment-container">
        <div class="comment-header">
            <div class="comment-info">
                <p class="comment-author">{{ props.record.firstName }} {{ props.record.lastName }}</p>
                <p class="comment-date">{{ formatDate(props.record.creationDate) }}</p>
            </div>
            <div class="comment-actions">
                <button v-if="props.record.currentUserCanDelete && props.record.constructor.name === 'Comment'" 
                    class="action-button edit-button" 
                    @click="handleEdit"
                    title="Edit comment">
                    <VueFeather type="edit-2" size="18"/>
                </button>
                <button v-if="props.record.currentUserCanDelete" 
                    class="action-button delete-button" 
                    @click="handleDelete"
                    title="Delete">
                    <VueFeather type="trash-2" size="18"/>
                </button>
            </div>
        </div>
        <p class="comment-content">{{ props.record.contents }}</p>
        <span v-if="props.record.isEdited" class="edited-tag">edited</span>
    </li>
</template>

<style scoped>
@import "./styles/CommentFlagItem.css";
</style>