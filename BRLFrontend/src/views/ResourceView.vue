<script setup lang="ts">
import Upvote from '@/components/Upvote.vue';
import VueFeather from 'vue-feather';
import { onMounted, ref, watch } from 'vue'
import type { Resource } from '@/types';
import { useRoute } from 'vue-router';
import { retrieveResource } from '@/backend_calls';

const resource = ref<Resource>();
const route = useRoute();

const handleUpvote = () => {
    if (resource.value != undefined) { 
        if (resource.value.upvotedByCurrentUser) {
            // delete upvote api call
            resource.value.upvoteCount -= 1;
        } else {
            // add upvote api call
            resource.value.upvoteCount += 1;
        }
        resource.value.upvotedByCurrentUser = !resource.value.upvotedByCurrentUser;
    }
}

watch(
    () => route.params.id,
    (newId, _) => {
        resource.value = retrieveResource(Number(newId));
    }
)

onMounted(() => {
    resource.value = retrieveResource(Number(route.params.id))
})
</script>

<template>
  <div v-if="resource != undefined" class="resource-view">
    <h2 class="resource-title">{{ resource.title }}</h2>
    <div class="resource-card">
        <div class="resource-metadata">
            <p class="resource-url">Link to resource: <a class="resource-url-link" :href="resource.url">{{ resource.url }}</a></p>
            <p class="resource-creator">Creator: {{ resource.firstName }} {{ resource.lastName }}</p><p class="resource-date">Created on: {{ resource.creationDate }}</p>
        </div>
        <p class="resource-description">{{ resource.description }}</p>
        <div class="resource-action-row">
            <Upvote class="resource-action-item" :is-upvoted="resource.upvotedByCurrentUser" :count="resource.upvoteCount" @upvoted="handleUpvote"/>
            <div class="resource-action-item resource-comment-action">
                <button class="resource-comment-button">
                    <VueFeather type="message-square"/>
                </button>
                {{ resource.comments.length }}
            </div>
            <!-- If we want a share button
            <div class="resource-share-action">
                <button class="resource-share-button">
                    <VueFeather type="share-2"/>
                </button>
            </div> -->
        </div>
    </div>
    <!-- <CommentList comments=resource.comments> -->
  </div>
  <p v-else>Resource not available</p>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ResourceView.css';
</style>
