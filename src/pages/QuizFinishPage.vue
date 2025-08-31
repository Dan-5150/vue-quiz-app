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
        <li
          v-for="(question, index) in sortedQuestions"
          :key="question.id"
          :class="question.isCorrect ? 'correct' : 'incorrect'"
        >
          <h3>{{ index + 1 }}. {{ question.question }}</h3>
          <span v-if="question.questionType === QuestionType.multipleChoice">
            Your Response: {{ question.response }}
            <br />
            Answer: {{ correctChoice(question.choices) }}
          </span>
          <span v-else>
            Your Response: {{ question.response }}
            <br />
            Answer: {{ question.answer }}
          </span>
        </li>
      </ul>
      <base-button
        :link="true"
        to="/"
      >
        Back Home
      </base-button>
    </base-card>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { SortedQuestion } from '@/types/SortedQuestion'
import { Choice } from '@/types/Choice'
import { QuestionType } from '@/enums/QuestionType'

const router = useRouter()
const store = useStore()

const score = ref(0)

/**
 * Sort quiz results
 */
const sortResults = (): void => store.commit('quiz/sortQuizResults')

/**
 * Get sorted questions from quiz
 */
const sortedQuestions = computed<SortedQuestion[]>(() => {
  return store.state.quiz.sortedQuestions
})

/**
 * Get number of questions in quiz
 */
const numQuestions = computed<number>(() => {
  return sortedQuestions.value.length
})

/**
 * Redirect away from page if no quiz questions exist or begin calculating score
 */
onBeforeMount((): void => {
  if (sortedQuestions.value.length === 0) {
    router.push('/')
  }
  calcaulateScore()
})

/**
 * Loop through questions and calculate final score
 */
const calcaulateScore = (): void => {
  for (const question of sortedQuestions.value) {
    if (question.isCorrect) score.value++
  }
}

/**
 * Return correct multiple choice answer
 * @param {Array<Choice>} choices Choices
 */
const correctChoice = (choices: Choice[] | undefined): string | undefined => {
  for (const choice of choices!) {
    if (choice.correct) {
      return choice.answer
    }
  }
}

/**
 * Display warning alert if routing away from page
 * @param {*} _to
 * @param {*} _from
 * @param {*} next
 */
onBeforeRouteLeave((_to, _from, next): void => {
  // Navigate away if no results found
  if (store.state.quiz.sortedQuestions.length === 0) {
    next()
    return
  }
  // Display confirmation message
  const confirm = window.confirm(
    'Are you sure you want to leave? All your quiz results will be cleared.',
  )
  if (confirm) {
    // this.clearQuizResults()
    store.commit('quiz/clearQuizResults')
    next()
  } else {
    next(false)
  }
})
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
