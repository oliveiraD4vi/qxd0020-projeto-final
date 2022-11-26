<script setup>
import Notification from "../../../../services/notifications";
import router from "../../../../routes";
import moment from "moment";

import { onMounted, reactive } from "vue";
import { api } from "../../../../services/api";
import { useState } from "../../../../services/useState";

const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  insert: {
    type: Boolean,
    default: false,
  },
});

const formState = reactive({
  user_id: "",
  vehicle_id: "",
  pickup: "",
  devolution: "",
});

const updateFormState = reactive({
  step: "CREATED",
  status: "PERSONAL",
});

onMounted(() => {
  if (props.data) {
    updateFormState.step = props.data.step;
    updateFormState.status = props.data.status;
  }
});

const disabledPickupDate = (current) => {
  return current && current <= moment();
};

const disabledDevolutionDate = (current) => {
  if (formState.pickup === "") return true;

  return current && (current <= moment() || current <= formState.pickup);
};

const formCleanUp = () => {
  formState.user_id = "";
  formState.vehicle_id = "";
  formState.pickup = "";
  formState.devolution = "";

  updateFormState.step = "";
  updateFormState.status = "";
};

const onFinish = async () => {
  setLoading(true);
  setDisabled(true);

  try {
    if (props.data) {
      await api.put("/reservation", { ...updateFormState, id: props.data.id });
    } else {
      await api.post("/reservation", formState);
    }

    Notification("success", "Operação realizada com sucesso!");
    router.push("/admin/reservation");
  } catch (error) {
    const { data } = error.response;

    setLoading(false);
    setDisabled(false);
    formCleanUp();

    Notification("error", data.message);
  }
};
</script>

<template>
  <div class="data-form-container">
    <a-form
      v-if="insert"
      :model="updateFormState"
      name="data-form"
      class="data-form"
      @finish="onFinish"
    >
      <div class="form-group-2">
        <a-form-item
          label="Status"
          name="status"
          :rules="[
            {
              required: true,
              message: 'Escolha o STATUS da reserva',
            },
          ]"
        >
          <a-select
            v-model:value="updateFormState.status"
            :disabled="disabled"
            placeholder="Status"
          >
            <a-select-option value="CREATED">Reserva criada</a-select-option>
            <a-select-option value="CONFIRMED">
              Reserva confirmada
            </a-select-option>
            <a-select-option value="PICKUP">Veículo retirado</a-select-option>
            <a-select-option value="FINALIZED">
              Reserva finalizada
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="Passo"
          name="step"
          :rules="[
            {
              required: true,
              message: 'Escolha o PASSO da reserva',
            },
          ]"
        >
          <a-select
            v-model:value="updateFormState.step"
            :disabled="disabled"
            placeholder="Passo"
          >
            <a-select-option value="PERSONAL">Dados pessoais</a-select-option>
            <a-select-option value="VEHICLE">
              Confirmação do veículo
            </a-select-option>
            <a-select-option value="PAYMENT">Pagamento</a-select-option>
            <a-select-option value="CONCLUDED">Concluída</a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <a-button
          :loading="loading"
          type="primary"
          html-type="submit"
          class="primary-button"
        >
          SALVAR
        </a-button>
      </a-form-item>
    </a-form>

    <a-form
      v-else
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
        <a-input
          v-model:value="formState.user_id"
          :disabled="disabled"
          placegolder="Usuário"
        />
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
        <a-input
          v-model:value="formState.vehicle_id"
          :disabled="disabled"
          placegolder="Veículo"
        />
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
            :disabled="disabled"
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
            :disabled="disabled"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <a-button
          :loading="loading"
          type="primary"
          html-type="submit"
          class="primary-button"
        >
          CADASTRAR
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
