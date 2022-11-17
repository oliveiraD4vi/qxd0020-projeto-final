<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
  import notification from "../../../services/notifications";
  import DateSelector from "../../../components/DateSelector/DateSelector.vue";
  import { onMounted } from 'vue';
  import { useState } from '../../../services/useState';
  import { api } from "../../../services/api";
  import image1 from "../../../assets/car-example-green.png";
  import image2 from "../../../assets/car-example-grey.png";
  import image3 from "../../../assets/car-example-white.png";

  const images = [image1, image2, image3];
  const [data, setData] = useState();
  const [setSearchValue] = useState(null);
  const [pagination, setPagination] = useState();
  const [setTotalCount] = useState();

  onMounted(async () =>{
    console.log("oi");

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

      notification("error", data.message);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onChangeSelect = (sort) => {
    setPagination({ ...pagination, sort });
    getData(pagination.page, pagination.size, sort);
  };

</script>

<template>
  <HeaderVue />
  <main class="main-container">
    <div class="cars-container">
      <DateSelector data="reservationData" />

      <div class="search-container">
        <a-search
          class="search-input"
          placeholder="Pesquisar por marca ou modelo"
          loading="loading"
          @on-search="(value) => handleSearch(value)"
          @on-change="(value) => handleSearch(value)"
        />
      </div>

      <div class="pagination-container">
          <a-pagination
          />

        <div class="sorter">
          <span>Ordem:</span>

          <a-select default-value="ASC" @on-change="onChangeSelect">
            <a-option value="ASC">Crescente</a-option>
            <a-option value="DESC">Decrescente</a-option>
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
