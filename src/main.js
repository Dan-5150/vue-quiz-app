import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import BaseLoadingSpinner from '@/components/UI/BaseLoadingSpinner.vue'

const app = createApp(App)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseLoadingSpinner', BaseLoadingSpinner)

app.use(router).use(store).mount('#app')
