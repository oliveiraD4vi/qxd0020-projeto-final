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
          para Web. Visite
          <a
            href="https://github.com/oliveiraD4vi/qxd0020-projeto-final"
            target="_blank"
            rel="noreferrer"
          >nosso repositório</a>.
        </p>
        <span>
          A GranCARS é uma locadora de carros fictícia situada na cidade de
          Quixadá - CE. Suas operações são concentradas exclusivamente
          nessa região.
        </span>
      </div>
    </div>
  </main>
  <FooterVue />

</template>

<style src="./About.scss" lang="scss" scoped></style>
