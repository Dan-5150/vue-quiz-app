<template>
  <section>
    <base-card>
      <img
        src="../assets/undraw_faq.svg"
        alt="FAQ"
        height="200"
      />
      <h1>Welcome to the {{ appName }}</h1>
      <p>{{ description }}</p>
      <base-button
        :link="true"
        to="/questions"
      >
        Edit Questions
      </base-button>
      <base-button
        :link="true"
        to="/quiz-setup"
      >
        Take the Quiz
      </base-button>
    </base-card>
  </section>
</template>

<script setup>
const appName = 'Quiz App'
const description = 'Feel free to explore the app...'
</script>

<script>
export default {
  name: 'HomePage',
}
</script>
