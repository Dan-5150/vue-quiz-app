<template>
  <section>
    <base-card classes="card-sm text-left">
      <h1>Edit Question</h1>
      <question-form process-type="edit"
        :edit-question="selectedQuestion"
        @question-form="submitForm" />
    </base-card>
  </section>
</template>

<script setup>
import { defineProps, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QuestionForm from '../components/questions/QuestionForm.vue'

const store = useStore()
const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const selectedQuestion = ref(null)

/**
 * Get selected question from route param id
 */
onBeforeMount(() => {
  const questions = store.state.questions.questions
  selectedQuestion.value = questions.find((question) => question.id === props.id)
})

/**
 * Submit edited question
 * @param {*} formData Edited question
 */
const submitForm = (formData) => {
  console.log('formData', formData)
  if (formData.questionType === 'multipleChoice') {
    const editedQuestion = {
      id: selectedQuestion.value.id,
      question: formData.question,
      questionType: formData.questionType,
      choices: formData.choices,
    }
    editQuestion(editedQuestion)
  } else {
    const editedQuestion = {
      id: selectedQuestion.value.id,
      question: formData.question,
      questionType: formData.questionType,
      answer: formData.textAnswer,
    }
    editQuestion(editedQuestion)
  }
}

/**
 * Submit edited question and go back to questions page
 * @param {*} question Edited question
 */
const editQuestion = (question) => {
  store.commit('questions/editQuestion', question)
  router.replace('/questions')
}
</script>
