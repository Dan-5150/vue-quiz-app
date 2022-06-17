import { QuestionType } from '@/enums/QuestionType'
import { Choice } from './Choice'

export interface SortedQuestion {
  id: string,
  question: string,
  questionType: QuestionType,
  choices?: Choice[],
  answer?: string,
  // Responses
  isCorrect: boolean,
  response: string,
}

export interface QuestionResponse {
  isCorrect: boolean,
  response: string,
  index: number,
}

export interface SortedQuestions {
  questions: SortedQuestion[],
}
