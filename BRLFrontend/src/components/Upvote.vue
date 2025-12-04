<script setup lang="ts">
import VueFeather from 'vue-feather';

// using Object syntax
const props = defineProps({
  isUpvoted: {
    type: Boolean,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="upvote-container">
    <button class="upvote-button" @click="$emit('upvoted')">
      <VueFeather type="arrow-up" class="upvote-icon"/>
    </button>
    {{ $props.count }}
  </div>
</template>

<style scoped>
@import "./styles/Upvote.css"
</style>