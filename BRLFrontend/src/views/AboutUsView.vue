<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import VueFeather from 'vue-feather';
import { useAboutUs } from '@/composables/useAboutUs';
import type { AboutUs } from '@/types';

const aboutUs = ref<AboutUs>();

onMounted(() => {
    const { getAboutUs } = useAboutUs();

    getAboutUs(
        (data: AboutUs) => {
            aboutUs.value = data;
        },
        (reason: any) => {
            console.error("Failed to fetch About Us information:", reason);
        }
    );
});

</script>



<template>
    <!--Config file information from the BRL API-->
    <div class="about-us-view">
        <h1>About Us</h1>
        <div class="about-us-content">
            
         </div>
    </div>
</template>


<style scoped>
@import "./styles/AboutUsView.css";
@import '../assets/animations.css';
@import '../assets/buttons.css';
</style>