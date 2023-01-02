import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {useAuthStore} from "@/stores/auth";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)

const authStore = useAuthStore();

try {
    await authStore.init()
} catch {
    await router.push({name: "login"})
} finally {
    app.mount('#app')
}