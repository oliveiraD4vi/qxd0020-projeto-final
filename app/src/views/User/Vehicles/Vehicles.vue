<script setup>
import HeaderVue from "../../../components/Header/Header.vue";
import FooterVue from "../../../components/Footer/Footer.vue";
import Notification from "../../../services/notifications";
import Loader from "../../../components/Loader/Loader.vue";

import { onMounted, ref } from "vue";
import { useState } from "../../../services/useState";
import { api } from "../../../services/api";
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { Empty } from "ant-design-vue";

import image1 from "../../../assets/car-example-green.png";
import image2 from "../../../assets/car-example-grey.png";
import image3 from "../../../assets/car-example-white.png";

const images = [image1, image2, image3];

const [data, setData] = useState();
const [pagination, setPagination] = useState();
const [totalCount, setTotalCount] = useState(0);

const pageSizeOptions = ref(["5", "10", "15", "20", "30"]);

onMounted(async () => {
  setPagination({ page: 1, size: 5, sort: "ASC", search: "" });
  getData(1, 5, "ASC", "");
});

const getData = async (page, size, sort, search) => {
  try {
    const response = await api.get(
      `/vehicle/list?page=${page}&size=${size}&sort=${sort}&search=${search}`
    );

    const { data } = response;
    setData(data.vehicles);
    setTotalCount(data.totalCount);
  } catch (error) {
    const { data } = error.response;

    setData(data.vehicles);
    setTotalCount(0);

    Notification("error", data.message);
  }
};

const onChangeSearch = (search) => {
  setPagination({ ...pagination.value, search: search });
  getData(
    pagination.value.page,
    pagination.value.size,
    pagination.value.sort,
    search
  );
};

const onChangeSelect = (sort) => {
  setPagination({ ...pagination.value, sort });
  getData(
    pagination.value.page,
    pagination.value.size,
    sort,
    pagination.value.search
  );
};

const onChangePagination = (page, size) => {
  setPagination({ ...pagination.value, page, size });
  getData(page, size, pagination.value.sort, pagination.value.search);
};
</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div
      v-if="data && pagination"
      class="cars-container"
    >
      <div class="search-container">
        <a-input-search
          class="search-input"
          placeholder="Pesquisar por marca ou modelo"
          @search="onChangeSearch"
        />
      </div>

      <div class="pagination-container">
        <a-pagination
          v-model:current="pagination.page"
          v-model:defaultPageSize="pagination.size"
          v-model:total="totalCount"
          :page-size-options="pageSizeOptions"
          :disabled="totalCount == 0"
          show-size-changer
          @change="onChangePagination"
        />

        <div class="sorter">
          <span>Ordem:</span>

          <a-select
            default-value="ASC"
            :disabled="totalCount == 0"
            @change="onChangeSelect"
          >
            <a-select-option value="ASC">Crescente</a-select-option>
            <a-select-option value="DESC">Decrescente</a-select-option>
          </a-select>
        </div>
      </div>

      <a-empty v-if="totalCount == 0" :image="Empty.PRESENTED_IMAGE_SIMPLE" />

      <div class="viewer-container">
        <div class="container-listing">
          <div
            v-for="item in data"
            v-bind:key="item.plate"
            class="car-container"
          >
            <h1>{{ item.brand }} {{ item.model }}</h1>

            <div class="image-container">
              <img
                v-bind:src="images[Math.floor(Math.random() * 3)]"
                alt="car"
              />
            </div>

            <a-button type="primary" class="offer-button">
              <span id="value">R$ {{ item.value }},00</span>
              <span id="text"> OFERTA <ArrowRightOutlined /> </span>
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </main>
  <FooterVue />
</template>

<style src="./Vehicles.scss" lang="scss" scoped />
