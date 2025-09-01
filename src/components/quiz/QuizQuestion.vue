<template>
  <section>
    <base-card classes="card-sm text-left">
      <transition
        name="fade"
        mode="out-in"
      >
        <template v-if="correctAnswer === null">
          <quiz-multiple-choice
            v-if="selectedQuestion?.questionType === QuestionType.multipleChoice"
            :question="selectedQuestion"
            @choice-select="choiceSelect"
          />
          <quiz-written
            v-else
            :question="selectedQuestion!"
            @written-select="writtenSelect"
          />
        </template>
        <div
          v-else-if="correctAnswer"
          class="feedback"
          :class="feedbackClass"
        >
          <h2>Correct!</h2>
          <p>Well done!</p>
        </div>
        <div
          v-else-if="!correctAnswer"
          class="feedback"
          :class="feedbackClass"
        >
          <h2>Incorrect!</h2>
          <p>Better luck next time...</p>
        </div>
      </transition>
    </base-card>
    <div
      v-if="correctAnswer !== null && !isLastQuestion"
      class="form-control"
    >
      <base-button @click="nextQuestion"> Next Question </base-button>
    </div>
    <div
      v-else-if="correctAnswer !== null && isLastQuestion"
      class="form-control"
    >
      <base-button
        :link="true"
        to="/quiz-finish"
      >
        Finish Quiz
      </base-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

import { QuestionType } from '@/enums/QuestionType'
import { useQuizStore } from '@/stores/quiz'
import { Choice } from '@/types/Choice'
import { SortedQuestion } from '@/types/SortedQuestion'

import QuizMultipleChoice from './QuizMultipleChoice.vue'
import QuizWritten from './QuizWritten.vue'

const quizStore = useQuizStore()
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
  return quizStore.sortedQuestions
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
onBeforeMount((): void => {
  selectedQuestion.value = sortedQuestions.value.find((question: SortedQuestion) => question.id === props.id)
})

/**
 * Check if choice selected is correct or not and save result
 * @param choice Choice selected
 */
const choiceSelect = (choice: Choice): void => {
  if (choice.correct) {
    correctAnswer.value = true
  } else {
    correctAnswer.value = false
  }
  quizStore.addQuizResult({
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
  quizStore.addQuizResult({
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
