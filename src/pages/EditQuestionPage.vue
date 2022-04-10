<template>
  <section>
    <base-card classes="card-sm text-left">
      <h1>Edit Question</h1>
      <question-form :process-type="ProcessType.edit"
        :edit-question="selectedQuestion"
        @question-form="submitForm" />
    </base-card>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QuestionForm from '../components/questions/QuestionForm.vue'
import { Question } from '@/types/Question'
import { ProcessType } from '@/enums/ProcessType'
import { QuestionType } from '@/enums/QuestionType'

const store = useStore()
const router = useRouter()

const props = defineProps<{
  id: string,
}>()

const selectedQuestion = ref<Question>()

/**
 * Get selected question from route param id
 */
onBeforeMount((): void => {
  const questions = store.state.questions.questions
  selectedQuestion.value = questions.find((question: Question) => question.id === props.id)
})

/**
 * Submit edited question
 * @param {Question} formData Edited question
 */
const submitForm = (formData: Question): void => {
  console.log('formData', formData)
  if (formData.questionType === QuestionType.multipleChoice) {
    const editedQuestion = {
      id: selectedQuestion.value?.id!,
      question: formData.question,
      questionType: formData.questionType,
      choices: formData.choices,
    }
    editQuestion(editedQuestion)
  } else if (formData.questionType === QuestionType.text) {
    const editedQuestion = {
      id: selectedQuestion.value?.id!,
      question: formData.question,
      questionType: formData.questionType,
      answer: formData.answer,
    }
    editQuestion(editedQuestion)
  }
}

/**
 * Submit edited question and go back to questions page
 * @param {Question} question Edited question
 */
const editQuestion = (question: Question): void => {
  store.commit('questions/editQuestion', question)
  router.replace('/questions')
}
</script>
