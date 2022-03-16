<template>
  <section>
    <base-card>
      <img src="../assets/undraw_questions.svg"
        alt="FAQ"
        height="120">
      <h1>Take The Quiz</h1>
      <div class="new-user">
        <base-button v-if="currentRoute"
          :link="true"
          to="/quiz-setup/new-user">
          New User
        </base-button>
        <base-button v-else
          :link="true"
          classes="outline"
          to="/quiz-setup">
          Close
        </base-button>
        <router-view />
      </div>
      <div v-if="user.name && sortOrder && currentRoute">
        <user-info :user="user"
          :sort-order="sortOrder" />
        <base-button :link="true"
          :to="startQuizLink">
          Start Quiz
        </base-button>
      </div>
    </base-card>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import UserInfo from '../components/quiz/UserInfo.vue'

export default {
  components: {
    'user-info': UserInfo,
  },

  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    ...mapState('quiz', ['user', 'sortOrder', 'sortedQuestions']),
    currentRoute() {
      return this.$route.name === 'quiz-setup'
    },
    startQuizLink() {
      const firstQuestion = this.sortedQuestions[0]
      return `/quiz/${firstQuestion.id}`
    },
  },
}
</script>

<style lang="scss" scoped>
.new-user {
  margin-bottom: 1rem;
}
</style>
