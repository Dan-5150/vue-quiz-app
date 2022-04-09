import defaultQuestions from '../../assets/default-questions.json'

export default {
  namespaced: true,

  state() {
    return {
      questions: defaultQuestions,
    }
  },

  getters: {},

  mutations: {
    /**
     * Add a new question
     * @param {object} state Question state
     * @param {object} payload New question object
     */
    newQuestion(state, payload) {
      state.questions.push(payload)
    },
    /**
     * Delete a question
     * @param {object} state Question state
     * @param {number} payload Index of question to delete
     */
    deleteQuestion(state, payload) {
      state.questions.splice(payload, 1)
    },
    /**
     * Edit an existing question
     * @param {object} state Question state
     * @param {object} payload Edited question object
     */
    editQuestion(state, payload) {
      const questionIndex = state.questions.findIndex((question) => question.id === payload.id)
      state.questions.splice(questionIndex, 1, payload)
    },
  },

  actions: {},
}
