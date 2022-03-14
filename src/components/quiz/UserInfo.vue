<template>
  <section>
    <base-card classes="card-sm text-left">
      <div class="row">
        <div class="col">
          <h3>Name</h3>
          <p>{{ user.name }}</p>
        </div>
        <div class="col">
          <h3>Age</h3>
          <p>{{ user.age }}</p>
        </div>
        <div class="col">
          <h3>Sort Order</h3>
          <p>{{ sortOrderText }}</p>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    sortOrder: {
      type: String,
      required: true,
    },
  },

  computed: {
    sortOrderText() {
      if (this.sortOrder === 'defined-order') {
        return 'Defined Order'
      } else if (this.sortOrder === 'alphabetical-order') {
        return 'Alphabetical Order'
      } else if (this.sortOrder === 'question-type-order') {
        return 'Question Type Order'
      } else {
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;

  .col {
    // min-width: 33%;
    flex: 1 0 0%;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
}
</style>
