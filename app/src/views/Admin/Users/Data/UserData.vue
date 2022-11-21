<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import UserForm from "../Form/UserForm.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader title="Inserir usuário" />
    <div class="data-container">
      <UserForm />
    </div>
  </main>
  <FooterVue />
</template>

<style src="./UserData.scss" lang="scss" scoped />
