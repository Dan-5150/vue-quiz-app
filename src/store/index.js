import Vue from 'vue'
import Vuex from 'vuex'
import questions from './modules/questions'
import quiz from './modules/quiz'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions,
    quiz,
  },
})
