<script setup>
  import Header from './components/Header/Header.vue';
  import Footer from './components/Footer/Footer.vue';
  import Home   from './components/Admin/Home.vue'
</script>

<template>
  <Header />
  <main class="main-container"> 
    <Home></Home> 
  </main>
  <Footer />
  
  <!--
    <Home></Home>
    <Header />
  <main class="main-container">
    <router-view />
  </main>
  <Footer />
  -->
  

</template>
