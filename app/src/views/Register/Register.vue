<script setup>
import HeaderVue from "../../components/Header/Header.vue";
import FooterVue from "../../components/Footer/Footer.vue";
import Notification from "../../services/notifications";
import moment from "moment";

import { reactive } from "vue";
import { api } from "../../services/api";
import { router } from "../../routes";
import { validateCpf } from "../../services/utils";

const formState = reactive({
  name: "",
  email: "",
  password: "",
  cpf: "",
  bornAt: "",
});

const disabledDate = (current) => {
  return current && current >= moment();
};

const onFinish = async (values) => {
  const { name, cpf, bornAt, email, password } = values;

  try {
    const { data } = await api.post("/user/register", {
      name,
      email,
      password,
      bornAt,
      cpf,
    });

    Notification("success", data.message);
    router.push("/login");
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="register-container">
      <a-form
        :model="formState"
        name="register-form"
        class="register-form"
        @finish="onFinish"
      >
        <a-form-item
          label="Nome"
          name="name"
          :rules="[
            { required: true, message: 'Insira seu nome' },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Seu nome deve conter apenas palavras',
            },
          ]"
        >
          <a-input v-model:value="formState.name" placeholder="Nome" />
        </a-form-item>

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
          label="Password"
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

        <a-form-Item class="btn">
          <a-button type="primary" html-type="submit" class="primary-button">
            CADASTRAR
          </a-button>
        </a-form-Item>
      </a-form>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Register.scss" lang="scss" scoped />
