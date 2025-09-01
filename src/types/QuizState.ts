import { SortOrder } from '@/enums/SortOrder'

import { SortedQuestion } from './SortedQuestion'

export interface QuizState {
  sortedQuestions: SortedQuestion[]
  sortOrder: SortOrder
  user: User
}

export interface User {
  age: null | number
  name: string
}
