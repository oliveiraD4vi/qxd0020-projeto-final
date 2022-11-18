<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
  import Notification from "../../../services/notifications";
  import { onMounted } from 'vue';
  import { useState } from '../../../services/useState';
  import { api } from "../../../services/api";
  import image1 from "../../../assets/car-example-green.png";
  import image2 from "../../../assets/car-example-grey.png";
  import image3 from "../../../assets/car-example-white.png";
  import { ArrowRightOutlined } from "@ant-design/icons-vue"

  const images = [image1, image2, image3];
  const [data, setData] = useState();
  const [setSearchValue] = useState(null);
  const [pagination, setPagination] = useState();
  const [totalCount, setTotalCount] = useState();

  onMounted(async () => {
    setPagination({ page: 1, size: 4, sort: "ASC" });
    getData(1, 4, "ASC");
  });

  const getData = async (page, size, sort) => {
    try {
      const response = await api.get(
        `/vehicle/list?page=${page}&size=${size}&sort=${sort}`
      );

      const { data } = response;
      setData(data.cars);
      setTotalCount(data.totalCount);

    } catch (error) {
      const { data } = error.response;

      Notification("error", data.message);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onChangeSelect = (sort) => {
    //setPagination({ ...pagination, sort });
    getData(pagination.value.page, pagination.value.size, sort);
  };

  const onChangePagination = (page, size) => {
    //setPagination({ ...pagination, value.page: page, size });
    getData(page, size, pagination.value.sort);
  };

</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="cars-container">
      <div class="search-container">
        <a-input-search
          class="search-input"
          placeholder="Pesquisar por marca ou modelo"
          @on-search="(value) => handleSearch(value)"
          @on-change="(value) => handleSearch(value)"
        />
      </div>

      <div class="pagination-container">
        <a-pagination 
          v-if="pagination != null"
          v-model:current="pagination.page"
          v-model:defaultPageSize="pagination.size"
          v-model:total="totalCount"
          show-size-changer
          @change="onChangePagination"
        />

        <div class="sorter">
          <span>Ordem:</span>

          <a-select default-value="ASC" @on-change="onChangeSelect">
            <a-select-option value="ASC">Crescente</a-select-option>
            <a-select-option value="DESC">Decrescente</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="viewer-container">
        <div class="container-listing">
          <div v-for="item in data" v-bind:key="item.plate" class="car-container">
            <h1>
              {{item.brand}} {{item.model}}
            </h1>

            <div class="image-container">
              <img v-bind:src="images[Math.floor(Math.random() * 3)]" alt="car" />
            </div>

            <a-button
              type="primary"
              class="offer-button"
            >
              <span id="value">R$ {{item.value}},00</span>
              <span id="text">
                OFERTA <ArrowRightOutlined />
              </span>
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Vehicles.scss" lang="scss" scoped />
