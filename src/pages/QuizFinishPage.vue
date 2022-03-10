<template>
  <section>
    <base-card>
      <h1>Quiz Finished!</h1>
      <base-card classes="card-sm">
        <h1>Final Score</h1>
        <h2>{{ score }}/{{ numQuestions }}</h2>
      </base-card>
      <base-button @click.native="sortResults">
        Sort by Correct/Incorrect
      </base-button>
      <ul>
        <li v-for="(question, index) in sortedQuestions"
          :key="question.id"
          :class="question.isCorrect ? 'correct' : 'incorrect'">
          <h3>
            {{ index + 1 }}. {{ question.question }}
          </h3>
          <span v-if="question.questionType === 'multipleChoice'">
            Your Response: {{ question.response }}
            <br>
            Answer: {{ correctChoice(question.choices) }}
          </span>
          <span v-else>
            Your Response: {{ question.response }}
            <br>
            Answer: {{ question.answer }}
          </span>
        </li>
      </ul>
      <base-button :link="true"
        to="/">
        Back Home
      </base-button>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  beforeRouteLeave(to, from, next) {
    // Navigate away if no results found
    if (this.sortedQuestions.length === 0) {
      next()
      return
    }
    // Display confirmation message
    const confirm = window.confirm('Are you sure you want to leave? All your quiz results will be cleared.')
    if (confirm) {
      this.$store.commit('quiz/clearQuizResults')
      next()
    } else {
      next(false)
    }
  },
  data() {
    return {
      score: 0,
    }
  },
  computed: {
    ...mapGetters('quiz', ['sortedQuestions']),
    numQuestions() {
      return this.sortedQuestions.length
    },
  },
  // Redirect to home page if no quiz results found
  created() {
    if (this.sortedQuestions.length === 0) {
      this.$router.push('/')
    }
    this.calcaulateScore()
  },
  methods: {
    correctChoice(choices) {
      for (const choice of choices) {
        if (choice.correct) {
          return choice.answer
        }
      }
    },
    calcaulateScore() {
      for (const question of this.sortedQuestions) {
        if (question.isCorrect) this.score++
      }
    },
    sortResults() {
      this.$store.commit('quiz/sortQuizResults')
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;

  li {
    margin: 0.75rem 0;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;

    &.incorrect {
      background-color: rgb(248, 215, 215);
    }

    &.correct {
      background-color: rgb(207, 248, 207);
    }
  }
}
</style>
