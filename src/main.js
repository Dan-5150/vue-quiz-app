import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import BaseLoadingSpinner from '@/components/UI/BaseLoadingSpinner.vue'

Vue.config.productionTip = false

Vue.component('BaseCard', BaseCard)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseLoadingSpinner', BaseLoadingSpinner)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
