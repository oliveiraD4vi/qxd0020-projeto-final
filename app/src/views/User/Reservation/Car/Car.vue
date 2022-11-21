<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../../../services/api";
import { useState } from "../../../../services/useState";

const activeKey = ref(["1"]);
const expandIconPosition = ref("left");

const [vehicle, setVehicle] = useState();

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  }
});

onMounted(async () => {
  try {
    const response = await api.get(`/vehicle?id=${typeof props.id}`);
    const { data } = response;
    console.log(data);
    setVehicle(data.reservations);
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
        >
          <a-collapse-panel header="vehicle.brand"> </a-collapse-panel>
        </a-collapse>
</template>