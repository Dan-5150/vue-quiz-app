import { Choice } from './Choice'

export interface FormValues {
  value: string,
  isValid: boolean,
}

export interface FormChoices {
  values: Choice[],
  isValid: boolean,
  singleCorrect: boolean,
}
