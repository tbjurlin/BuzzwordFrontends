<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
        <h1>{{ aboutUs?.title || 'About Us' }}</h1>
        <div class="about-us-content" v-if="aboutUs">
            <section class="mission-section">
                <h2>Our Mission</h2>
                <p>{{ aboutUs.missionStatement }}</p>
            </section>

            <section class="team-section">
                <h2>Meet the Team</h2>
                <div class="team-grid">
                    <div v-for="(member, index) in aboutUs.team" :key="index" class="team-member">
                        <h3>{{ member.name }}</h3>
                        <p class="role">{{ member.role }}</p>
                        <p class="fun-fact"><strong>Fun Fact:</strong> {{ member["fun fact"] }}</p>
                    </div>
                </div>
            </section>
        </div>
        <div v-else class="loading">
            <p>Loading...</p>
        </div>
    </div>
</template>


<style scoped>
@import "./styles/AboutUsView.css";
@import '../assets/animations.css';
@import '../assets/buttons.css';
</style>