<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import PersonalData from "../../../components/ReservationForm/PersonalData/PersonalData.vue";
import ConfirmVehicle from "../../../components/ReservationForm/ConfirmVehicle/ConfirmVehicle.vue";
import Payment from "../../../components/ReservationForm/Payment/Payment.vue";
import Loader from "../../../components/Loader/Loader.vue";
import Notification from "../../../services/notifications";
import router from "../../../routes";

import { useState } from "../../../services/useState";
import { api, auth } from "../../../services/api";
import { onMounted, createVNode } from "vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

const [userData, setUserData] = useState();
const [vehicleData, setVehicleData] = useState();
const [currentStep, setCurrentStep] = useState();
const [reservationId, setReservationId] = useState();
const [loader, setLoader] = useState(true);

const previous = async () => {
  try {
    const { data } = await api.put(
      `/reservation/previous?id=${reservationId.value}`
    );
    Notification("success", data.message);
    router.go();
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

const next = async () => {
  try {
    const { data } = await api.put(
      `/reservation/next?id=${reservationId.value}`
    );
    Notification("success", data.message);
    router.go();
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

const onDelete = async () => {
  try {
    const { data } = await api.delete(`/reservation?id=${reservationId.value}`);
    Notification("success", data.message);
    router.push("/reservation");
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

const onConfirmDelete = () => {
  Modal.confirm({
    title: "Tem certeza que deseja deletar essa reserva?",
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    onOk() {
      return onDelete();
    },
    onCancel() {},
  });
};

const getPersonalData = async (id) => {
  try {
    const { data } = await api.get(`/user/personal?id=${id}`);
    setUserData(data.user);
    setLoader(false);
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

const getVehicleData = async (id) => {
  try {
    const { data } = await api.get(`/vehicle?id=${id}`);
    setVehicleData(data.vehicle);
    setLoader(false);
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

onMounted(async () => {
  try {
    const { data } = await api.get(`/reservation/last?id=${auth.getId()}`);

    const { reservation } = data;
    setReservationId(reservation.id);
    setCurrentStep(reservation.step);

    switch (reservation.step) {
      case "PAYMENT":
        setLoader(false);
        break;
      case "PERSONAL":
        getPersonalData(reservation.user_id);
        break;
      case "VEHICLE":
        getVehicleData(reservation.vehicle_id);
        break;
      default:
        break;
    }
  } catch ({ response }) {
    router.push("/reservation");
    Notification("warn", response.data.message);
  }
});
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <Loader v-if="loader" />

    <div v-else class="form-content">
      <div class="steps-container">
        <div class="step current">
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>
        <div
          class="step-tail"
          v-bind:class="{
            current: currentStep === 'VEHICLE' || currentStep === 'PAYMENT',
          }"
        ></div>
        <div
          class="step"
          v-bind:class="{
            current: currentStep === 'VEHICLE' || currentStep === 'PAYMENT',
          }"
        >
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>
        <div
          class="step-tail"
          v-bind:class="{ current: currentStep === 'PAYMENT' }"
        ></div>
        <div class="step" v-bind:class="{ current: currentStep === 'PAYMENT' }">
          <div class="step-border">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <div class="data-container">
        <PersonalData
          v-if="currentStep === 'PERSONAL'"
          :key="userData"
          :data="userData"
          :on-delete="onConfirmDelete"
          :next="next"
        />
        <ConfirmVehicle
          v-else-if="currentStep === 'VEHICLE'"
          :key="vehicleData"
          :data="vehicleData"
          :on-delete="onConfirmDelete"
          :reservation-id="reservationId"
          :previous="previous"
          :next="next"
        />
        <Payment
          v-else
          :on-delete="onConfirmDelete"
          :next="next"
          :previous="previous"
        />
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./ReservationForm.scss" lang="scss" scoped />
