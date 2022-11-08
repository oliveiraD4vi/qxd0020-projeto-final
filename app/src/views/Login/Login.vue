<script setup>
  import { reactive } from 'vue';

  const formState = reactive({
    email: '',
    password: '',
  });

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
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
