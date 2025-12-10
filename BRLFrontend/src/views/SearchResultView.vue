<script setup lang="ts">
import ResourceList from '@/components/resourcelist/ResourceList.vue';
import { useResource } from '@/composables/useResource';
import { Resource } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const resources = ref<Resource[]>([])

const listResourcesByKeywords = useResource().listResourcesByKeywords;

const route = useRoute();

onMounted(() => {
  const searchString = route.query.q;
  if (typeof searchString == 'string') {
    listResourcesByKeywords(
        searchString,
        (res) => resources.value = res,
        (reason) => {
            console.log(reason)
        }
    )
  }
})
</script>

<template>
  <div class="search-view">
    <!-- Empty home page - content can be added here -->
    <h2>Search Results for "{{ route.query.q }}"</h2>
    <ResourceList :resources="resources"/>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/HomeView.css';
</style>

