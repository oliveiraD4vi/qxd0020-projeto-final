<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="form-content">
      <div class="steps-container">
        <div class="step current">
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>

        <div class="step-tail current"></div>

        <div class="step current">
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>

        <div class="step-tail"></div>

        <div class="step">
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <div class="data-container"></div>
      <div class="form-buttons-container">
        <a-button type="text">Cancelar</a-button>
        <a-button type="primary" class="primary-button">PRÓXIMO</a-button>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./ReservationForm.scss" lang="scss" scoped />
