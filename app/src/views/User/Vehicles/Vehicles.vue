<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
  import notification from "../../../services/notifications";
  import DateSelector from "../../../components/DateSelector/DateSelector.vue";
  import { onMounted } from 'vue';
  import { useState } from '../../../services/useState';
  import { api } from "../../../services/api";
  import Car from "./Car/Car.vue";

  const [setData] = useState();
  const [setLoading] = useState();
  const [setDisabled] = useState();
  const [setSearchValue] = useState(null);
  const [pagination, setPagination] = useState();
  const [setTotalCount] = useState();

  onMounted(async () =>{
    setLoading(true);
    setDisabled(true);

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

      setLoading(false);
      setDisabled(false);
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

  const onChangePagination = (page, size) => {
    setPagination({ ...pagination, page, size });
    getData(page, size, pagination.sort);
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
            show-size-changer
            current="pagination.page"
            default-page-size="pagination.size"
            total="totalCount"
            page-size-options="4, 12, 20, 28"
            @on-change="onChangePagination"
            @disabled="disabled"
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
          <Car></Car>
        </div>
      </div>
    </div>
  </main>
  <FooterVue />
</template>

<style src="./Vehicles.scss" lang="scss" scoped />
