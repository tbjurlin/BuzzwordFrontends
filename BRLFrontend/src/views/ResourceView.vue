<script setup lang="ts">
import Upvote from '@/components/Upvote.vue';
import VueFeather from 'vue-feather';
import { ref } from 'vue'

const resource = {
  title: 'Default resource',
  description: 'Wow! What a description!',
  url: 'https://www.example.com',
  creatorFirstName: 'Ben',
  creatorLastName: 'Edens',
  creationDate: '12/12/12',
  creatorID: 1,
  comments: ["comment", "comment"],
  upvoteCount: 245,
  upvotedByCurrentUser: true,
}

const upvoteCount = ref(resource.upvoteCount);
const userUpvoted = ref(resource.upvotedByCurrentUser);

const handleUpvote = () => {
    if (userUpvoted.value) {
        upvoteCount.value -= 1;
    } else {
        upvoteCount.value += 1;
    }
    userUpvoted.value = !userUpvoted.value;
}
</script>

<template>
  <div class="resource-view">
    <div class="resource-card">
        <h2 class="resource-title">{{ resource.title }}</h2>
        <p class="resource-url">Link to resource: <a class="resource-url-link" :href="resource.url">{{ resource.url }}</a></p>
        <p class="resource-metadata">Creator: {{ resource.creatorFirstName }} {{ resource.creatorLastName }} | Created on: {{ resource.creationDate }}</p>
        <p class="resource-description">{{ resource.description }}</p>
        <div class="resource-action-row">
            <Upvote class="resource-action-item" :is-upvoted="userUpvoted" :count="upvoteCount" @upvoted="handleUpvote"/>
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
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ResourceView.css';
</style>
