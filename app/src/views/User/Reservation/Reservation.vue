<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import Notification from "../../../services/notifications";
import Collapse from "./Collapse/Collapse.vue";

import { onMounted } from "vue";
import { api, auth } from "../../../services/api";
import { useState } from "../../../services/useState";
import { ArrowRightOutlined } from "@ant-design/icons-vue";

const [reservationList, setReservation] = useState();

onMounted(async () => {
  try {
    const response = await api.get(`/reservation/user?id=${auth.getId()}`);
    const { data } = response;
    setReservation(data.reservations);
  } catch (error) {
    const { data } = error.response;
    Notification("info", data.message);
  }
});
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div v-if="reservationList == null" id="message">
      <h1><span>O</span>lá!</h1>
      <p>
        Vamos começar uma reserva? Primeiro, você precisa escolher o carro que
        você deseja alugar.
      </p>
      <p>
        Para isso, veja nossa lista de
        <RouterLink to="/vehicles"><span>veículos disponíveis</span></RouterLink
        >.
      </p>
    </div>

    <a-button
      v-if="reservationList == null"
      type="primary"
      class="primary-button"
    >
      <router-link to="/vehicles"> COMEÇAR <ArrowRightOutlined /> </router-link>
    </a-button>

    <div v-if="reservationList != null" class="card">
      <div v-for="reservation in reservationList" v-bind:key="reservation">
        <Collapse
          :id="reservation.vehicle_id"
          :id-reservation="reservation.id"
          :pickup="reservation.pickup"
          :devolution="reservation.devolution"
          :status="reservation.status"
          :step="reservation.step"
        />
      </div>
    </div>

    <a-button
      v-if="reservationList != null"
      type="primary"
      class="primary-button"
    >
      INICIAR NOVA RESERVA <ArrowRightOutlined />
    </a-button>
  </main>
  <FooterVue />
</template>

<style src="./Reservation.scss" lang="scss" scoped />
