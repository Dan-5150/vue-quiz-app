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

<script lang="ts" setup>
import { ref, defineProps, defineEmits, PropType } from 'vue'
import { Question } from '@/types/Question'
import { Choices } from '@/types/Choices'

defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
})

const emit = defineEmits(['choice-select'])

const choiceSelected = ref(false)

/**
 * Return class names if answer is correct or incorrect
 * @param {boolean} correct Correct answer boolean
 */
const correctAnswer = (correct: boolean): string => {
  if (choiceSelected.value) {
    if (correct) {
      return 'correct'
    } else {
      return 'incorrect'
    }
  }
  return ''
}

/**
 * Record selected answer against correct answer
 * @param {Choices} choice 
 */
const choiceSelect = (choice: Choices): void => {
  // choiceSelected.value = true
  emit('choice-select', {
    correct: choice.correct,
    answer: choice.answer,
  })
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
