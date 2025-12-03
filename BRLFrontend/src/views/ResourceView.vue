<script setup lang="ts">
import Upvote from '@/components/Upvote.vue';
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
</script>

<template>
  <div class="resource-view">
    <div class="resource-card">
        <h2 class="resource-title">{{ resource.title }}</h2>
        <p class="resource-url">Link to resource: <a class="resource-url-link" :href="resource.url">{{ resource.url }}</a></p>
        <p class="resource-metadata">Creator: {{ resource.creatorFirstName }} {{ resource.creatorLastName }} | Created on: {{ resource.creationDate }}</p>
        <p class="resource-description">{{ resource.description }}</p>
        <div class="resource-action-row">
            <Upvote/>
            <div class="resource-comment-button"></div>
            <div class="resource-share-button"></div>
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
