<script setup>
  import { reactive } from 'vue';

  const formState = reactive({
    pickup: '',
    devolution: '',
  });

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
</script>

<template>

  <div class="selector-container">
    <h2>
      datas de <span>R</span>etirada e <span>D</span>evolução
    </h2>
    <a-form 
      :model="formState"
      name="reservation-date-form"
      class="reservation-date-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <div class="form-date">
        <a-form-item
          name="pickup"
          :rules="[{ required: true, message: 'Insira a data de retirada!' }]"
        >
          <a-date-picker
            v-model:value="formState.pickup"
            placeholder="Data de retirada"
            format="DD/MM/YYYY" />
        </a-form-item>

        <a-form-item
          name="devolution"
          :rules="[{ required: true, message: 'Insira a data de devolução!' }]"
        >
          <a-date-picker
            v-model:value="formState.devolution"
            placeholder="Data de devolução"
            format="DD/MM/YYYY" />
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <a-button
          type="primary"
          html-type="submit"
          class="secondary-button"
        >
          CONTINUAR
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<style src="./DateSelector.scss" lang="scss" scoped></style>
