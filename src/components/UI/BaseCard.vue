<template>
  <div class="card"
    :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCard',

  props: {
    classes: {
      type: String,
      required: false,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 50rem;
  text-align: center;

  &.card-sm {
    max-width: 40rem;
  }

  &.text-left {
    text-align: left;
  }

  @media (max-width: 768px) {
    max-width: 95% !important;
  }
}
</style>
