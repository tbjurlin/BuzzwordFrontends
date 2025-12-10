<script setup lang="ts">
import ResourceList from '@/components/resourcelist/ResourceList.vue';
import { useResource } from '@/composables/useResource';
import { Resource } from '@/types';
import { onMounted, ref } from 'vue';

const resources = ref<Resource[]>([])

const listAllResources = useResource().listAllResources;

onMounted(() => {
  listAllResources(
    (res) => resources.value = res,
    (reason) => {
      console.log(reason)
    }
  )
})
</script>

<template>
  <div class="home-view">
    <!-- Empty home page - content can be added here -->
    <h1>Available Resources</h1>
    <ResourceList :resources="resources"/>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/HomeView.css';
</style>

