<script setup>
import { ref, onMounted, reactive } from "vue";
import { api } from "../../../../services/api";
import { useState } from "../../../../services/useState";
import { InfoCircleOutlined } from "@ant-design/icons-vue";

const activeKey = ref(["1"]);
const expandIconPosition = ref("left");

const [vehicle, setVehicle] = useState();

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  idReservation: {
    type: Number,
    default: 0,
  },
  pickup: {
    type: String,
    default: "",
  },
  devolution: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  step: {
    type: String,
    default: "",
  },
});

const state = reactive({ car: "" });

onMounted(async () => {
  try {
    const response = await api.get(`/vehicle?id=${props.id}`);
    const { data } = response;
    setVehicle(data.vehicle);
    state.car = vehicle.value.brand + " " + vehicle.value.model;
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
});
</script>

<template>
  <a-collapse
    v-model:activeKey="activeKey"
    :expand-icon-position="expandIconPosition"
    class="collapse"
  >
    <a-collapse-panel v-model:header="state.car">
      <template #extra><InfoCircleOutlined /></template>
      <div class="info">
        <span>
          ID:
          <p>{{ props.idReservation }}</p>
        </span>
        <span>
          ID Carro:
          <p>{{ props.id }}</p>
        </span>
      </div>
      <div class="info">
        <span>
          Retirada:
          <p>{{ props.pickup }}</p>
        </span>
        <span>
          Devolution:
          <p>{{ props.devolution }}</p>
        </span>
      </div>
      <div class="info">
        <span>
          Status:
          <p>{{ props.status }}</p>
        </span>
        <span>
          Step:
          <p>{{ props.step }}</p>
        </span>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style src="./Car.scss" lang="scss" scoped></style>
