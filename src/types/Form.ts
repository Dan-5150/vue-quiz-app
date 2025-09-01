import { Choice } from './Choice'

export interface FormChoices {
  isValid: boolean
  singleCorrect: boolean
  values: Choice[]
}

export interface FormValues {
  isValid: boolean
  value: string
}
