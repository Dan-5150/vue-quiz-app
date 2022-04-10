import { Choices } from './Choices';

export interface FormValues {
  value: string,
  isValid: boolean,
}

export interface FormChoices {
  values: Choices[],
  isValid: boolean,
  singleCorrect: boolean,
}
