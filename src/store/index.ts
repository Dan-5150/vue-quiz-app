import { createStore } from 'vuex'
import questions from './modules/questions'
import quiz from './modules/quiz'

export default createStore({
  modules: {
    questions,
    quiz,
  },
})
