<template>
  <base-card classes="card-sm text-left">
    <question-form
      :process-type="ProcessType.new"
      @question-form="submitForm"
    />
  </base-card>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'

import { ProcessType } from '@/enums/ProcessType'
import { QuestionType } from '@/enums/QuestionType'
import { useQuestionsStore } from '@/stores/questions'
import { Question } from '@/types/Question'

import QuestionForm from './QuestionForm.vue'

const questionsStore = useQuestionsStore()
const router = useRouter()

/**
 * Submit form
 * Add question to store
 * @param {Question} formData Question data
 */
const submitForm = (formData: Question): void => {
  if (formData.questionType === QuestionType.text) {
    const newQuestion = {
      id: uuidv4(),
      question: formData.question,
      questionType: formData.questionType,
      answer: formData.answer,
    }
    questionsStore.newQuestion(newQuestion)
  } else if (formData.questionType === QuestionType.multipleChoice) {
    const newQuestion = {
      id: uuidv4(),
      question: formData.question,
      questionType: formData.questionType,
      choices: formData.choices,
    }
    questionsStore.newQuestion(newQuestion)
  }
  router.replace('/questions')
}
</script>
