<script setup>
import HeaderVue from "../../components/Header/Header.vue";
import FooterVue from "../../components/Footer/Footer.vue";
import PageHeader from "../../components/PageHeader/PageHeader.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="payment-container">
      <PageHeader title="Efetuar Pagamento" />
      <div id="message">
        <p>Pagamento efetuado com sucesso!</p>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Payment.scss" lang="scss" scoped></style>
