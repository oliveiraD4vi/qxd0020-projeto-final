<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import PageHeader from "../../../components/PageHeader/PageHeader.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader title="Reservas" />
  </main>
  <FooterVue />
</template>

<style src="./Reservations.scss" lang="scss" scoped />
