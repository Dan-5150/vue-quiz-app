<template>
  <section>
    <base-card>
      <h1>The Quiz</h1>
      <p>Try not to lose...</p>
      <router-view v-slot="{ Component, route }">
        <transition name="quiz-route"
          mode="out-in">
          <component :is="Component"
            :key="route.path" />
        </transition>
      </router-view>
    </base-card>
  </section>
</template>

<script setup>
import { computed, defineProps, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

defineProps({
  id: {
    type: String,
    required: true,
  },
})

const store = useStore()
const router = useRouter()

/**
 * Get quiz sorted questions
 */
const sortedQuestions = computed(() => {
  return store.state.quiz.sortedQuestions
})

/**
 * Go back to quiz setup page if no questions are in quiz
 */
onBeforeMount(() => {
  if (sortedQuestions.value.length === 0) {
    router.replace('/quiz-setup')
  }
})
</script>

<style lang="scss" scoped>
.quiz-route-enter-from {
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
