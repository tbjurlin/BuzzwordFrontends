<script setup lang="ts">
import ResourceList from '@/components/resourcelist/ResourceList.vue';
import { useResource } from '@/composables/useResource';
import { Resource } from '@/types';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const resources = ref<Resource[]>([])

const resourceFuncs = useResource();
const listResourcesByKeywords = resourceFuncs.listResourcesByKeywords;
const listAllResources = resourceFuncs.listAllResources;

const route = useRoute();

onMounted(() => {
  const searchString = route.query.q;
  if (typeof searchString == 'string') {
    if (searchString === "") {
      listAllResources(
          (res) => resources.value = res,
          (reason) => {
              console.log(reason)
          }
      )
    } else {
      listResourcesByKeywords(
          searchString,
          (res) => resources.value = res,
          (reason) => {
              console.log(reason)
          }
      )
    }
  }
})

watch(
    () => route.query.q,
    (newQuery, _oldQuery) => {
      if (typeof newQuery == 'string') {
        if (newQuery === "") {
          listAllResources(
              (res) => resources.value = res,
              (reason) => {
                  console.log(reason)
              }
          )
        } else {
          listResourcesByKeywords(
              newQuery,
              (res) => resources.value = res,
              (reason) => {
                  console.log(reason)
              }
          )
        }
      }
    }
)
</script>

<template>
  <div class="search-view">
    <!-- Empty home page - content can be added here -->
    <h2 v-if="route.query.q !== ''">Search Results for "{{ route.query.q }}"</h2>
    <h2 v-else>All Resources</h2>
    <ResourceList v-if="resources.length > 0" :resources="resources"/>
    <p v-else>No resources found.</p>
  </div>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/HomeView.css';
</style>

