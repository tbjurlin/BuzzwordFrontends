<script setup lang="ts">
import ResourceList from '@/components/resourcelist/ResourceList.vue';
import { useResource } from '@/composables/useResource';
import type { Resource } from '@/types';
import { ref, onMounted } from 'vue'

const resources = ref<Resource[]>([]);
const listMyResources = useResource().listMyResources

onMounted(() => {
  listMyResources(
    (res) => resources.value = res,
    (reason) => {}
  )
})
</script>

<template>
  <div class="view-resources">
    <h1>Your Resources</h1>
    <ResourceList :resources="resources"/>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ViewResourcesView.css';
</style>
