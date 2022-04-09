<template>
  <base-card classes="card-sm text-left">
    <question-form process-type="new"
      @question-form="submitForm" />
  </base-card>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import QuestionForm from './QuestionForm.vue'

const store = useStore()
const router = useRouter()

/**
 * Submit form
 * Add question to store
 * @param {*} formData Question data
 */
const submitForm = (formData) => {
  if (formData.questionType === 'text') {
    const newQuestion = {
      id: uuidv4(),
      question: formData.question,
      questionType: formData.questionType,
      answer: formData.textAnswer,
    }
    store.commit('questions/newQuestion', newQuestion)
  } else if (formData.questionType === 'multipleChoice') {
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
