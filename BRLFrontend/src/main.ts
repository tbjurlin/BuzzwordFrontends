import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const FlowerURL = import.meta.env.VITE_FLOWER_SSO_URL || 'http://localhost:5174/'
const BRL_URL = window.location.origin

const isLoggedIn = false //come back and change this to the SSO return info

if(!isLoggedIn) {
    // Add redirect parameter so Flower SSO knows where to return after login
    // Also add a flag to indicate this is an external SSO request
    window.location.href = `${FlowerURL}?redirect=${encodeURIComponent(BRL_URL)}&external=true`
}
else {
const app = createApp(App)

app.use(router)

app.mount('#app')}
