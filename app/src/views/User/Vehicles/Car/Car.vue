<script setup>
  import { ArrowRightOutlined } from "@ant-design/icons-vue";
  import { onMounted } from 'vue';
  import { api } from '../../../../services/api';
  import { useState } from '../../../../services/useState';
  import image1 from "../../../../assets/car-example-green.png";
  import image2 from "../../../../assets/car-example-grey.png";
  import image3 from "../../../../assets/car-example-white.png";
  
    const [vehicleList, setVehicleList] = useState();

    const images = [image1, image2, image3];

    onMounted(async () =>{
      try {
        const response = await api.get("/vehicle/list/random");
        const { data } = response;
        setVehicleList(data.randomList);
      } catch (error) {
        const { data } = error.response;
        Notification("error", data.message);
      }
    });
</script>

<template>
  <div v-if="vehicleList != null" class="car-container">
      <h1>
        {{vehicleList[Math.floor(Math.random() * 3)].brand}} {{vehicleList[Math.floor(Math.random() * 3)].model}}
      </h1>

      <div class="image-container">
        <img v-bind:src="images[Math.floor(Math.random() * 3)]" alt="car" />
      </div>

      <a-button
        type="primary"
        class="offer-button"
        @click="onClick"
      >
        <span id="value">R$ {{vehicleList[Math.floor(Math.random() * 3)].value}},00</span>
        <span id="text">
          OFERTA <ArrowRightOutlined />
        </span>
      </a-button>
    </div>
</template>

<style src="./Car.scss" lang="scss" scoped />
