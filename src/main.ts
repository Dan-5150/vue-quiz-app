import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Global components
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import BaseLoadingSpinner from '@/components/UI/BaseLoadingSpinner.vue'

const pinia = createPinia()
const app = createApp(App)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseLoadingSpinner', BaseLoadingSpinner)

app.use(router).use(pinia).mount('#app')
