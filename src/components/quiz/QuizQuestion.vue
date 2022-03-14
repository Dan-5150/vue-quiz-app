<template>
  <section>
    <base-card classes="card-sm text-left">
      <transition name="fade"
        mode="out-in">
        <template v-if="correctAnswer === null">
          <quiz-multiple-choice v-if="selectedQuestion.questionType === 'multipleChoice'"
            :question="selectedQuestion"
            @choice-select="choiceSelect" />
          <quiz-written v-else
            :question="selectedQuestion"
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

<script>
import { mapState } from 'vuex'
import QuizMultipleChoice from './QuizMultipleChoice.vue'
import QuizWritten from './QuizWritten.vue'

export default {
  components: {
    QuizMultipleChoice,
    QuizWritten,
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
      correctAnswer: null,
    }
  },

  computed: {
    ...mapState('quiz', ['sortedQuestions']),
    feedbackClass() {
      if (this.correctAnswer) {
        return 'correct'
      } else if (!this.correctAnswer) {
        return 'incorrect'
      } else {
        return ''
      }
    },
    isLastQuestion() {
      const currentQnIndex = this.sortedQuestions.findIndex(question => question.id === this.id)
      const lastQnIndex = this.sortedQuestions.length - 1
      return lastQnIndex === currentQnIndex
    },
  },

  created() {
    this.selectedQuestion = this.sortedQuestions.find(question => question.id === this.id)
    console.log('current question', this.selectedQuestion)
  },

  methods: {
    choiceSelect(choice) {
      if (choice.correct) {
        this.correctAnswer = true
      } else {
        this.correctAnswer = false
      }
      this.$store.commit('quiz/addQuizResult', {
        isCorrect: this.correctAnswer,
        response: choice.answer,
        index: this.sortedQuestions.findIndex(question => question.id === this.id),
      })
    },
    writtenSelect(answer) {
      if (answer.trim().toLowerCase() === this.selectedQuestion.answer.trim().toLowerCase()) {
        this.correctAnswer = true
      } else {
        this.correctAnswer = false
      }
      this.$store.commit('quiz/addQuizResult', {
        isCorrect: this.correctAnswer,
        response: answer,
        index: this.sortedQuestions.findIndex(question => question.id === this.id),
      })
    },
    nextQuestion() {
      const currentIndex = this.sortedQuestions.findIndex(question => question.id === this.id)
      const newQuestion = this.sortedQuestions[currentIndex + 1]
      this.$router.replace(`/quiz/${newQuestion.id}`)
    },
  },
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

.fade-enter {
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
