<script setup>
  import Header from './components/Header/Header.vue';
  import Footer from './components/Footer/Footer.vue';
</script>

<template>

  <Header />
  <main class="main-container">
    <router-view />
  </main>
  <Footer />

</template>
