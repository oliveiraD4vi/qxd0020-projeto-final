<script setup>
  import Header from './components/Header/Header.vue';
</script>

<template>

  <Header />
  <main class="main-container">
    <router-view />
  </main>
  <footer class="footer-container">Footer</footer>

</template>
