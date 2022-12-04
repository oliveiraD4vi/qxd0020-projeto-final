<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { onMounted, reactive } from "vue";

import PageHeader from "../../PageHeader/PageHeader.vue";

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  onFinish: Function,
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
      <h4>Informações pessoais:</h4>
      <a-form-item
        label="Phone"
        name="phone"
        :rules="[
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
        <a-form-item label="Rua" name="street">
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

        <a-form-item label="Bairro" name="neighborhood">
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
    </a-form>
  </div>
</template>
