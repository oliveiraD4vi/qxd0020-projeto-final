<script setup>
import HeaderVue from "../../components/Header/Header.vue";
import FooterVue from "../../components/Footer/Footer.vue";
import Notification from "../../services/notifications";

import { reactive } from "vue";
import { api, auth } from "../../services/api";
import { router } from "../../routes";
import { useState } from "../../services/useState";

const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);

const formState = reactive({
  email: "",
  password: "",
});

const onFinish = async (values) => {
  const { email, password } = values;

  setLoading(true);
  setDisabled(true);

  try {
    const response = await api.post("/user/login", {
      email,
      password,
    });

    const { data } = response;
    auth.login(data.authData);

    router.push(auth.getRole() === "CLIENT" ? "/" : "/admin/home");
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="login-container">
      <a-form
        :model="formState"
        name="login-form"
        class="login-form"
        @finish="onFinish"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Insira seu email!' },
            { type: 'email', message: 'Esse email não é válido!' },
          ]"
        >
          <a-input
            v-model:value="formState.email"
            :disabled="disabled"
            placeholder="Email"
          />
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
            :disabled="disabled"
            placeholder="Senha"
          />
        </a-form-item>

        <a-form-Item class="btn">
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="primary-button"
          >
            ENTRAR
          </a-button>
        </a-form-Item>
      </a-form>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Login.scss" lang="scss" scoped />
