<template>
  <section>
    <base-card>
      <h1>Edit Questions</h1>
      <p>View, add, update or delete questions here.</p>
      <base-button :link="true"
        to="/questions/new">
        New Question
      </base-button>
      <router-view />
      <question-item :questions="questions"
        @delete-question="deleteQuestion" />
    </base-card>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import QuestionItem from '../components/questions/QuestionItem.vue'

export default {
  components: {
    'question-item': QuestionItem,
  },

  computed: {
    ...mapState('questions', ['questions']),
  },

  methods: {
    ...mapMutations('questions', ['deleteQuestion']),
    // Using this.$store
    // deleteQuestion(index) {
    //   this.$store.commit('questions/deleteQuestion', index)
    // },
  },
}
</script>
