<template>
  <base-card classes="card-sm text-left">
    <question-form
      :process-type="ProcessType.new"
      @question-form="submitForm"
    />
  </base-card>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import QuestionForm from './QuestionForm.vue'
import { Question } from '@/types/Question'
import { ProcessType } from '@/enums/ProcessType'
import { QuestionType } from '@/enums/QuestionType'

const store = useStore()
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
    store.commit('questions/newQuestion', newQuestion)
  } else if (formData.questionType === QuestionType.multipleChoice) {
    const newQuestion = {
      id: uuidv4(),
      question: formData.question,
      questionType: formData.questionType,
      choices: formData.choices,
    }
    store.commit('questions/newQuestion', newQuestion)
  }
  router.replace('/questions')
}
</script>
