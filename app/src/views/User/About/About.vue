<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
</script>

<template>

  <HeaderVue />
  <main class="main-container">
    <div className="about-container">
      <img src="../../../assets/about-us.svg" alt="man standing" width="400" height="400" />
      <div id="message">
        <h1>Olá!</h1>
        <p>
          Este é um projeto para a disciplina de Desenvolvimento de Software
          para Web. Visite{{" "}}
          <a
            href="https://github.com/oliveiraD4vi/vehicle-rental-system-web"
            target="_blank"
            rel="noreferrer"
          >
            nosso repositório
          </a>
          .
        </p>
      </div>
    </div>
  </main>
  <FooterVue />

</template>

<style src="./About.scss" lang="scss" scoped></style>
