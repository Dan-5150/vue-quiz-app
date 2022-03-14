<template>
  <section>
    <base-card>
      <h1>The Quiz</h1>
      <p>Try not to lose...</p>
      <transition name="quiz-route"
        mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </base-card>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('quiz', ['sortedQuestions']),
  },

  created() {
    if (this.sortedQuestions.length === 0) {
      this.$router.replace('/quiz-setup')
    }
  },
}
</script>

<style lang="scss" scoped>
.quiz-route-enter {
  opacity: 0;
  transform: translateX(50px);
}

.quiz-route-enter-to,
.quiz-route-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.quiz-route-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.quiz-route-enter-active {
  transition: all 0.3s ease-out;
}

.quiz-route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
