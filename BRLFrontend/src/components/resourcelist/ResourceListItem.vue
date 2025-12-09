<script setup lang="ts">
import { Resource } from '@/types';


const props = defineProps<{
    resource: Resource
}>();
</script>

<template>
    <hr />
    <li class="comment-container">
        <RouterLink 
            :to="{
                name: 'resource',
                params: { id: props.resource.id }
            }"
        >
            <h3>{{ props.resource.title }}</h3>
            <p>{{ props.resource.firstName }} {{ props.resource.lastName }}</p>
            <p>{{ props.resource.creationDate }}</p>
            <p>{{  props.resource.url }}</p>
            <p>{{ props.resource.description }}</p>
        </RouterLink>
    </li>
</template>

<style scoped>
@import "./styles/ResourceListItem.css";
</style>