// import Vue from 'vue'
import { createStore } from 'vuex'
import questions from './modules/questions'
import quiz from './modules/quiz'

// Vue.use(Vuex)

export default createStore({
  modules: {
    questions,
    quiz,
  },
})
