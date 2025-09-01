import { QuestionType } from '@/enums/QuestionType'

import { Choice } from './Choice'

export interface QuestionResponse {
  index: number
  isCorrect: boolean
  response: string
}

export interface SortedQuestion {
  answer?: string
  choices?: Choice[]
  id: string
  // Responses
  isCorrect: boolean
  question: string
  questionType: QuestionType
  response: string
}

export interface SortedQuestions {
  questions: SortedQuestion[]
}
