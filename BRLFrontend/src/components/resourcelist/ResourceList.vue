<script setup lang="ts">
import { Resource } from '@/types';
import ResourceListItem from './ResourceListItem.vue';

// using Type syntax
const props = defineProps<{
  resources: Resource[]
}>();
</script>

<template>
    <ol class="resource-list">
        <ResourceListItem v-for="resource in props.resources" :resource="resource"/>
    </ol>
</template>

<style scoped>
@import "./styles/ResourceList.css";
</style>