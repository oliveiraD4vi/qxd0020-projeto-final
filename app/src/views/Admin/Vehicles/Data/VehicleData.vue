<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import VehicleForm from "../Form/VehicleForm.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader title="Inserir veículo" />
    <div class="data-container">
      <VehicleForm />
    </div>
  </main>
  <FooterVue />
</template>

<style src="./VehicleData.scss" lang="scss" scoped />
