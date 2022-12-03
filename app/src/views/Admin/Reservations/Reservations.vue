<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import PageHeader from "../../../components/PageHeader/PageHeader.vue";
import TableVue from "../../../components/Table/Table.vue";
import Notification from "../../../services/notifications";

import { onMounted, ref } from "vue";
import { useState } from "../../../services/useState";
import { api } from "../../../services/api";
import Loader from "../../../components/Loader/Loader.vue";

onMounted(() => {
  setPagination({ page: 1, size: 5, sort: "ASC", search: "" });
  getData(1, 5, "ASC", "");
});

const [pagination, setPagination] = useState({});
const [totalCount, setTotalCount] = useState();
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [empty, setEmpty] = useState(false);

const getData = async (page, size, sort, search) => {
  setLoading(true);

  try {
    const response = await api.get(
      `/reservation/list?page=${page}&size=${size}&sort=${sort}&search=${search}`
    );

    const { data } = response;
    setData(data.reservations);
    setTotalCount(data.totalCount);
    setLoading(false);
  } catch (error) {
    const { data } = error.response;

    setData(data.reservations);
    setTotalCount(0);
    setLoading(false);
    setEmpty(true);

    Notification("error", data.message);
  }
};

const columns = ref([
  {
    title: "Usuário",
    key: "userid",
    dataIndex: "user_id",
  },
  {
    title: "Veículo",
    key: "vehicleid",
    dataIndex: "vehicle_id",
  },
  {
    title: "Retirada",
    dataIndex: "pickup",
    key: "pickup",
  },
  {
    title: "Devolução",
    dataIndex: "devolution",
    key: "devolution",
  },
  {
    title: "Passo",
    key: "step",
    dataIndex: "step",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },
]);
</script>

<template>
  <HeaderVue />
  <main class="main-container top-centered">
    <PageHeader title="Reservas" go-back-home />
    <TableVue
      v-if="(data && totalCount) || empty"
      :key="totalCount"
      :data="data"
      :get-data="getData"
      :pagination="pagination"
      :set-pagination="setPagination"
      :columns="columns"
      :total-count="totalCount"
      :loading="loading"
      table-template="reservation"
      go-path="adminReservationData"
    />
    <Loader v-else />
  </main>
  <FooterVue />
</template>
