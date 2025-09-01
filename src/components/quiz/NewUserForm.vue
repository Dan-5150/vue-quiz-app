<template>
  <form @submit.prevent="submitForm">
    <base-card classes="card-sm text-left">
      <h2>User Info</h2>
      <div
        class="form-control"
        :class="{ invalid: !username.isValid }"
      >
        <label for="name">Name</label>
        <input
          id="name"
          v-model.trim="username.value"
          type="text"
          @blur="clearValidity(username)"
        />
      </div>
      <div class="form-control age-input">
        <label for="name">Age</label>
        <base-loading-spinner v-if="isLoading" />
        <template v-else>
          <template v-if="user.age">
            <input
              id="name"
              :value="user.age"
              type="text"
              disabled
            />
            <base-button
              type="button"
              classes="small red"
              @click="clearAge"
            >
              Clear
            </base-button>
          </template>
          <base-button
            v-else
            type="button"
            classes="small"
            @click="calculateUserAge"
          >
            Get Age
          </base-button>
        </template>
      </div>
      <div class="form-control">
        <label for="sort-order">Question Sort Order</label>
        <select
          id="sort-order"
          v-model="selectedSortOrder"
          name="sort-order"
        >
          <option
            v-for="order in sortOrder"
            :key="order.value"
            :value="order.value"
          >
            {{ order.name }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <base-button type="submit"> Submit </base-button>
      </div>
    </base-card>
  </form>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { SortOrder } from '@/enums/SortOrder'
import { useQuizStore } from '@/stores/quiz'
import { FormValues } from '@/types/Form'
import { User } from '@/types/QuizState'

const quizStore = useQuizStore()
const router = useRouter()

const username = reactive<FormValues>({
  value: '',
  isValid: true,
})

const sortOrder = ref([
  {
    name: 'Defined Order',
    value: SortOrder.definedOrder,
  },
  {
    name: 'Alphabetical Order',
    value: SortOrder.alphabeticalOrder,
  },
  {
    name: 'Question Type Order',
    value: SortOrder.questionTypeOrder,
  },
])

const selectedSortOrder = ref(SortOrder.definedOrder)

const isLoading = ref(false)

/**
 * Return user info from store
 */
const user = computed<User>(() => {
  return quizStore.user
})

/**
 * Clear existing user info
 */
onBeforeMount((): void => {
  clearAge()
})

/**
 * Clear calculated age
 */
const clearAge = (): void => {
  quizStore.clearUserInfo()
}

/**
 * Validate form
 */
const validateForm = (): void => {
  if (username.value === '') {
    username.isValid = false
  }
}

/**
 * Calculate user age based on name
 */
const calculateUserAge = async (): Promise<void> => {
  validateForm()
  if (!username.isValid) return

  isLoading.value = true
  try {
    await quizStore.fetchUserAge({
      name: username.value,
    })
  } catch (error: unknown) {
    console.error((error as Error).message || 'Something went wrong!')
  }
  isLoading.value = false
}

/**
 * Clear form validity on input blur
 * @param input Form input
 */
const clearValidity = (input: FormValues): void => {
  if (input.value) {
    input.isValid = true
  }
}

/**
 * Submit user data and sort questions
 */
const submitForm = (): void => {
  validateForm()
  quizStore.updateSortOrder(selectedSortOrder.value)
  quizStore.sortQuestions(selectedSortOrder.value)
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
