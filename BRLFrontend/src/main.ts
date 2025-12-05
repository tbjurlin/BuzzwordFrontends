import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const FlowerURL = import.meta.env.VITE_FLOWER_SSO_URL || 'http://localhost:5174/'

const isLoggedIn = true //come back and change this to the SSO return info

if(!isLoggedIn) {
    window.location.href = FlowerURL
}
else {
const app = createApp(App)

app.use(router)

app.mount('#app')}
