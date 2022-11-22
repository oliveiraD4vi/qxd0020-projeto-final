<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import ReservationForm from "../Form/ReservationForm.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader title="Inserir reserva" />
    <div class="data-container">
      <ReservationForm />
    </div>
  </main>
  <FooterVue />
</template>

<style src="./ReservationData.scss" lang="scss" scoped />
