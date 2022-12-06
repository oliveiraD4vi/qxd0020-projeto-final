<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { onMounted, reactive } from "vue";
import { useState } from "../../../services/useState";
import { api } from "../../../services/api";

import Notification from "../../../services/notifications";
import PageHeader from "../../PageHeader/PageHeader.vue";

const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);

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
});

const formState = reactive({
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "",
  neighborhood: "",
  number: "",
});

onMounted(() => {
  if (props.data) {
    formState.phone = props.data.phone;
    formState.street = props.data.street;
    formState.city = props.data.city;
    formState.state = props.data.state;
    formState.country = props.data.country;
    formState.number = props.data.number;
    formState.neighborhood = props.data.neighborhood;
  }
});

const onFinish = async () => {
  setLoading(true);
  setDisabled(true);

  try {
    const { data } = await api.put("/user", {
      ...formState,
      id: props.data.id,
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
</script>

<template>
  <div class="personal-data-form">
    <PageHeader title="Dados pessoais" />
    <a-form
      :model="formState"
      name="data-form"
      class="data-form"
      @finish="onFinish"
    >
      <a-form-item
        label="Phone"
        name="phone"
        :rules="[
          { required: true, message: 'Preencha este campo' },
          {
            min: 10,
            message: 'Esse não é um número válido',
          },
          {
            pattern: /^[\d]+$/,
            message: 'Este campo deve conter apenas números',
          },
        ]"
      >
        <a-input
          v-model:value="formState.phone"
          :disabled="disabled"
          placegolder="Telefone"
        />
      </a-form-item>

      <h4>Endereço:</h4>
      <div class="form-group-3">
        <a-form-item
          label="Rua"
          name="street"
          :rules="[{ required: true, message: 'Preencha este campo' }]"
        >
          <a-input
            v-model:value="formState.street"
            :disabled="disabled"
            placegolder="Rua"
          />
        </a-form-item>

        <a-form-item
          label="Número"
          name="number"
          :rules="[
            { required: true, message: 'Preencha este campo' },
            {
              pattern: /^[\d]+$/,
              message: 'Este campo deve ter apenas números',
            },
          ]"
        >
          <a-input
            v-model:value="formState.number"
            :disabled="disabled"
            placegolder="Nº"
          />
        </a-form-item>

        <a-form-item
          label="Bairro"
          name="neighborhood"
          :rules="[{ required: true, message: 'Preencha este campo' }]"
        >
          <a-input
            v-model:value="formState.neighborhood"
            :disabled="disabled"
            placegolder="Bairro"
          />
        </a-form-item>
      </div>

      <div class="form-group-3">
        <a-form-item
          label="Cidade"
          name="city"
          :rules="[
            { required: true, message: 'Preencha este campo' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.city"
            :disabled="disabled"
            placegolder="Cidade"
          />
        </a-form-item>

        <a-form-item
          label="Estado"
          name="state"
          :rules="[
            { required: true, message: 'Preencha este campo' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.state"
            :disabled="disabled"
            placegolder="Estado"
          />
        </a-form-item>

        <a-form-item
          label="País"
          name="country"
          :rules="[
            { required: true, message: 'Preencha este campo' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Este campo deve conter apenas palavras',
            },
          ]"
        >
          <a-input
            v-model:value="formState.country"
            :disabled="disabled"
            placegolder="País"
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
