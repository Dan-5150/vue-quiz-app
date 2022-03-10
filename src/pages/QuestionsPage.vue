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
import { mapGetters } from 'vuex'
import QuestionItem from '../components/questions/QuestionItem.vue'

export default {
  components: {
    QuestionItem,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('questions', ['questions']),
  },
  methods: {
    deleteQuestion(index) {
      this.$store.commit('questions/deleteQuestion', index)
    },
  },
}
</script>

<style>
</style>
