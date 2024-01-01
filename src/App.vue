<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <img alt="Propulso logo" class="logo" src="@/assets/propulso.png" width="125" height="125" />

      <nav class="nav-links">
        <RouterLink to="/">Statistics</RouterLink>
        <RouterLink to="/visitors">Visitors</RouterLink>
      </nav>
    </header>

    <div class="component">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
}

.logo {
  display: block;
  margin-right: 2rem;
}

.nav-links {
  display: flex;
}

.nav-links a {
  padding: 0 1rem;
  color: var(--color-text);
  text-decoration: none;
  border-left: 1px solid var(--color-border);
}

.nav-links a:first-of-type {
  border: 0;
}

.nav-links a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

.component {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
