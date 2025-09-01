<template>
  <div class="form-control">
    <h3>{{ question.question }}</h3>
    <ol>
      <li
        v-for="(choice, index) in question.choices"
        :key="choice.answer"
        @click="choiceSelect(choice)"
      >
        {{ index + 1 }}. {{ choice.answer }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

import { Choice } from '@/types/Choice'
import { Question } from '@/types/Question'

defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
})

const emit = defineEmits(['choice-select'])

/**
 * Record selected answer against correct answer
 * @param {Choices} choice
 */
const choiceSelect = (choice: Choice): void => {
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
  }
}
</style>
