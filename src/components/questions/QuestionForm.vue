<template>
  <form @submit.prevent="submitForm">
    <!-- Question -->
    <div class="form-control"
      :class="{ invalid: !question.isValid }">
      <label for="question">Question</label>
      <input id="question"
        v-model.trim="question.value"
        type="text"
        @blur="clearValidity('question')">
    </div>
    <!-- Question type (new question) -->
    <div v-if="processType === 'new'"
      class="form-control flex"
      :class="{ invalid: !questionType.isValid }">
      <div>
        <input id="multipleChoice"
          v-model.trim="questionType.value"
          type="radio"
          name="questionType"
          value="multipleChoice"
          @blur="clearValidity('questionType')">
        <label for="multipleChoice">Multiple Choice</label>
      </div>
      <div>
        <input id="textAnswer"
          v-model.trim="questionType.value"
          type="radio"
          name="questionType"
          value="text"
          @blur="clearValidity('questionType')">
        <label for="textAnswer">Text Answer</label>
      </div>
    </div>
    <!-- Text answer -->
    <div v-if="questionType.value === 'text' || editQuestion.questionType === 'text'"
      class="form-control"
      :class="{ invalid: !textAnswer.isValid }">
      <label for="text-answer">Answer</label>
      <textarea id="text-answer"
        v-model.trim="textAnswer.value"
        rows="4"
        @blur="clearValidity('textAnswer')" />
    </div>
    <!-- Multiple choice controls -->
    <div v-else-if="questionType.value === 'multipleChoice' || editQuestion.questionType === 'multipleChoice'"
      class="form-control text-center">
      <base-button type="button"
        classes="small"
        @click.native="addNewChoice">
        Add New Choice
      </base-button>
      <p v-if="!choices.isValid"
        class="invalid">
        One or more of your choices are invalid.
      </p>
      <p v-if="!choices.singleCorrect"
        class="invalid">
        Your question must have only 1 correct answer.
      </p>
    </div>
    <!-- Multiple choice fields -->
    <div v-for="(choice, index) in choices.value"
      :key="choice.name"
      class="choice"
      :class="{ invalid: !choices.isValid || !choices.singleCorrect }">
      <div class="form-control">
        <label :for="`question-${index}`">{{ index + 1 }}. Answer</label>
        <input :id="`question-${index}`"
          v-model="choice.answer"
          type="text">
        <base-button type="button"
          classes="small red"
          @click.native="removeChoice(index)">
          Remove
        </base-button>
      </div>
      <div class="form-control">
        <input :id="`correctAnswer-${index}`"
          v-model="choice.correct"
          type="checkbox"
          value="correctAnswer">
        <label :for="`correctAnswer-${index}`">Correct Answer?</label>
      </div>
    </div>
    <!-- Buttons -->
    <div class="form-control">
      <base-button type="submit">
        Submit
      </base-button>
      <base-button type="button"
        classes="outline"
        :link="true"
        to="/questions">
        {{ processType === 'edit' ? 'Back' : 'Close' }}
      </base-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'QuestionForm',

  props: {
    processType: {
      type: String,
      required: true,
    },
    editQuestion: {
      type: Object,
      required: false,
      default() {
        return {
          question: null,
          questionType: null,
          choices: null,
          answer: null,
        }
      },
    },
  },

  emits: ['question-form'],

  data() {
    return {
      question: {
        value: '',
        isValid: true,
      },
      questionType: {
        value: '',
        isValid: true,
      },
      textAnswer: {
        value: '',
        isValid: true,
      },
      choices: {
        value: [],
        isValid: true,
        singleCorrect: true,
      },
      formIsValid: true,
    }
  },

  created() {
    if (this.processType === 'edit') {
      this.question.value = this.editQuestion.question
      if (this.editQuestion.questionType === 'multipleChoice') {
        this.choices.value = [...this.editQuestion.choices]
        this.questionType.value = 'multipleChoice'
      } else {
        this.textAnswer.value = this.editQuestion.answer
        this.questionType.value = 'text'
      }
    }
  },

  methods: {
    validateForm() {
      this.formIsValid = true
      let correctAnswers = 0

      // Empty question
      if (this.question.value === '') {
        this.question.isValid = false
        this.formIsValid = false
      }
      // Question type (for new questions)
      if (this.questionType.value === '' && this.processType === 'new') {
        this.questionType.isValid = false
        this.formIsValid = false
      }
      // Empty text based answer
      if (this.textAnswer.value === '' && this.questionType.value === 'text') {
        this.textAnswer.isValid = false
        this.formIsValid = false
      }
      // No choices (for new questions)
      if (this.choices.value.length === 0 && this.questionType.value === 'multipleChoice') {
        this.choices.isValid = false
        this.formIsValid = false
      }
      // No empty choices
      for (const choice of this.choices.value) {
        if (choice.correct) correctAnswers++
        if (choice.answer === '') {
          this.choices.isValid = false
          this.formIsValid = false
        }
      }
      // Only 1 choice can be marked as correct
      if (this.choices.value.length > 0 && correctAnswers !== 1) {
        this.choices.singleCorrect = false
        this.formIsValid = false
      }
    },
    clearValidity(input) {
      if (this[input].value) {
        this[input].isValid = true
      }
    },
    submitForm() {
      this.validateForm()
      if (!this.formIsValid) return

      if (this.processType === 'new') {
        const questionForm = {
          question: this.question.value,
          questionType: this.questionType.value,
          textAnswer: this.textAnswer.value,
          choices: this.choices.value,
        }
        this.$emit('question-form', questionForm)
      } else if (this.processType === 'edit') {
        const questionForm = {
          question: this.question.value,
          questionType: this.editQuestion.questionType,
          textAnswer: this.textAnswer.value,
          choices: this.choices.value,
        }
        this.$emit('question-form', questionForm)
      }
    },
    addNewChoice() {
      const choice = {
        answer: '',
        correct: false,
      }
      this.choices.value.push(choice)
    },
    removeChoice(index) {
      this.choices.value.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-control {
  position: relative;

  button.small.red {
    position: absolute;
    top: -8px;
    right: -3px;
  }
}
</style>
