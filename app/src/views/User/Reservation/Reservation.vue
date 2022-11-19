<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import { onMounted, ref } from "vue";
import { api, auth } from "../../../services/api";
import { useState } from "../../../services/useState";
import Notification from "../../../services/notifications";

const [reservationList, setReservation] = useState();
const activeKey = ref(["1"]);
const expandIconPosition = ref("left");

onMounted(async () => {
  try {
    const response = await api.get(`/reservation/user?id=${auth.getId()}`);
    const { data } = response;
    console.log(data);
    setReservation(data.reservations);
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

    <div v-if="reservationList != null">
      <div v-for="reservation in reservationList" v-bind:key="reservation">
        <a-collapse
          v-model:activeKey="activeKey"
          :expand-icon-position="expandIconPosition"
        >
          <a-collapse-panel header="vehicle.brand"> </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Reservation.scss" lang="scss" scoped />
