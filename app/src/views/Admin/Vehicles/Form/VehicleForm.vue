<script setup>
import Notification from "../../../../services/notifications";
import router from "../../../../routes";

import { reactive, onMounted } from "vue";
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
  brand: "",
  model: "",
  color: "",
  plate: "",
  value: "",
});

onMounted(() => {
  if (props.data) {
    formState.brand = props.data.brand;
    formState.model = props.data.model;
    formState.color = props.data.color;
    formState.plate = props.data.plate;
    formState.value = props.data.value;
  }
});

const formCleanUp = () => {
  formState.brand = "";
  formState.model = "";
  formState.color = "";
  formState.plate = "";
  formState.value = "";
};

const onFinish = async (values) => {
  setLoading(true);
  setDisabled(true);

  try {
    if (props.data) {
      await api.put("/vehicle", { ...values, id: props.data.id });
    } else {
      await api.post("/vehicle/register", values);
    }

    Notification("success", "Operação realizada com sucesso!");
    router.push("/admin/vehicle");
  } catch (error) {
    const { data } = error.response;

    setLoading(false);
    setDisabled(false);
    if (!props.data) formCleanUp();

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
      <h4>Veículo:</h4>
      <div class="form-group-2">
        <a-form-item
          label="Marca"
          name="brand"
          :rules="[
            { required: true, message: 'Insira a marca' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.brand"
            :disabled="disabled"
            placegolder="Marca"
          />
        </a-form-item>

        <a-form-item
          label="Modelo"
          name="model"
          :rules="[
            { required: true, message: 'Insira o modelo' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.model"
            :disabled="disabled"
            placegolder="Modelo"
          />
        </a-form-item>
      </div>

      <div class="form-group-3">
        <a-form-item
          label="Cor"
          name="color"
          :rules="[
            { required: true, message: 'Insira a cor' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.color"
            :disabled="disabled"
            placegolder="Cor"
          />
        </a-form-item>

        <a-form-item
          label="Placa"
          name="plate"
          :rules="[
            { required: true, message: 'Insira a placa' },
            {
              pattern: /^[\d A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras e números',
            },
          ]"
        >
          <a-input
            v-model:value="formState.plate"
            :disabled="disabled"
            placegolder="Placa"
          />
        </a-form-item>

        <a-form-item
          label="Diária (R$)"
          name="value"
          :rules="[
            { required: true, message: 'Insira a diária' },
            {
              pattern: /^[\d]+$/,
              message: 'Este campo deve conter apenas números',
            },
          ]"
        >
          <a-input
            v-model:value="formState.value"
            :disabled="disabled"
            placegolder="R$"
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
          <span v-if="insert">SALVAR</span>
          <span v-else>CADASTRAR</span>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
