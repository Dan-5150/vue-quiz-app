<template>
  <transition-group name="question">
    <base-card v-for="(question, index) in questions"
      :key="question.id"
      classes="card-sm text-left">
      <div>
        <div class="header">
          <h3>{{ index + 1 }}. {{ question.question }}</h3>
          <div>
            <base-button classes="small"
              :link="true"
              :to="`/questions/${question.id}/edit`">
              Edit
            </base-button>
            <base-button classes="small red"
              @click.native="deleteQuestion(index)">
              Delete
            </base-button>
          </div>
        </div>
        <ul v-if="question.choices">
          <li v-for="(choice, idx) in question.choices"
            :key="choice.answer"
            :class="correctAnswer(choice.correct)">
            {{ idx + 1 }}. {{ choice.answer }}
          </li>
        </ul>
        <p v-else>
          {{ question.answer }}
        </p>
      </div>
    </base-card>
  </transition-group>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  emits: ['delete-question'],
  computed: {
    editContactLink(id) {
      return `/questions/${id}/edit`
    },
  },
  methods: {
    correctAnswer(correct) {
      if (correct) {
        return 'correct'
      } else {
        return 'incorrect'
      }
    },
    deleteQuestion(index) {
      this.$emit('delete-question', index)
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;

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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

// Animations
.question-enter-active {
  animation: slide-in 0.5s ease-out;
}

.question-leave-active {
  animation: slide-in 0.5s ease-in reverse;
  // Make move work
  // position: absolute;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
