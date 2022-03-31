<template>
  <div class="form-control">
    <h3>{{ question.question }}</h3>
    <ol>
      <li v-for="(choice, index) in question.choices"
        :key="choice.answer"
        :class="correctAnswer(choice.correct)"
        @click="choiceSelect(choice)">
        {{ index + 1 }}. {{ choice.answer }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'QuizMultipleChoice',

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  emits: ['choice-select'],

  data() {
    return {
      choiceSelected: false,
    }
  },

  methods: {
    correctAnswer(correct) {
      if (this.choiceSelected) {
        if (correct) {
          return 'correct'
        } else {
          return 'incorrect'
        }
      }
    },
    choiceSelect(choice) {
      // this.choiceSelected = true
      // setTimeout(() => {
      this.$emit('choice-select', {
        correct: choice.correct,
        answer: choice.answer,
      })
      // }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
ol {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0.75rem 0;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: var(--light-blue);
      border: 1px solid var(--blue);
    }

    &.incorrect {
      background-color: rgb(248, 215, 215);
    }

    &.correct {
      background-color: rgb(207, 248, 207);
    }
  }
}
</style>
