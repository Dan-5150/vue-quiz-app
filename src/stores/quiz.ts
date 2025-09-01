import { defineStore } from 'pinia'
import { Question } from '@/types/Question'
import { QuizState, User } from '@/types/QuizState'
import { QuestionResponse, SortedQuestion } from '@/types/SortedQuestion'
import { SortOrder } from '@/enums/SortOrder'
import { useQuestionsStore } from './questions'

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    user: {
      name: '',
      age: null,
    },
    sortOrder: SortOrder.definedOrder,
    sortedQuestions: [],
  }),

  getters: {
    /**
     * Gets questions from questions store
     * @returns Questions from questions store
     */
    questions: (): Question[] => {
      const questionsStore = useQuestionsStore()
      return questionsStore.questions
    },
  },

  actions: {
    /**
     * Updates user info
     * @param {User} payload User info
     */
    updateUser(payload: User): void {
      this.user = payload
    },
    /**
     * Updates sort order
     * @param {string} payload Sort order
     */
    updateSortOrder(payload: SortOrder): void {
      this.sortOrder = payload
    },
    /**
     * Clears user info
     */
    clearUserInfo(): void {
      this.user = {
        name: '',
        age: null,
      }
    },
    /**
     * Adds new quiz response
     * @param {QuestionResponse} payload User response to question
     */
    addQuizResult(payload: QuestionResponse): void {
      this.sortedQuestions[payload.index].isCorrect = payload.isCorrect
      this.sortedQuestions[payload.index].response = payload.response
    },
    /**
     * Sort final quiz results by correct/incorrect responses
     */
    sortQuizResults(): void {
      this.sortedQuestions.sort((a: SortedQuestion, b: SortedQuestion) => (a.isCorrect < b.isCorrect && 1) || -1)
    },
    /**
     * Clears quiz results
     */
    clearQuizResults(): void {
      this.sortedQuestions = []
    },

    /**
     * Fetch user age from agify.io API
     * @param {string} payload Name to query
     */
    async fetchUserAge(payload: { name: string }): Promise<void> {
      const response = await fetch(`https://api.agify.io/?name=${payload.name}`)
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      const newUser = {
        name: payload.name,
        age: responseData.age,
      }
      this.user = newUser
    },
    /**
     * Sort questions array to specified sort type
     * @param {string} payload Sort type
     */
    sortQuestions(payload: string): void {
      // Clear questions
      this.sortedQuestions = []

      const questionsWithResponses = this.questions.map((q) => ({ ...q, isCorrect: false, response: '' }))

      if (payload === SortOrder.definedOrder) {
        this.sortedQuestions = questionsWithResponses
      } else if (payload === SortOrder.alphabeticalOrder) {
        this.sortedQuestions = questionsWithResponses
        this.sortedQuestions.sort((a: Question, b: Question) => a.question.localeCompare(b.question))
      } else if (payload === SortOrder.questionTypeOrder) {
        this.sortedQuestions = questionsWithResponses
        this.sortedQuestions.sort((a: Question, b: Question) => a.questionType.localeCompare(b.questionType))
      }
    },
  },
})
