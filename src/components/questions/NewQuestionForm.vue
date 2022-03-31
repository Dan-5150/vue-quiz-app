<template>
  <base-card classes="card-sm text-left">
    <question-form process-type="new"
      @question-form="submitForm" />
  </base-card>
</template>

<script>
import { mapMutations } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import QuestionForm from './QuestionForm.vue'

export default {
  name: 'NewQuestionForm',

  components: {
    'question-form': QuestionForm,
  },

  methods: {
    ...mapMutations('questions', ['newQuestion']),
    submitForm(formData) {
      if (formData.questionType === 'text') {
        const newQuestion = {
          id: uuidv4(),
          question: formData.question,
          questionType: formData.questionType,
          answer: formData.textAnswer,
        }
        console.log(newQuestion)
        this.newQuestion(newQuestion)
        // Using this.$store
        // this.$store.commit('questions/newQuestion', newQuestion)
      } else if (formData.questionType === 'multipleChoice') {
        const newQuestion = {
          id: uuidv4(),
          question: formData.question,
          questionType: formData.questionType,
          choices: formData.choices,
        }
        console.log(newQuestion)
        this.newQuestion(newQuestion)
        // Using this.$store
        // this.$store.commit('questions/newQuestion', newQuestion)
      }
      this.$router.replace('/questions')
    },
  },
}
</script>
