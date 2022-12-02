<script setup>
import HeaderVue from "../../components/Header/Header.vue";
import FooterVue from "../../components/Footer/Footer.vue";
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <a-form a-form="{a-form}" class="a-form-container" onFinish="{onSubmit}">
      <h4>Informações pessoais:</h4>
      <a-form-item
        name="name"
        label="Nome"
        :rules="[
          {
            required: true,
            message: 'Digite seu nome',
          },
          {
            pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
            message: 'Apenas palavras!',
          },
        ]"
      >
        <a-input disabled="{disabled}" placeholder="Nome" />
      </a-form-item>

      <div className="a-form-group-3">
        <a-form-item
          name="email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'Por favor, insira seu email',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="Email" />
        </a-form-item>

        <a-form-item
          name="cpf"
          label="CPF"
          :rules="[
            {
              required: true,
              message: 'Digite seu CPF',
            },
            {
              min: 6,
              message: 'Esse não é um CPF válido',
            },
            {
              pattern: /^[\d]+$/,
              message: 'Apenas números!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="CPF" />
        </a-form-item>

        <a-form-item
          name="bornAt"
          label="Data de Nascimento"
          :rules="[
            {
              required: true,
              message: 'Insira sua data de nascimento',
            },
          ]"
        >
          <a-date-picker
            placeholder="Data de nascimento"
            disabled="{disabled}"
            a-format="{datea-format}"
          />
        </a-form-item>
      </div>

      <div className="a-form-group-2">
        <a-form-item
          name="phone"
          label="Telefone"
          :rules="[
            {
              min: 10,
              message: 'Esse não é um número válido',
            },
            {
              pattern: /^[\d]+$/,
              message: 'Apenas números!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="Telefone" />
        </a-form-item>
      </div>

      <h4>Endereço:</h4>
      <div className="a-form-group-3">
        <a-form-item name="street" label="Rua">
          <a-input disabled="{disabled}" placeholder="Rua" />
        </a-form-item>

        <a-form-item
          name="number"
          label="Nº"
          :rules="[
            {
              pattern: /^[\d]+$/,
              message: 'Apenas números!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="Nº" />
        </a-form-item>

        <a-form-item name="neighborhood" label="Bairro">
          <a-input disabled="{disabled}" placeholder="Bairro" />
        </a-form-item>
      </div>

      <div className="a-form-group-3">
        <a-form-item
          name="city"
          label="Cidade"
          :rules="[
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Apenas palavras!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="Cidade" />
        </a-form-item>

        <a-form-item
          name="state"
          label="Estado"
          :rules="[
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Apenas palavras!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="Estado" />
        </a-form-item>

        <a-form-item
          name="country"
          label="País"
          :rules="[
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: 'Apenas palavras!',
            },
          ]"
        >
          <a-input disabled="{disabled}" placeholder="País" />
        </a-form-item>
      </div>
    </a-form>
  </main>
  <FooterVue />
</template>

<style src="./PersonalData.scss" lang="scss" scoped></style>
