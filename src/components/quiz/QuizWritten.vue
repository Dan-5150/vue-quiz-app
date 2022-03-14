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

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  emits: ['written-select'],

  data() {
    return {
      answer: '',
    }
  },

  methods: {
    writtenSelect() {
      this.$emit('written-select', this.answer)
    },
  },
}
</script>
