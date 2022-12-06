<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import Notification from "../../../services/notifications";
import Collapse from "./Collapse/Collapse.vue";
import router from "../../../routes";
import Loader from "../../../components/Loader/Loader.vue";

import { onMounted, createVNode } from "vue";
import { api, auth } from "../../../services/api";
import { useState } from "../../../services/useState";
import {
  ArrowRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { ReservationStore } from "../../../store/ReservationStore.js";
import { Modal } from "ant-design-vue";

const [reservationList, setReservationList] = useState();
const [loading, setLoading] = useState(true);

const store = ReservationStore();

const getReservationList = async () => {
  try {
    const response = await api.get(`/reservation/user?id=${auth.getId()}`);
    const { data } = response;
    setReservationList(data.reservations);
    setLoading(false);
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    Notification("info", data.message);
  }
};

const startReservation = async () => {
  try {
    if (store.vehicle_id) {
      const { data } = await api.post("/reservation/form", {
        user_id: auth.getId(),
        vehicle_id: store.vehicle_id,
      });

      Notification("info", data.message);
      router.push("/reservation/form");
    } else {
      Notification("info", "Você precisa escolher o carro primeiro");
      router.push("/vehicles");
    }
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};

const onConfirmStart = () => {
  Modal.confirm({
    title: "Quer iniciar uma reserva com o carro escolhido?",
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    onOk() {
      return startReservation();
    },
    onCancel() {
      getReservationList();
      store.setVehicle(null);
    },
  });
};

onMounted(async () => {
  try {
    await api.get(`/reservation/last?id=${auth.getId()}`);
    router.push("/reservation/form");
  } catch (error) {
    if (store.vehicle_id) {
      onConfirmStart();
    } else {
      getReservationList();
    }
  }
});
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <Loader v-if="loading" />

    <div v-else-if="reservationList" class="width-100">
      <div class="container">
        <div v-for="reservation in reservationList" v-bind:key="reservation">
          <Collapse
            :id="reservation.vehicle_id"
            :id-reservation="reservation.id"
            :pickup="reservation.pickup"
            :devolution="reservation.devolution"
            :status="reservation.status"
            :step="reservation.step"
            :total-value="reservation.total_value"
          />
        </div>
      </div>

      <a-button type="primary" class="primary-button" @click="startReservation">
        INICIAR NOVA RESERVA <ArrowRightOutlined />
      </a-button>
    </div>

    <div v-else class="width-100">
      <div id="message">
        <h1><span>O</span>lá!</h1>
        <p>
          Vamos começar uma reserva? Primeiro, você precisa escolher as datas e
          o carro que você deseja alugar.
        </p>
        <p>
          Para isso, veja nossa lista de
          <RouterLink to="/vehicles"
            ><span>veículos disponíveis</span></RouterLink
          >.
        </p>
      </div>

      <a-button type="primary" class="primary-button">
        <router-link to="/vehicles">
          COMEÇAR <ArrowRightOutlined />
        </router-link>
      </a-button>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Reservation.scss" lang="scss" scoped />
