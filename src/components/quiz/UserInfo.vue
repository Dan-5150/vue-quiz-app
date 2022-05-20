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

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { SortOrder } from '@/enums/SortOrder'
import { User } from '@/types/QuizState'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  sortOrder: {
    type: String as PropType<SortOrder>,
    required: true,
  },
})

/**
 * Display correct sort order from submitted form
 */
const sortOrderText = computed<string>(() => {
  if (props.sortOrder === SortOrder.definedOrder) {
    return 'Defined Order'
  } else if (props.sortOrder === SortOrder.alphabeticalOrder) {
    return 'Alphabetical Order'
  } else if (props.sortOrder === SortOrder.questionTypeOrder) {
    return 'Question Type Order'
  } else {
    return ''
  }
})
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
