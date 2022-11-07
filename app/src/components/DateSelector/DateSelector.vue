<script setup>

  const DateSelector = ({ data }) => {
    const form = Form.useForm();

    const onSubmit = async (data) => {
      const { pickup, devolution } = await data;
    };
  }
</script>

<template>

  <div class="centered-container">
      <div class="selector-container">
        <h2>
          datas de <span>R</span>etirada e <span>D</span>evolução
        </h2>
        <a-form form="form" class="reservation-date-form" @onFinish="onSubmit">
          <div class="form-date">
            <a-form-item
              name="pickup"
            >
              <a-date-picker placeholder="Data de retirada" format="DD/MM/YYYY"/>
            </a-form-item>

            <a-form-item
              name="devolution"
            >
              <a-date-picker placeholder="Data de devolução" format="DD/MM/YYYY" />
            </a-form-item>
          </div>

          <a-form-item class="btn">
            <a-button
              type="primary"
              htmlType="submit"
              class="secondary-button"
            >
              CONTINUAR
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
</template>

<style src="./DateSelector.scss" lang="scss" scoped></style>