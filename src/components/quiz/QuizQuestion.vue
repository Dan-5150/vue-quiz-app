<template>
  <section>
    <base-card classes="card-sm text-left">
      <transition name="fade"
        mode="out-in">
        <template v-if="correctAnswer === null">
          <quiz-multiple-choice v-if="selectedQuestion?.questionType === QuestionType.multipleChoice"
            :question="selectedQuestion"
            @choice-select="choiceSelect" />
          <quiz-written v-else
            :question="selectedQuestion!"
            @written-select="writtenSelect" />
        </template>
        <div v-else-if="correctAnswer"
          class="feedback"
          :class="feedbackClass">
          <h2>Correct!</h2>
          <p>Well done!</p>
        </div>
        <div v-else-if="!correctAnswer"
          class="feedback"
          :class="feedbackClass">
          <h2>Incorrect!</h2>
          <p>Better luck next time...</p>
        </div>
      </transition>
    </base-card>
    <div v-if="correctAnswer !== null && !isLastQuestion"
      class="form-control">
      <base-button @click.native="nextQuestion">
        Next Question
      </base-button>
    </div>
    <div v-else-if="correctAnswer !== null && isLastQuestion"
      class="form-control">
      <base-button :link="true"
        to="/quiz-finish">
        Finish Quiz
      </base-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QuizMultipleChoice from './QuizMultipleChoice.vue'
import QuizWritten from './QuizWritten.vue'
import { SortedQuestion } from '@/types/SortedQuestion'
import { Choices } from '@/types/Choices'
import { QuestionType } from '@/enums/QuestionType'

const store = useStore()
const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const selectedQuestion = ref<SortedQuestion>()
const correctAnswer = ref<boolean | null>(null)

/**
 * Get sorted questions from store
 */
const sortedQuestions = computed(() => {
  return store.state.quiz.sortedQuestions
})

/**
 * Get class names for correct/incorrect answer
 */
const feedbackClass = computed<string>(() => {
  if (correctAnswer.value) {
    return 'correct'
  } else if (!correctAnswer.value) {
    return 'incorrect'
  } else {
    return ''
  }
})

/**
 * Determine if question is last question in quiz
 */
const isLastQuestion = computed<boolean>(() => {
  const currentQnIndex = sortedQuestions.value.findIndex((question: SortedQuestion) => question.id === props.id)
  const lastQnIndex = sortedQuestions.value.length - 1
  return lastQnIndex === currentQnIndex
})

/**
 * Get current question from route ID
 */
onBeforeMount(() => {
  selectedQuestion.value = sortedQuestions.value.find((question: SortedQuestion) => question.id === props.id)
  console.log('current question', selectedQuestion.value)
})

/**
 * Check if choice selected is correct or not and save result
 * @param choice Choice selected
 */
const choiceSelect = (choice: Choices): void => {
  if (choice.correct) {
    correctAnswer.value = true
  } else {
    correctAnswer.value = false
  }
  store.commit('quiz/addQuizResult', {
    isCorrect: correctAnswer.value,
    response: choice.answer,
    index: sortedQuestions.value.findIndex((question: SortedQuestion) => question.id === props.id),
  })
}

/**
 * Check if written answer matches correct answer and save result
 * @param answer Users answer
 */
const writtenSelect = (answer: string): void => {
  if (answer.trim().toLowerCase() === selectedQuestion.value?.answer?.trim().toLowerCase()) {
    correctAnswer.value = true
  } else {
    correctAnswer.value = false
  }
  store.commit('quiz/addQuizResult', {
    isCorrect: correctAnswer.value,
    response: answer,
    index: sortedQuestions.value.findIndex((question: SortedQuestion) => question.id === props.id),
  })
}

/**
 * Get ID for next question for route link
 */
const nextQuestion = (): void => {
  const currentIndex = sortedQuestions.value.findIndex((question: SortedQuestion) => question.id === props.id)
  const newQuestion = sortedQuestions.value[currentIndex + 1]
  router.replace(`/quiz/${newQuestion.id}`)
}
</script>

<script lang="ts">
// import { mapMutations, mapState } from 'vuex'

export default {
//   components: {
//     'quiz-multiple-choice': QuizMultipleChoice,
//     'quiz-written': QuizWritten,
//   },

  //   props: {
  //     id: {
  //       type: String,
  //       required: true,
  //     },
  //   },

  //   data() {
  //     return {
  //       selectedQuestion: null,
  //       correctAnswer: null,
  //     }
  //   },

  //   computed: {
  //     ...mapState('quiz', ['sortedQuestions']),
  //     feedbackClass() {
  //       if (this.correctAnswer) {
  //         return 'correct'
  //       } else if (!this.correctAnswer) {
  //         return 'incorrect'
  //       } else {
  //         return ''
  //       }
  //     },
  //     isLastQuestion() {
  //       const currentQnIndex = this.sortedQuestions.findIndex((question) => question.id === this.id)
  //       const lastQnIndex = this.sortedQuestions.length - 1
  //       return lastQnIndex === currentQnIndex
  //     },
  //   },

  //   created() {
  //     this.selectedQuestion = this.sortedQuestions.find((question) => question.id === this.id)
  //     console.log('current question', this.selectedQuestion)
  //   },

//   methods: {
//     ...mapMutations('quiz', ['addQuizResult']),
//     choiceSelect(choice) {
//       if (choice.correct) {
//         this.correctAnswer = true
//       } else {
//         this.correctAnswer = false
//       }
//       this.addQuizResult({
//         isCorrect: this.correctAnswer,
//         response: choice.answer,
//         index: this.sortedQuestions.findIndex((question) => question.id === this.id),
//       })
//     },
//     writtenSelect(answer) {
//       if (answer.trim().toLowerCase() === this.selectedQuestion.answer.trim().toLowerCase()) {
//         this.correctAnswer = true
//       } else {
//         this.correctAnswer = false
//       }
//       this.addQuizResult({
//         isCorrect: this.correctAnswer,
//         response: answer,
//         index: this.sortedQuestions.findIndex((question) => question.id === this.id),
//       })
//     },
//     nextQuestion() {
//       const currentIndex = this.sortedQuestions.findIndex((question) => question.id === this.id)
//       const newQuestion = this.sortedQuestions[currentIndex + 1]
//       this.$router.replace(`/quiz/${newQuestion.id}`)
//     },
//   },
}
</script>

<style lang="scss" scoped>
.feedback {
  text-align: center;

  &.correct {
    color: green;
  }

  &.incorrect {
    color: red;
  }
}

.fade-enter-from {
  opacity: 0;

  // transform: translateX(50px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  // transform: translateX(0);
}

.fade-leave-to {
  opacity: 0;
  // transform: translateX(-50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}

// .fade-leave-active {
//   transition: all 0.2s ease-in;
// }
</style>
