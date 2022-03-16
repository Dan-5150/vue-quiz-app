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
        <base-loading-spinner v-if="isLoading" />
        <template v-else>
          <input v-if="user.age"
            id="name"
            :value="user.age"
            type="text"
            disabled>
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

<script>
import { mapMutations, mapState } from 'vuex'

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
    ...mapState('quiz', ['user']),
  },

  created() {
    this.clearUserInfo()
    // Using this.$store
    // this.$store.commit('quiz/clearUserInfo')
  },

  methods: {
    ...mapMutations('quiz', ['clearUserInfo']),
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
