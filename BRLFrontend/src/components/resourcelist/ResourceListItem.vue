<script setup lang="ts">
import { Resource } from '@/types';
import Upvote from '@/components/Upvote.vue'
import FlagViewModal from '@/components/FlagViewModal.vue'
import VueFeather from 'vue-feather'
import { onMounted, ref } from 'vue';
import { useUpvote } from '@/composables/useUpvote';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const resource = ref<Resource>();
const isFlagViewModalOpen = ref(false);

const { createUpvote, deleteUpvote } = useUpvote();
const router = useRouter();

const emit = defineEmits(['refresh']);

const handleClick = () => {
    router.push({ name: "resource", params: { id: props.resource.id } });
}

const handleFlagClick = (e: Event) => {
    e.stopPropagation();
    isFlagViewModalOpen.value = true;
}

const handleUpvote = () => {
    if (resource.value) { 
        console.log(resource.value)
        if (resource.value.upvotedByCurrentUser && resource.value.currentUserUpvoteId != undefined) {
            deleteUpvote(
                resource.value.id,
                resource.value.currentUserUpvoteId,
                () => {
                    if (resource.value) {
                        resource.value.upvoteCount -= 1;
                        resource.value.upvotedByCurrentUser = false;
                    }
                },
                () => {}
            )
        } else if (!resource.value.upvotedByCurrentUser) {
            createUpvote(
                resource.value.id,
                (newId) => {
                    if (resource.value) {
                        resource.value.upvoteCount += 1;
                        resource.value.upvotedByCurrentUser = true;
                        resource.value.currentUserUpvoteId = newId;
                    }
                },
                () => {}
            )
        }
    }
}

//changes date format to (mm/dd/yyyy)
const formatDate = (date: string | Date) => {
    return dayjs(date).format('MM/DD/YYYY');
};


const props = defineProps<{
    resource: Resource
}>();

onMounted(() => {
    resource.value = props.resource
})
</script>

<template>
    <hr />
    <li @click.stop="handleClick" v-if="resource" class="comment-container">
        <div class="resource-title-row">
            <h2>{{ props.resource.title }}</h2>
            <div class="resource-action-items">
                <div class="resource-action-item resource-flag-action">
                    <button 
                        class="resource-flag-button" 
                        :class="{ 'is-flagged': resource.reviewFlags.length > 0}"
                        @click="handleFlagClick"
                        title="Flag this resource"
                        >
                        <VueFeather type="flag"/>
                    </button>
                    <div v-if="resource.reviewFlags.length > 0" class="flag-count-badge">
                        {{ resource.reviewFlags.length }}
                    </div>
                </div>
                <Upvote :is-upvoted="resource.upvotedByCurrentUser" :count="resource.upvoteCount" @upvoted="handleUpvote"/>
            </div>
        </div>
        <p class="resource-uploader">Uploaded by: {{ props.resource.firstName }} {{ props.resource.lastName }} · {{ formatDate(props.resource.creationDate) }}</p>
        <p class="resource-description">{{ props.resource.description }}</p>
        
        <FlagViewModal 
            :resource-id="resource.id"
            :flags="resource.reviewFlags"
            :is-open="isFlagViewModalOpen"
            @close="isFlagViewModalOpen = false"
            @submitted="$emit('refresh')"
        />
    </li>
</template>

<style scoped>
@import "./styles/ResourceListItem.css";
</style>