<script setup>
  import { reactive } from 'vue';
  import { api, auth } from '../../services/api';
  import { router } from '../../routes';

  import Notification from '../../services/notifications';

  const formState = reactive({
    email: '',
    password: '',
  });

  const onFinish = async (values) => {
    const { email, password } = values;

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

  const onFinishFailed = (errorInfo) => Notification("error", errorInfo);
</script>

<template>

    <div class="login-container">
      <a-form
        :model="formState"
        name="login-form"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Insira seu email!' }]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Insira sua senha!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Senha" />
        </a-form-item>

        <a-form-Item class="btn">
          <a-button
            type="primary"
            html-type="submit"
            class="primary-button"
          >
            ENTRAR
          </a-button>
        </a-form-Item>
      </a-form>
    </div>

</template>

<style src="./Login.scss" lang="scss" scoped />
