<script setup>
import HeaderVue from "../../components/Header/Header.vue";
import FooterVue from "../../components/Footer/Footer.vue";
import PageHeader from "../../components/PageHeader/PageHeader.vue";
import image1 from "../../assets/car-example-green.png";
import image2 from "../../assets/car-example-grey.png";
import image3 from "../../assets/car-example-white.png";

const images = [image1, image2, image3];
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="data-container">
      <div class="confirmation-info">
        <PageHeader title="Confirmar Veículo" />
        <div class="car-container">
          <div class="image-container">
            <img v-bind:src="images[Math.floor(Math.random() * 3)]" alt="car" />
          </div>
          <a-button type="primary" class="offer-button">
            <span id="value">R$ 400,00</span>
          </a-button>
        </div>

        <a-form form="{form}" class="form-container">
          <div class="form-group-2 editor-switch">
            <a-form-item name="date-picker" label="Retirada">
              <a-date-picker value-format="YYYY-MM-DD" />
            </a-form-item>
            <a-form-item name="date-picker" label="Devolução">
              <a-date-picker value-format="YYYY-MM-DD" />
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./ConfirmVehicle.scss" lang="scss" scoped></style>
