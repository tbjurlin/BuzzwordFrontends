<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nav-menu">
    <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
    <RouterLink to="/create-resource" class="nav-link" active-class="active">
      Create Resource
    </RouterLink>
    <RouterLink to="/view-resources" class="nav-link" active-class="active">
      View Resources
    </RouterLink>
    <RouterLink to="/resource" class="nav-link" active-class="active">
      Temp link to resource
    </RouterLink>
    <a href="https://flower-sso.example.com" class="nav-link" target="_blank">
      Flower SSO
    </a>
  </div>
</template>

<style scoped>
@import './styles/NavMenu.css';
</style>
