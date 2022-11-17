<script setup>
  import { ArrowRightOutlined } from "@ant-design/icons-vue";
  import { onMounted } from 'vue';
  import { api, auth } from '../../../../services/api';
  import { useState } from '../../../../services/useState';
  import image1 from "../../../../assets/car-example-green.png";
  import image2 from "../../../../assets/car-example-grey.png";
  import image3 from "../../../../assets/car-example-white.png";
  
  const Car = ({ data, img }) => {
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

    function onClick() {
      if (!auth.isAuthenticated()) {
        setVehicleList(data);
      }else{
        setVehicleList(data);
      }
    }
  }
</script>

<template>
  <div class="car-container" v-if="vehicleList != null">
      <h1>
        {{vehicleList[Math.floor(Math.random() * 3)].brand}} {{vehicleList[Math.floor(Math.random() * 3)].model}}
      </h1>

      <div className="image-container">
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
