<template>
  <div id="app">
    <the-header />
    <router-view v-slot="{ Component }">
      <transition name="route"
        mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue'

export default {
  components: {
    'the-header': TheHeader,
  },
}
</script>

<style lang="scss">
@import "./assets/styles/colours.scss";
@import "./assets/styles/forms.scss";

* {
  box-sizing: border-box;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}

// New element starting position
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

// Old element leaving position
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Animation
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

// Old element starting positon, new element ending position
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

// Shared styles
.text-center {
  text-align: center;
}
.flex {
  display: flex;
}
</style>
