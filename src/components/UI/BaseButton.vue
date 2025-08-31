<template>
  <button
    v-if="!link"
    :class="classes"
  >
    <slot />
  </button>
  <router-link
    v-else
    :class="classes"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',

  props: {
    classes: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
  margin: 0 0.2rem;
  display: inline-block;

  &:hover,
  &:active {
    background-color: var(--dark-blue);
    border-color: var(--dark-blue);
  }

  &.flat {
    background-color: transparent;
    color: var(--blue);
    border: none;

    &:hover,
    &:active {
      background-color: var(--light-blue);
    }
  }

  &.outline {
    background-color: transparent;
    border-color: var(--dark-blue);
    color: var(--dark-blue);

    &:hover,
    &:active {
      background-color: var(--light-blue);
    }
  }

  &.small {
    padding: 0.3rem 0.75rem;
  }

  &.red {
    background-color: crimson;
    color: white;
    border: 1px solid crimson;

    &:hover,
    &:active {
      background-color: lightcoral;
      border-color: lightcoral;
    }
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    color: black;
    cursor: default;
  }
}
</style>
