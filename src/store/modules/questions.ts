import defaultQuestions from '../../assets/default-questions.json'
import { Question } from '@/types/Question'
import { QuestionsState } from '../../types/QuestionsState'

export default {
  namespaced: true,

  state(): QuestionsState {
    return {
      questions: defaultQuestions,
    }
  },

  getters: {},

  mutations: {
    /**
     * Add a new question
     * @param {QuestionsState} state Question state
     * @param {Question} payload New question object
     */
    newQuestion(state: QuestionsState, payload: Question): void {
      state.questions.push(payload)
    },
    /**
     * Delete a question
     * @param {QuestionsState} state Question state
     * @param {number} payload Index of question to delete
     */
    deleteQuestion(state: QuestionsState, payload: number): void {
      state.questions.splice(payload, 1)
    },
    /**
     * Edit an existing question
     * @param {QuestionsState} state Question state
     * @param {Question} payload Edited question object
     */
    editQuestion(state: QuestionsState, payload: Question): void {
      const questionIndex = state.questions.findIndex((question: Question) => question.id === payload.id)
      state.questions.splice(questionIndex, 1, payload)
    },
  },

  actions: {},
}
