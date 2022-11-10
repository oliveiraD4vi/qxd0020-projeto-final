<script setup>
  import { reactive } from 'vue';
  import { api } from '../../services/api';
  import { router } from '../../routes';

  import Notification from '../../services/notifications';

  const formState = reactive({
    name: '',
    email: '',
    password: '',
    cpf: '',
    bornAt: '',
  });

  const onFinish = async (values) => {
    const { name, cpf, bornAt, email, password } = values;

    try {
      const { data } = await api.post('/user/register', {
        name,
        email,
        password,
        bornAt,
        cpf,
      });

      Notification("success", data.message);
      router.push('/login');
    } catch (error) {
      const { data } = error.response;
      Notification("error", data.message);
    }
  };

  const onFinishFailed = (errorInfo) => Notification("error", errorInfo);
</script>

<template>

    <div class="register-container">
      <a-form
        :model="formState"
        name="register-form"
        class="register-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Nome"
          name="name"
          :rules="[{ required: true, message: 'Insira seu nome' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="Nome" />
        </a-form-item>

        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Insira seu email' }]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Insira sua senha' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Senha" />
        </a-form-item>

        <a-form-item
          label="CPF"
          name="cpf"
          :rules="[{ required: true, message: 'Insira seu CPF' }]"
        >
          <a-input
            v-model:value="formState.cpf"
            placeholder="CPF" />
        </a-form-item>

        <a-form-item
          label="Data de Nascimento"
          name="bornAt"
          :rules="[{ required: true, message: 'Insira sua data de nascimento' }]"
        >
          <a-date-picker
            v-model:value="formState.bornAt"
            placeholder="Data de nascimento"
            format="DD/MM/YYYY" />
        </a-form-item>

        <a-form-Item class="btn">
          <a-button
            type="primary"
            html-type="submit"
            class="primary-button"
          >
            CADASTRAR
          </a-button>
        </a-form-Item>
      </a-form>
    </div>

</template>

<style src="./Register.scss" lang="scss" scoped />
