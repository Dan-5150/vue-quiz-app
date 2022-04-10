import { QuestionType } from '@/enums/QuestionType'
import { Choices } from './Choices'

export interface Question {
  id: string,
  question: string,
  questionType: QuestionType | string,
  choices?: Choices[],
  answer?: string,
}
