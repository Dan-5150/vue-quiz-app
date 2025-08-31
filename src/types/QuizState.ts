import { SortOrder } from '@/enums/SortOrder'
import { SortedQuestion } from './SortedQuestion'

export interface QuizState {
  user: User
  sortOrder: SortOrder
  sortedQuestions: SortedQuestion[]
}

export interface User {
  name: string
  age: number | null
}
