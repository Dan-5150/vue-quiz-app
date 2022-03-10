<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">
          Quiz App
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/questions">
            Edit Questions
          </router-link>
        </li>
        <li>
          <router-link to="/quiz-setup">
            Take the Quiz
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 5.5rem;
  background-color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;

  nav {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    a {
      text-decoration: none;
      color: white;
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border: 1px solid transparent;

      &:active,
      &:hover,
      &.router-link-active {
        border: 1px solid white;
        border-radius: 0.5rem;
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        margin: 0 0.5rem;
      }
    }

    h1 {
      margin: 0;

      a {
        color: white;
        margin: 0;

        &:hover,
        &:active,
        &.router-link-active {
          border-color: transparent;
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: auto;

    nav {
      width: 100%;
      flex-direction: column;

      a {
        padding: 0.5rem 1.5rem;
      }
    }
  }
}
</style>
