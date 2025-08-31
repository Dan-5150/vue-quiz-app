<template>
  <div>
    <div class="form-control">
      <h3>{{ question.question }}</h3>
      <textarea
        id="writtenResponse"
        v-model="answer"
        name="writtenResponse"
        rows="4"
        @keyup.enter="writtenSelect"
      />
    </div>
    <div class="form-control">
      <base-button
        classes="small"
        :disabled="!answer"
        @click.native="writtenSelect"
      >
        Submit
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { Question } from '@/types/Question'

defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
})

const emit = defineEmits(['written-select'])

const answer = ref('')

/**
 * Record answer given
 */
const writtenSelect = (): void => {
  emit('written-select', answer.value)
}
</script>
