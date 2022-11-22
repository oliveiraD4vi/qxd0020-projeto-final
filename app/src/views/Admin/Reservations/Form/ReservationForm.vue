<script setup>
import Notification from "../../../../services/notifications";
import router from "../../../../routes";
import moment from "moment";

import { onMounted, reactive } from "vue";
import { api } from "../../../../services/api";

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const formState = reactive({
  user_id: "",
  vehicle_id: "",
  pickup: "",
  devolution: "",
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

const onFinish = async () => {
  try {
    if (props.data) {
      await api.put("/reservation", { ...formState, id: props.data.id });
    } else {
      await api.post("/reservation", formState);
    }

    Notification("success", "Operação realizada com sucesso!");
    router.push("/admin/reservation");
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};
</script>

<template>
  <div class="data-form-container">
    <a-form
      :model="formState"
      name="data-form"
      class="data-form"
      @finish="onFinish"
    >
      <h4>Usuário:</h4>
      <a-form-item
        label="ID Usuário"
        name="user_id"
        :rules="[
          { required: true, message: 'Insira o id do usuário' },
          {
            pattern: /^[\d ]+$/,
            message: 'Este campo deve conter apenas números inteiros',
          },
        ]"
      >
        <a-input v-model:value="formState.user_id" placegolder="Usuário" />
      </a-form-item>

      <h4>Veículo:</h4>
      <a-form-item
        label="ID Veículo"
        name="vehicle_id"
        :rules="[
          { required: true, message: 'Insira o id do veículo' },
          {
            pattern: /^[\d ]+$/,
            message: 'Este campo deve conter apenas números inteiros',
          },
        ]"
      >
        <a-input v-model:value="formState.vehicle_id" placegolder="Veículo" />
      </a-form-item>

      <h4>Datas de retirada e devolução:</h4>
      <div class="form-group-2">
        <a-form-item
          label="Retirada"
          name="pickup"
          :rules="[{ required: true, message: 'Insira a data de retirada!' }]"
        >
          <a-date-picker
            v-model:value="formState.pickup"
            placeholder="Data de retirada"
            :disabled-date="disabledPickupDate"
            format="DD/MM/YYYY"
          />
        </a-form-item>

        <a-form-item
          label="Devolução"
          name="devolution"
          :rules="[{ required: true, message: 'Insira a data de devolução!' }]"
        >
          <a-date-picker
            v-model:value="formState.devolution"
            placeholder="Data de devolução"
            :disabled-date="disabledDevolutionDate"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <a-button type="primary" html-type="submit" class="primary-button">
          CADASTRAR
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
