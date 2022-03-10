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
      <div class="form-control">
        <label for="name">Age</label>
        <base-button v-if="!user.age && !isLoading"
          type="button"
          classes="small"
          @click.native="calculateUserAge">
          Get Age
        </base-button>
        <input v-else-if="user.age && !isLoading"
          id="name"
          :value="user.age"
          type="text"
          disabled>
        <base-loading-spinner v-if="isLoading" />
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

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      username: {
        value: '',
        isValid: true,
      },
      userAge: null,
      sortOrder: [
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
      ],
      selectedSortOrder: 'defined-order',
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters('quiz', ['user']),
  },
  created() {
    this.$store.commit('quiz/clearUserInfo')
  },
  methods: {
    validateForm() {
      if (this.username.value === '') {
        this.username.isValid = false
      }
    },
    async calculateUserAge() {
      this.validateForm()
      if (!this.username.isValid) return
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchUserAge', {
          name: this.username.value,
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    clearValidity(input) {
      if (this[input].value) {
        this[input].isValid = true
      }
    },
    submitForm() {
      this.validateForm()
      this.$store.commit('quiz/updateSortOrder', this.selectedSortOrder)
      this.$store.dispatch('quiz/sortQuestions', this.selectedSortOrder)
      this.$router.replace('/quiz-setup')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
