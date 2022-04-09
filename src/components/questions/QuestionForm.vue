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
    <div v-for="(choice, index) in choices.values"
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

<script setup>
import { ref, reactive, defineProps, defineEmits, onBeforeMount } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits(['question-form'])

const question = reactive({
  value: '',
  isValid: true,
})

const questionType = reactive({
  value: '',
  isValid: true,
})

const textAnswer = reactive({
  value: '',
  isValid: true,
})

const choices = reactive({
  values: [],
  isValid: true,
  singleCorrect: true,
})

const formIsValid = ref(true)

/**
 * Display correct question type fields when editing question
 */
onBeforeMount(() => {
  if (props.processType === 'edit') {
    question.value = props.editQuestion.question
    if (props.editQuestion.questionType === 'multipleChoice') {
      choices.values = [...props.editQuestion.choices]
      questionType.value = 'multipleChoice'
    } else {
      textAnswer.value = props.editQuestion.answer
      questionType.value = 'text'
    }
  }
})

/**
 * Validate form fields
 */
const validateForm = () => {
  formIsValid.value = true
  let correctAnswers = 0

  // Empty question
  if (question.value === '') {
    question.isValid = false
    formIsValid.value = false
  }
  // Question type (for new questions)
  if (questionType.value === '' && props.processType === 'new') {
    questionType.isValid = false
    formIsValid.value = false
  }
  // Empty text based answer
  if (textAnswer.value === '' && questionType.value === 'text') {
    textAnswer.isValid = false
    formIsValid.value = false
  }
  // No choices (for new questions)
  if (choices.values.length === 0 && questionType.value === 'multipleChoice') {
    choices.isValid = false
    formIsValid.value = false
  }
  // No empty choices
  for (const choice of choices.values) {
    if (choice.correct) correctAnswers++
    if (choice.answer === '') {
      choices.isValid = false
      formIsValid.value = false
    }
  }
  // Only 1 choice can be marked as correct
  if (choices.values.length > 0 && correctAnswers !== 1) {
    choices.singleCorrect = false
    formIsValid.value = false
  }
}

const clearValidity = (input) => {
  if ([input].value) {
    [input].isValid = true
  }
}

/**
 * Submit question form and emit data back to parent
 */
const submitForm = () => {
  validateForm()
  if (!formIsValid.value) return

  if (props.processType === 'new') {
    const questionForm = {
      question: question.value,
      questionType: questionType.value,
      textAnswer: textAnswer.value,
      choices: choices.values,
    }
    emit('question-form', questionForm)
  } else if (props.processType === 'edit') {
    const questionForm = {
      question: question.value,
      questionType: props.editQuestion.questionType,
      textAnswer: textAnswer.value,
      choices: choices.values,
    }
    emit('question-form', questionForm)
  }
}

/**
 * Add new choice to multiple choice
 */
const addNewChoice = () => {
  const choice = {
    answer: '',
    correct: false,
  }
  choices.values.push(choice)
}

/**
 * Remove multiple choice field
 * @param {number} index Multiple choice index to remove
 */
const removeChoice = (index) => {
  choices.values.splice(index, 1)
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
