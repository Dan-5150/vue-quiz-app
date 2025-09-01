import { defineStore } from 'pinia'

import defaultQuestions from '@/assets/default-questions.json'
import { Question } from '@/types/Question'
import { QuestionsState } from '@/types/QuestionsState'

const fixedQuestions = defaultQuestions as Question[]

export const useQuestionsStore = defineStore('questions', {
  state: (): QuestionsState => ({
    questions: fixedQuestions,
  }),

  getters: {},

  actions: {
    /**
     * Add a new question
     * @param {Question} payload New question object
     */
    newQuestion(payload: Question): void {
      this.questions.push(payload)
    },
    /**
     * Delete a question
     * @param {number} payload Index of question to delete
     */
    deleteQuestion(payload: number): void {
      this.questions.splice(payload, 1)
    },
    /**
     * Edit an existing question
     * @param {Question} payload Edited question object
     */
    editQuestion(payload: Question): void {
      const questionIndex = this.questions.findIndex((question: Question) => question.id === payload.id)
      this.questions.splice(questionIndex, 1, payload)
    },
  },
})
