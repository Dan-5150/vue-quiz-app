<template>
  <div>
    <div class="form-control">
      <h3>{{ question.question }}</h3>
      <textarea id="writtenResponse"
        v-model="answer"
        name="writtenResponse"
        rows="4" />
    </div>
    <div class="form-control">
      <base-button classes="small"
        :disabled="!answer"
        @click.native="writtenSelect">
        Submit
      </base-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  question: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['written-select'])

const answer = ref('')

/**
 * Record answer given
 */
const writtenSelect = () => {
  emit('written-select', answer.value)
}
</script>
