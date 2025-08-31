import { QuestionsState } from './QuestionsState'
import { QuizState } from './QuizState'

export interface RootState {
  questions: QuestionsState
  quiz: QuizState
}
