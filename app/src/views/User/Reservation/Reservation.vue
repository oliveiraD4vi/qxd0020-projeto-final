<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import Car from "./Car/Car.vue";
import { onMounted } from "vue";
import { api, auth } from "../../../services/api";
import { useState } from "../../../services/useState";
import Notification from "../../../services/notifications";

const [reservationList, setReservation] = useState();

onMounted(async () => {
  try {
    const response = await api.get(`/reservation/user?id=${auth.getId()}`);
    const { data } = response;
    setReservation(data.reservations);
    console.log(reservationList);
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
});
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div v-if="reservationList == null" id="message">
      <h1>Ola Usuario</h1>
      <p>
        Vamos começar uma reserva? Primeiro, você precisa escolher o carro que
        você deseja alugar.
      </p>
      <p>Para isso, veja nossa lista de veículos disponíveis.</p>
    </div>

    <div v-if="reservationList != null" class="card">
      <div v-for="reservation in reservationList" v-bind:key="reservation">
        <Car
          :id="reservation.vehicle_id"
          :id-reservation="reservation.id"
          :pickup="reservation.pickup"
          :devolution="reservation.devolution"
          :status="reservation.status"
          :step="reservation.step"
        ></Car>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Reservation.scss" lang="scss" scoped />
