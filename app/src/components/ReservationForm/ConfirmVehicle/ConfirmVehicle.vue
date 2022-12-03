<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { onMounted, reactive } from "vue";

import moment from "moment";
import PageHeader from "../../components/PageHeader/PageHeader.vue";
import image1 from "../../assets/car-example-green.png";
import image2 from "../../assets/car-example-grey.png";
import image3 from "../../assets/car-example-white.png";

const images = [image1, image2, image3];

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  pickup: {
    type: String,
    default: "",
  },
  devolution: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onFinish: Function,
});

const formState = reactive({
  pickup: props.pickup,
  devolution: props.devolution,
});

onMounted(() => {
  if (props.data) {
    formState.pickup = props.data.pickup;
    formState.devolution = props.data.devolution;
  }
});

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
    <PageHeader title="Confirmar Veículo" />
    <div class="car-container">
      <div class="image-container">
        <img v-bind:src="images[Math.floor(Math.random() * 3)]" alt="car" />
      </div>
      <a-button type="primary" class="offer-button">
        <span id="value">R$ 400,00</span>
      </a-button>
    </div>

    <a-form
      :model="formState"
      name="date-form"
      class="date-form"
      @finish="onFinish"
    >
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
    </a-form>
  </div>
</template>

<style src="./ConfirmVehicle.scss" lang="scss" scoped></style>
