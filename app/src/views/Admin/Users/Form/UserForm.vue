<script setup>
import Notification from "../../../../services/notifications";
import router from "../../../../routes";
import moment from "moment";

import { validateCpf } from "../../../../services/utils";
import { reactive, watch } from "vue";
import { api } from "../../../../services/api";

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
  name: "",
  phone: "",
  cpf: "",
  email: "",
  password: "",
  role: "CLIENT",
  bornAt: "",
  street: "",
  state: "",
  country: "",
  neighborhood: "",
  number: "",
});

watch(
  props,
  (newVal) => {
    if (newVal) {
      formState.name = props.data.name;
      formState.phone = props.data.phone;
      formState.cpf = props.data.cpf;
      formState.email = props.data.email;
      formState.password = props.data.password;
      formState.role = props.data.role;
      formState.bornAt = props.data.bornAt;
      formState.street = props.data.street;
      formState.state = props.data.state;
      formState.country = props.data.country;
      formState.number = props.data.number;
      formState.neighborhood = props.data.neighborhood;
    }
  },
  { deep: true }
);

const disabledDate = (current) => {
  return current && current >= moment();
};

const onFinish = async () => {
  try {
    if (props.data) {
      await api.put("/user", { ...formState, id: props.data.id });
    } else {
      await api.post("/user/register", formState);
    }

    Notification("success", "Operação realizada com sucesso!");
    router.push("/admin/user");
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
      <h4>Informações pessoais:</h4>
      <a-form-item
        label="Nome"
        name="name"
        :rules="[
          { required: true, message: 'Insira o nome' },
          {
            pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            message: 'Este campo deve conter apenas palavras',
          },
        ]"
      >
        <a-input v-model:value="formState.name" placegolder="Name" />
      </a-form-item>

      <div class="form-group-3">
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Insira seu email!' },
            { type: 'email', message: 'Esse email não é válido!' },
          ]"
        >
          <a-input v-model:value="formState.email" placeholder="Email" />
        </a-form-item>

        <a-form-item
          label="CPF"
          name="cpf"
          :rules="[
            { required: true, message: 'Insira seu CPF' },
            {
              pattern: '^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}',
              message: 'Por favor, seu CPF deve seguir o padrão',
            },
            { validator: validateCpf },
          ]"
        >
          <a-input v-model:value="formState.cpf" placeholder="000.000.000-00" />
        </a-form-item>

        <a-form-item
          label="Data de Nascimento"
          name="bornAt"
          :rules="[
            { required: true, message: 'Insira sua data de nascimento' },
          ]"
        >
          <a-date-picker
            v-model:value="formState.bornAt"
            :disabled-date="disabledDate"
            placeholder="Data de nascimento"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </div>

      <div class="form-group-2">
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
          <a-input v-model:value="formState.phone" placegolder="Telefone" />
        </a-form-item>

        <a-form-item
          label="Papel"
          name="role"
          :rules="[
            {
              required: true,
              message: 'Escolha a ROLE do usuário',
            },
          ]"
        >
          <a-select v-model:value="formState.role" placeholder="Role">
            <a-select-option value="CLIENT">Cliente</a-select-option>
            <a-select-option value="ADMIN">Administrador</a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <h4>Endereço:</h4>
      <div class="form-group-3">
        <a-form-item label="Rua" name="street">
          <a-input v-model:value="formState.street" placegolder="Rua" />
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
          <a-input v-model:value="formState.number" placegolder="Nº" />
        </a-form-item>

        <a-form-item label="Bairro" name="neighborhood">
          <a-input
            v-model:value="formState.neighborhood"
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
          <a-input v-model:value="formState.city" placegolder="Cidade" />
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
          <a-input v-model:value="formState.state" placegolder="Estado" />
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
          <a-input v-model:value="formState.country" placegolder="País" />
        </a-form-item>
      </div>

      <a-form-item
        label="Senha"
        name="password"
        :rules="[
          { required: true, message: 'Insira sua senha!' },
          { min: 8, message: 'A senha deve ter, no mínimo, 8 caracteres' },
        ]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="Senha"
        />
      </a-form-item>

      <a-form-item class="btn">
        <a-button type="primary" html-type="submit" class="primary-button">
          <span v-if="insert">SALVAR</span>
          <span v-else>CADASTRAR</span>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
