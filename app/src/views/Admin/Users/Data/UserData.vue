<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import Notification from "../../../../services/notifications";
import Loader from "../../../../components/Loader/Loader.vue";
import UserForm from "../Form/UserForm.vue";
import router from "../../../../routes";
import moment from "moment";

import { onMounted, ref } from "vue";
import { useState } from "../../../../services/useState";
import { api } from "../../../../services/api";

const [id, setId] = useState(null);
const [data, setData] = useState(null);
const [showcaseName, setShowcaseName] = useState();

const insert = ref(false);

onMounted(() => {
  if (router.currentRoute.value.query && router.currentRoute.value.query.id) {
    setId(router.currentRoute.value.query.id);
    getData();
  }
});

const getData = async () => {
  try {
    const response = await api.get(`user?id=${id.value}`);

    const { data } = response;
    setData(data.user);

    const name = data.user.name.split(" ");
    setShowcaseName(name[0] + " " + name[name.length - 1]);
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader v-if="!data && !insert" title="Inserir usuário" />
    <PageHeader v-else title="Dados" />
    <div v-if="data" className="editor-switch">
      <span>EDIÇÃO: </span>
      <a-switch v-model:checked="insert" />
    </div>
    <div class="data-container">
      <UserForm
        v-if="!id || insert"
        :key="insert"
        :data="data"
        :insert="insert"
      />
      <div v-else-if="data" class="card">
        <div className="info">
          <span>
            ID:
            <p>{{ data.id }}</p>
          </span>
          <span>
            Nome:
            <p>{{ showcaseName }}</p>
          </span>
          <span>
            Email:
            <p>{{ data.email }}</p>
          </span>
          <span>
            Role:
            <p>{{ data.role }}</p>
          </span>
          <span>
            CPF:
            <p>{{ data.cpf }}</p>
          </span>
        </div>

        <div className="info">
          <span>
            Nascimento:
            <p>{{ moment(data.bornAt).format("DD/MM/YYYY") }}</p>
          </span>
          <span v-if="data.phone">
            Telefone:
            <p>{{ data.phone }}</p>
          </span>
          <span v-if="data.street">
            Rua:
            <p>{{ data.street }}</p>
          </span>
          <span v-if="data.number">
            Número:
            <p>{{ data.number }}</p>
          </span>
        </div>

        <div className="info">
          <span v-if="data.neighborhood">
            Bairro:
            <p>{{ data.neighborhood }}</p>
          </span>
          <span v-if="data.city">
            Cidade:
            <p>{{ data.city }}</p>
          </span>
          <span v-if="data.state">
            Estado:
            <p>{{ data.state }}</p>
          </span>
          <span v-if="data.country">
            País:
            <p>{{ data.country }}</p>
          </span>
        </div>
      </div>
      <Loader v-else />
    </div>
  </main>
  <FooterVue />
</template>
