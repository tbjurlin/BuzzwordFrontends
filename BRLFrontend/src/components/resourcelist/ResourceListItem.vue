<script setup lang="ts">
import { Resource } from '@/types';
import Upvote from '@/components/Upvote.vue'
import VueFeather from 'vue-feather'
import { onMounted, ref } from 'vue';
import { useUpvote } from '@/composables/useUpvote';
import { useRouter } from 'vue-router';

const resource = ref<Resource>();

const { createUpvote, deleteUpvote } = useUpvote();
const router = useRouter();

const handleClick = () => {
    router.push({ name: "resource", params: { id: props.resource.id } });
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
        <h3>{{ props.resource.title }}</h3>
        <p>{{ props.resource.firstName }} {{ props.resource.lastName }}</p>
        <p>{{ props.resource.creationDate }}</p>
        <p>{{  props.resource.url }}</p>
        <p>{{ props.resource.description }}</p>
        <div class="resource-action-items">
            <Upvote :is-upvoted="resource.upvotedByCurrentUser" :count="resource.upvoteCount" @upvoted="handleUpvote"/>
            <div class="resource-action-item resource-comment-action">
                <button class="resource-comment-button">
                    <VueFeather type="message-square"/>
                </button>
                {{ resource.comments.length }}
            </div>
            <div class="resource-action-item resource-flag-action">
                <button class="resource-flag-button">
                    <VueFeather type="flag"/>
                </button>
                {{ resource.reviewFlags.length }}
            </div>
        </div>
    </li>
</template>

<style scoped>
@import "./styles/ResourceListItem.css";
</style>