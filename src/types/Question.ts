import { QuestionType } from '@/enums/QuestionType'

import { Choice } from './Choice'

export interface Question {
  answer?: string
  choices?: Choice[]
  id: string
  question: string
  questionType: QuestionType
}
