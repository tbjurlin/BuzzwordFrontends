<script setup lang="ts">
import { retrieveResource } from '@/backend_calls';
import ResourceList from '@/components/resourcelist/ResourceList.vue';
import { Resource } from '@/types';
import { onMounted, ref } from 'vue';

const resources = ref<Resource[]>([])

const listAllResources = (onSuccess: (resources: Resource[]) => void, onFailure: (reason: any) => void) => {
  var resource = retrieveResource(17)
  if (resource) {
    onSuccess([resource])
  } else {
    onFailure(null)
  }
}

onMounted(() => {
  listAllResources(
    (res) => resources.value = res,
    (reason) => {}
  )
})
</script>

<template>
  <div class="home-view">
    <!-- Empty home page - content can be added here -->
    <h2>Available Resources</h2>
    <ResourceList :resources="resources"/>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/HomeView.css';
</style>

