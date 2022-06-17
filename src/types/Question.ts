import { QuestionType } from '@/enums/QuestionType'
import { Choice } from './Choice'

export interface Question {
  id: string,
  question: string,
  questionType: QuestionType,
  choices?: Choice[],
  answer?: string,
}
