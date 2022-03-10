export default {
  namespaced: true,

  state() {
    return {
      user: {
        name: null,
        age: null,
      },
      sortOrder: null,
      sortedQuestions: [],
    }
  },

  getters: {
    /**
     * Gets user info
     * @param {object} state Quiz state
     * @returns User info
     */
    user(state) {
      return state.user
    },
    /**
     * Gets sort order
     * @param {object} state Quiz state
     * @returns Specified sort order
     */
    sortOrder(state) {
      return state.sortOrder
    },
    /**
     * Gets sort order
     * @param {object} state Quiz state
     * @returns Specified sort order
     */
    quizResults(state) {
      return state.quizResults
    },
    /**
     * Gets all sorted questions
     * @param {object} state Questions state
     * @returns All questions
     */
    sortedQuestions(state) {
      return state.sortedQuestions
    },
    questions(_state, _getters, rootState) {
      return rootState.questions.questions
    },
  },

  mutations: {
    /**
     * Updates user info
     * @param {object} state Quiz state
     * @param {object} payload User info
     */
    updateUser(state, payload) {
      state.user = payload
    },
    /**
     * Updates sort order
     * @param {object} state Quiz state
     * @param {string} payload Sort order
     */
    updateSortOrder(state, payload) {
      state.sortOrder = payload
    },
    /**
     * Clears user info
     * @param {object} state Quiz state
     */
    clearUserInfo(state) {
      state.user = {
        name: null,
        age: null,
      }
    },
    /**
     * Adds new quiz response
     * @param {object} state 
     * @param {object} payload 
     */
    addQuizResult(state, payload) {
      state.sortedQuestions[payload.index].isCorrect = payload.isCorrect
      state.sortedQuestions[payload.index].response = payload.response
    },
    /**
     * Sort final quiz results by correct/incorrect responses
     * @param {object} state 
     */
    sortQuizResults(state) {
      state.sortedQuestions.sort((a, b) => (a.isCorrect < b.isCorrect) && 1 || -1)
    },
  },

  actions: {
    /**
     * Fetch user age from agify.io API
     * @param {*} context 
     * @param {string} payload Name to query
     */
    async fetchUserAge(context, payload) {
      const response = await fetch(`https://api.agify.io/?name=${payload.name}`)
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message) || 'Failed to fetch requests.'
        throw error
      }
      const newUser = {
        name: payload.name,
        age: responseData.age,
      }
      context.commit('updateUser', newUser)
    },
    /**
     * Sort questions array to specified sort type
     * @param {object} state Question state
     * @param {string} payload Sort type
     */
    sortQuestions({ state, getters }, payload) {
      // Clear questions
      state.sortedQuestions = []
      if (payload === 'defined-order') {
        state.sortedQuestions = [...getters.questions]
      } else if (payload === 'alphabetical-order') {
        state.sortedQuestions = [...getters.questions]
        state.sortedQuestions.sort((a, b) => (a.question > b.question) && 1 || -1)
      } else if (payload === 'question-type-order') {
        state.sortedQuestions = [...getters.questions]
        state.sortedQuestions.sort((a, b) => (a.questionType > b.questionType) && 1 || -1)
      }
      console.log('new-sort', state.sortedQuestions)
    },
  },
}
