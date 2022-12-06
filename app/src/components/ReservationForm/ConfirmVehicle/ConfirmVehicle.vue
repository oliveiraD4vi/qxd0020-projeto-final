<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { onMounted, reactive } from "vue";
import { useState } from "../../../services/useState";
import { api } from "../../../services/api";
import { ReservationStore } from "../../../store/ReservationStore.js";

import moment from "moment";
import PageHeader from "../../PageHeader/PageHeader.vue";
import image1 from "../../../assets/car-example-green.png";
import image2 from "../../../assets/car-example-grey.png";
import image3 from "../../../assets/car-example-white.png";
import Notification from "../../../services/notifications";

const images = [image1, image2, image3];

const store = ReservationStore();

const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);
const [date, setDate] = useState();

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  onDelete: {
    type: Function,
    default: null,
  },
  next: {
    type: Function,
    default: null,
  },
  previous: {
    type: Function,
    default: null,
  },
  reservationId: {
    type: Number,
    default: null,
  },
});

const formState = reactive({
  pickup: store.pickupData,
  devolution: store.devolutionData,
});

onMounted(async () => {
  if (props.reservationId) {
    try {
      const { data } = await api.get(`/reservation?id=${props.reservationId}`);

      setDate({
        pickup: data.reservation.pickup,
        devolution: data.reservation.devolution,
      });
    } catch ({ response }) {
      Notification("info", response.data.message);
    }
  }
});

const onFinish = async () => {
  setLoading(true);
  setDisabled(true);

  try {
    const { data } = await api.put("/reservation/confirm", {
      ...formState,
      vehicleId: props.data.id,
      reservationId: props.reservationId,
    });

    Notification("success", data.message);
    props.next();
  } catch (error) {
    const { data } = error.response;

    setLoading(false);
    setDisabled(false);

    Notification("error", data.message);
  }
};

const disabledPickupDate = (current) => {
  return current && current <= moment();
};

const disabledDevolutionDate = (current) => {
  if (formState.pickup === "") return true;

  return current && (current <= moment() || current <= formState.pickup);
};
</script>

<template>
  <div class="confirmation-info">
    <PageHeader title="Confirmar Veículo" :go-back-home="previous" />
    <div v-if="data" class="car-container">
      <h2>{{ data.brand }} {{ data.model }}</h2>

      <div class="image-container">
        <img v-bind:src="images[Math.floor(Math.random() * 3)]" alt="car" />
      </div>

      <div class="offer">
        <span id="value">R$ {{ data.value }},00</span>
      </div>
    </div>

    <div class="data-container">
      <div v-if="date && date.pickup && date.devolution" class="date-previous">
        <div class="info">
          <span>Anterior: {{ $filters.formatDate(date.pickup) }}</span>
        </div>
        <div class="info">
          <span>Anterior: {{ $filters.formatDate(date.devolution) }}</span>
        </div>
      </div>
    </div>

    <a-form
      :model="formState"
      name="date-form"
      class="date-form"
      @finish="onFinish"
    >
      <div class="form-group-2">
        <a-form-item
          name="pickup"
          :rules="[{ required: true, message: 'Insira a data de retirada' }]"
        >
          <a-date-picker
            v-model:value="formState.pickup"
            placeholder="Data de retirada"
            :disabled-date="disabledPickupDate"
            :disabled="disabled"
            format="DD/MM/YYYY"
          />
        </a-form-item>

        <a-form-item
          name="devolution"
          :rules="[{ required: true, message: 'Insira a data de devolução' }]"
        >
          <a-date-picker
            v-model:value="formState.devolution"
            placeholder="Data de devolução"
            :disabled-date="disabledDevolutionDate"
            :disabled="disabled"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <div class="form-button-container">
          <a-button type="text" :loading="loading" @click="onDelete">
            Cancelar
          </a-button>
          <a-button
            html-type="submit"
            type="primary"
            :loading="loading"
            class="primary-button"
          >
            PRÓXIMO
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style src="./ConfirmVehicle.scss" lang="scss" scoped></style>
