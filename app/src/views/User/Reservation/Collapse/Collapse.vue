<script setup>
import { ref, onMounted, reactive } from "vue";
import { api } from "../../../../services/api";
import { useState } from "../../../../services/useState";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

import moment from "moment";
import Notification from "../../../../services/notifications";

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
      <template v-if="status === 'FINALIZED'" #extra>
        <CheckCircleOutlined class="check-icon" />
      </template>
      <template v-else #extra>
        <ExclamationCircleOutlined class="exclamation-icon" />
      </template>

      <div class="group-3">
        <div class="info">
          <span>
            Diária:
            <p>R$ {{ vehicle.value }}</p>
          </span>
        </div>
        <div class="info">
          <span>
            Retirada:
            <p>{{ moment(props.pickup).format("DD/MM/yyyy") }}</p>
          </span>
          <span>
            Devolução:
            <p>{{ moment(props.devolution).format("DD/MM/yyyy") }}</p>
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
        <div class="info">
          <span>
            Cor:
            <p>{{ vehicle.color }}</p>
          </span>
          <span>
            Placa:
            <p>{{ vehicle.plate }}</p>
          </span>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style src="./Collapse.scss" lang="scss" scoped></style>
