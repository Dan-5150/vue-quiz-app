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

<script>
import { mapMutations, mapState } from 'vuex'
import QuestionForm from '../components/questions/QuestionForm.vue'

export default {
  components: {
    'question-form': QuestionForm,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedQuestion: null,
    }
  },

  computed: {
    ...mapState('questions', ['questions']),
  },

  created() {
    this.selectedQuestion = this.questions.find(question => question.id === this.id)
    console.log(this.selectedQuestion)
  },

  methods: {
    ...mapMutations('questions', {
      editQuestionStore: 'editQuestion',
    }),
    submitForm(formData) {
      console.log('formData', formData)
      if (formData.questionType === 'multipleChoice') {
        const editedQuestion = {
          id: this.selectedQuestion.id,
          question: formData.question,
          questionType: formData.questionType,
          choices: formData.choices,
        }
        this.editQuestion(editedQuestion)
      } else {
        const editedQuestion = {
          id: this.selectedQuestion.id,
          question: formData.question,
          questionType: formData.questionType,
          answer: formData.textAnswer,
        }
        this.editQuestion(editedQuestion)
      }
    },
    editQuestion(question) {
      // Using this.$store
      // this.$store.commit('questions/editQuestion', question)
      this.editQuestionStore(question)
      this.$router.replace('/questions')
    },
  },
}
</script>
