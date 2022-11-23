<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import Notification from "../../../../services/notifications";
import Loader from "../../../../components/Loader/Loader.vue";
import VehicleForm from "../Form/VehicleForm.vue";
import router from "../../../../routes";

import { onMounted, ref } from "vue";
import { useState } from "../../../../services/useState";
import { api } from "../../../../services/api";

const [id, setId] = useState(null);
const [data, setData] = useState(null);

const insert = ref(false);

onMounted(() => {
  if (router.currentRoute.value.query && router.currentRoute.value.query.id) {
    setId(router.currentRoute.value.query.id);
    getData();
  }
});

const getData = async () => {
  try {
    const response = await api.get(`vehicle?id=${id.value}`);

    const { data } = response;
    setData(data.vehicle);
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader v-if="!data && !insert" title="Inserir veículo" />
    <PageHeader v-else title="Dados" />
    <div v-if="data" className="editor-switch">
      <span>EDIÇÃO: </span>
      <a-switch v-model:checked="insert" />
    </div>
    <div class="data-container">
      <VehicleForm v-if="!id || insert" :data="data" :insert="insert" />
      <div v-else-if="data" class="card">
        <div className="info">
          <span>
            ID:
            <p>{{ data.id }}</p>
          </span>
          <span>
            Marca:
            <p>{{ data.brand }}</p>
          </span>
        </div>

        <div className="info">
          <span>
            Cor:
            <p>{{ data.color }}</p>
          </span>
          <span>
            Modelo:
            <p>{{ data.model }}</p>
          </span>
        </div>

        <div className="info">
          <span>
            Diária:
            <p>{{ data.value }}</p>
          </span>
          <span>
            Placa:
            <p>{{ data.plate }}</p>
          </span>
        </div>
      </div>
      <Loader v-else />
    </div>
  </main>
  <FooterVue />
</template>
