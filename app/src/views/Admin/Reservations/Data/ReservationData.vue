<script setup>
import HeaderVue from "../../../../components/Header/Header.vue";
import FooterVue from "../../../../components/Footer/Footer.vue";
import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
import Notification from "../../../../services/notifications";
import Loader from "../../../../components/Loader/Loader.vue";
import ReservationForm from "../Form/ReservationForm.vue";
import router from "../../../../routes";
import moment from "moment";

import { onMounted, ref } from "vue";
import { useState } from "../../../../services/useState";
import { api } from "../../../../services/api";

const [id, setId] = useState(null);
const [data, setData] = useState(null);
const [userData, setUserData] = useState();
const [vehicleData, setVehicleData] = useState();
const [showcaseName, setShowcaseName] = useState();

const insert = ref(false);
const activeKey = ref([]);
const expandIconPosition = ref("right");

onMounted(() => {
  if (router.currentRoute.value.query && router.currentRoute.value.query.id) {
    setId(router.currentRoute.value.query.id);
    getData();
  }
});

const getData = async () => {
  try {
    const response = await api.get(`reservation?id=${id.value}`);

    const { data } = response;
    setData(data.reservation);
    getUser(data.reservation.user_id);
    getVehicle(data.reservation.vehicle_id);
  } catch (error) {
    const { data } = error.response;
    Notification("error", data.message);
  }
};

const getUser = async (id) => {
  try {
    const { data } = await api.get(`/user?id=${id}`);
    setUserData(data.user);
    const name = data.user.name.split(" ");
    setShowcaseName(name[0] + " " + name[name.length - 1]);
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};

const getVehicle = async (id) => {
  try {
    const { data } = await api.get(`/vehicle?id=${id}`);
    setVehicleData(data.vehicle);
  } catch ({ response }) {
    Notification("error", response.data.message);
  }
};
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader v-if="!data && !insert" title="Inserir reserva" />
    <PageHeader v-else title="Dados" />
    <div v-if="data" className="editor-switch">
      <span>EDIÇÃO: </span>
      <a-switch v-model:checked="insert" />
    </div>
    <div class="data-container">
      <ReservationForm v-if="!id || insert" :data="data" :insert="insert" />
      <div v-else-if="data" class="content">
        <div class="card">
          <div className="info">
            <span>
              ID:
              <p>{{ data.id }}</p>
            </span>
            <span v-if="data.total_value">
              Valor (R$):
              <p>{{ data.total_value }}</p>
            </span>
          </div>

          <div className="info">
            <span>
              Retirada:
              <p>{{ moment(data.pickup).format("DD/MM/YYYY") }}</p>
            </span>
            <span>
              Devolução:
              <p>{{ moment(data.devolution).format("DD/MM/YYYY") }}</p>
            </span>
          </div>

          <div className="info">
            <span>
              Status:
              <p>{{ data.status }}</p>
            </span>
            <span>
              Passo:
              <p>{{ data.step }}</p>
            </span>
          </div>
        </div>

        <a-collapse
          v-model:activeKey="activeKey"
          :expand-icon-position="expandIconPosition"
          class="reservation-collapse"
        >
          <a-collapse-panel v-if="userData && showcaseName" header="Usuário">
            <div class="card">
              <div className="info">
                <span>
                  ID:
                  <p>{{ userData.id }}</p>
                </span>
                <span>
                  Nome:
                  <p>{{ showcaseName }}</p>
                </span>
                <span>
                  Email:
                  <p>{{ userData.email }}</p>
                </span>
                <span>
                  Role:
                  <p>{{ userData.role }}</p>
                </span>
              </div>

              <div className="info">
                <span>
                  CPF:
                  <p>{{ userData.cpf }}</p>
                </span>
                <span>
                  Nascimento:
                  <p>{{ moment(userData.bornAt).format("DD/MM/YYYY") }}</p>
                </span>
                <span v-if="userData.phone">
                  Telefone:
                  <p>{{ userData.phone }}</p>
                </span>
              </div>

              <div className="info">
                <span v-if="userData.street">
                  Rua:
                  <p>{{ userData.street }}</p>
                </span>
                <span v-if="userData.number">
                  Número:
                  <p>{{ userData.number }}</p>
                </span>
                <span v-if="userData.neighborhood">
                  Bairro:
                  <p>{{ userData.neighborhood }}</p>
                </span>
              </div>

              <div className="info">
                <span v-if="userData.city">
                  Cidade:
                  <p>{{ userData.city }}</p>
                </span>
                <span v-if="userData.state">
                  Estado:
                  <p>{{ userData.state }}</p>
                </span>
                <span v-if="userData.country">
                  País:
                  <p>{{ userData.country }}</p>
                </span>
              </div>
            </div>
          </a-collapse-panel>

          <a-collapse-panel v-if="vehicleData" header="Veículo">
            <div class="card">
              <div className="info">
                <span>
                  ID:
                  <p>{{ vehicleData.id }}</p>
                </span>
                <span>
                  Marca:
                  <p>{{ vehicleData.brand }}</p>
                </span>
              </div>

              <div className="info">
                <span>
                  Cor:
                  <p>{{ vehicleData.color }}</p>
                </span>
                <span>
                  Modelo:
                  <p>{{ vehicleData.model }}</p>
                </span>
              </div>

              <div className="info">
                <span>
                  Diária:
                  <p>{{ vehicleData.value }}</p>
                </span>
                <span>
                  Placa:
                  <p>{{ vehicleData.plate }}</p>
                </span>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <Loader v-else />
    </div>
  </main>
  <FooterVue />
</template>

<style src="./ReservationData.scss" lang="scss" scoped />
