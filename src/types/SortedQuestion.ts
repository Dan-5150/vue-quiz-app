import { QuestionType } from '@/enums/QuestionType'
import { Choices } from './Choices'

export interface SortedQuestion {
  id: string,
  question: string,
  questionType: QuestionType | string,
  choices?: Choices[],
  answer?: string,
  // Responses
  isCorrect: boolean,
  response: string,
}
