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
  <div :class="['upvote-container', props.isUpvoted ? 'is-upvoted' : '']">
    <button class="upvote-button" @click.stop="$emit('upvoted')">
      <VueFeather type="thumbs-up" class="upvote-icon"/>
    </button>
    <p>{{ $props.count }}</p>
  </div>
</template>

<style scoped>
@import "./styles/Upvote.css"
</style>