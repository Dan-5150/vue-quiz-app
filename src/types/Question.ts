import { QuestionType } from '@/enums/QuestionType'
import { Choice } from './Choice'

export interface Question {
  id: string,
  question: string,
  questionType: QuestionType | string,
  choices?: Choice[],
  answer?: string,
}
