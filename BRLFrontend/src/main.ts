import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CrossStorageHub } from 'cross-storage';


const handlePostMessage = (event: MessageEvent) => {
  console.log(event.data)
}
window.addEventListener('message', handlePostMessage)

CrossStorageHub.init([
    { origin: new RegExp(String.raw`${import.meta.env.VITE_FLOWER_SSO_URL}`), allow: ['del', 'set'] },
]);


const app = createApp(App)

app.use(router)

app.mount('#app')