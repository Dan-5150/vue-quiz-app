import { Commit } from 'vuex'
import { Question } from '@/types/Question'
import { QuizState, User } from '@/types/QuizState'
import { RootState } from '@/types/RootState'
import {
  QuestionResponse,
  SortedQuestion,
  SortedQuestions,
} from '@/types/SortedQuestion'
import { SortOrder } from '@/enums/SortOrder'

export default {
  namespaced: true,

  state(): QuizState {
    return {
      user: {
        name: '',
        age: null,
      },
      sortOrder: SortOrder.definedOrder,
      sortedQuestions: [],
    }
  },

  getters: {
    /**
     * Gets questions from questions store
     * @param {QuizState} _state
     * @param {Question[]} _getters
     * @param {RootState} rootState
     * @returns Questions from questions store
     */
    questions(
      _state: QuizState,
      _getters: Question[],
      rootState: RootState,
    ): Question[] {
      return rootState.questions.questions
    },
  },

  mutations: {
    /**
     * Updates user info
     * @param {QuizState} state Quiz state
     * @param {User} payload User info
     */
    updateUser(state: QuizState, payload: User): void {
      state.user = payload
    },
    /**
     * Updates sort order
     * @param {QuizState} state Quiz state
     * @param {string} payload Sort order
     */
    updateSortOrder(state: QuizState, payload: SortOrder): void {
      state.sortOrder = payload
    },
    /**
     * Clears user info
     * @param {QuizState} state Quiz state
     */
    clearUserInfo(state: QuizState): void {
      state.user = {
        name: '',
        age: null,
      }
    },
    /**
     * Adds new quiz response
     * @param {QuizState} state Quiz state
     * @param {QuestionResponse} payload User response to question
     */
    addQuizResult(state: QuizState, payload: QuestionResponse): void {
      state.sortedQuestions[payload.index].isCorrect = payload.isCorrect
      state.sortedQuestions[payload.index].response = payload.response
    },
    /**
     * Sort final quiz results by correct/incorrect responses
     * @param {QuizState} state Quiz state
     */
    sortQuizResults(state: QuizState): void {
      state.sortedQuestions.sort(
        (a: SortedQuestion, b: SortedQuestion) =>
          (a.isCorrect < b.isCorrect && 1) || -1,
      )
    },
    /**
     * Clears quiz results
     * @param {QuizState} state Quiz state
     */
    clearQuizResults(state: QuizState): void {
      state.sortedQuestions = []
    },
  },

  actions: {
    /**
     * Fetch user age from agify.io API
     * @param {*} context
     * @param {string} payload Name to query
     */
    async fetchUserAge(
      { commit }: { commit: Commit },
      payload: { name: string },
    ): Promise<void> {
      const response = await fetch(`https://api.agify.io/?name=${payload.name}`)
      const responseData = await response.json()
      if (!response.ok) {
        const error =
          new Error(responseData.message) || 'Failed to fetch requests.'
        throw error
      }
      const newUser = {
        name: payload.name,
        age: responseData.age,
      }
      commit('updateUser', newUser)
    },
    /**
     * Sort questions array to specified sort type
     * @param {QuizState} state Question state
     * @param {string} payload Sort type
     */
    sortQuestions(
      { state, getters }: { state: QuizState; getters: SortedQuestions },
      payload: string,
    ): void {
      // Clear questions
      state.sortedQuestions = []
      if (payload === SortOrder.definedOrder) {
        state.sortedQuestions = [...getters.questions]
      } else if (payload === SortOrder.alphabeticalOrder) {
        state.sortedQuestions = [...getters.questions]
        state.sortedQuestions.sort((a: Question, b: Question) =>
          a.question.localeCompare(b.question),
        )
      } else if (payload === SortOrder.questionTypeOrder) {
        state.sortedQuestions = [...getters.questions]
        state.sortedQuestions.sort((a: Question, b: Question) =>
          a.questionType.localeCompare(b.questionType),
        )
      }
      console.log('new-sort', state.sortedQuestions)
    },
  },
}
