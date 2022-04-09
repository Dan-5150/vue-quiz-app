<template>
  <form @submit.prevent="submitForm">
    <base-card classes="card-sm text-left">
      <h2>User Info</h2>
      <div class="form-control"
        :class="{ invalid: !username.isValid }">
        <label for="name">Name</label>
        <input id="name"
          v-model.trim="username.value"
          type="text"
          @blur="clearValidity('username')">
      </div>
      <div class="form-control age-input">
        <label for="name">Age</label>
        <base-loading-spinner v-if="isLoading" />
        <template v-else>
          <template v-if="user.age">
            <input id="name"
              :value="user.age"
              type="text"
              disabled>
            <base-button type="button"
              classes="small red"
              @click.native="clearAge">
              Clear
            </base-button>
          </template>
          <base-button v-else
            type="button"
            classes="small"
            @click.native="calculateUserAge">
            Get Age
          </base-button>
        </template>
      </div>
      <div class="form-control">
        <label for="sort-order">Question Sort Order</label>
        <select id="sort-order"
          v-model="selectedSortOrder"
          name="sort-order">
          <option v-for="order in sortOrder"
            :key="order.value"
            :value="order.value">
            {{ order.name }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <base-button type="submit">
          Submit
        </base-button>
      </div>
    </base-card>
  </form>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const username = reactive({
  value: '',
  isValid: true,
})

const sortOrder = ref([
  {
    name: 'Defined Order',
    value: 'defined-order',
  },
  {
    name: 'Alphabetical Order',
    value: 'alphabetical-order',
  },
  {
    name: 'Question Type Order',
    value: 'question-type-order',
  },
])

const selectedSortOrder = ref('defined-order')

const isLoading = ref(false)

const user = computed(() => {
  return store.state.quiz.user
})

/**
 * Clear existing user info
 */
onBeforeMount(() => {
  store.commit('quiz/clearUserInfo')
})

/**
 * Clear calculated age
 */
const clearAge = () => {
  store.commit('quiz/clearUserInfo')
}

/**
 * Validate form
 */
const validateForm = () => {
  if (username.value === '') {
    username.isValid = false
  }
}

/**
 * Calculate user age based on name
 */
const calculateUserAge = async () => {
  validateForm()
  if (!username.isValid) return

  isLoading.value = true
  try {
    await store.dispatch('quiz/fetchUserAge', {
      name: username.value,
    })
  } catch (error) {
    console.log(error.message || 'Something went wrong!')
  }
  isLoading.value = false
}

const clearValidity = (input) => {
  if ([input].value) {
    [input].isValid = true
  }
}

/**
 * Submit user data and sort questions
 */
const submitForm = () => {
  validateForm()
  store.commit('quiz/updateSortOrder', selectedSortOrder.value)
  store.dispatch('quiz/sortQuestions', selectedSortOrder.value)
  router.replace('/quiz-setup')
}
</script>

<style lang="scss" scoped>
.age-input {
  position: relative;

  button.small.red {
    position: absolute;
    top: 32px;
    right: 0;
  }
}
</style>
