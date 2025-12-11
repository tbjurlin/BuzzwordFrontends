<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAboutUs } from '@/composables/useAboutUs';
import type { AboutUs } from '@/types';

const aboutUs = ref<AboutUs>();

// Logo
const logo = new URL('@/assets/logo.png', import.meta.url).href;

// Team Yellow image
const teamYellow = new URL('@/assets/Team/Yellow.jpg', import.meta.url).href;
const sillyYellow = new URL('@/assets/Team/Silly.jpg', import.meta.url).href;

// Team member photos in the config file order
const teamPhotos = [
    new URL('@/assets/Team/Ben.jpg', import.meta.url).href,
    new URL('@/assets/Team/Claire.jpg', import.meta.url).href,
    new URL('@/assets/Team/Den.jpg', import.meta.url).href,
    new URL('@/assets/Team/Jan.jpg', import.meta.url).href,
    new URL('@/assets/Team/Ted.jpg', import.meta.url).href,
];

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
        <br />
        <div class="about-us-content" v-if="aboutUs">
            <section class="mission-section">
                <h2>Our Mission</h2>
                <div class="mission-content">
                    <p>{{ aboutUs.missionStatement }}</p>
                    <img :src="logo" alt="BRL Logo" class="mission-logo" />
                </div>
            </section>

            <section class="team-yellow-section">
                <h2>Team Yellow</h2>
                <div class="team-yellow-content">
                    <!--two photos side by side-->
                    <img :src="teamYellow" alt="Team Yellow after first 4 final week presentation" class="team-yellow-image" />
                    <img :src="sillyYellow" alt="Silly photo of team yellow" class="team-yellow-image" />
                    <p>Team yellow was decided by our generous proctor Jonathon Earll, his revolutionary team selection process led to the following members to meet.</p>
                </div>
            </section>

            <section class="team-section">
                <h2>Meet the Team</h2>
                <div class="team-grid">
                    <div v-for="(member, index) in aboutUs.team" :key="index" class="team-member">
                        <img :src="teamPhotos[index]" :alt="member.name" class="team-photo" />
                        <div class="team-info">
                            <h3>{{ member.name }}</h3>
                            <p class="role">{{ member.role }}</p>
                            <p class="fun-fact"><strong>Fun Fact:</strong> {{ member["fun fact"] }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="copyright-section">
                <p>{{ aboutUs.copyright }}</p>
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