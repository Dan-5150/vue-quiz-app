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

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserInfo from '../components/quiz/UserInfo.vue'

const route = useRoute()
const store = useStore()

/**
 * Return user
 */
const user = computed(() => {
  return store.state.quiz.user
})

/**
 * Return sort order
 */
const sortOrder = computed(() => {
  return store.state.quiz.sortOrder
})

/**
 * Return sorted questions
 */
const sortedQuestions = computed(() => {
  return store.state.quiz.sortedQuestions
})

/**
 * Return if current route is quiz-setup
 */
const currentRoute = computed(() => {
  return route.name === 'quiz-setup'
})

/**
 * Return quiz link with first question as ID
 */
const startQuizLink = computed(() => {
  if (sortedQuestions.value.ength === 0) return
  const firstQuestion = sortedQuestions.value[0]
  return `/quiz/${firstQuestion.id}`
})
</script>

<style lang="scss" scoped>
.new-user {
  margin-bottom: 1rem;
}
</style>
