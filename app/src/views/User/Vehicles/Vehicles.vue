<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
  import notification from "../../../services/notifications";
  import DateSelector from "../../../components/DateSelector/DateSelector.vue";
  import { onMounted } from 'vue';
  import image1 from "../../../assets/car-example-green.png";
  import image2 from "../../../assets/car-example-grey.png";
  import image3 from "../../../assets/car-example-white.png";
  import { useState } from '../../../services/useState';
  import { Input, Pagination, Select } from "ant-design-vue";
  import { api } from "../../../services/api";
  import Car from "./Car/Car.vue";

  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [disabled, setDisabled] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [pagination, setPagination] = useState();
  const [totalCount, setTotalCount] = useState();

  const { Search } = Input;
  const { Option } = Select;

  const images = [image1, image2, image3];

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

  const filterSearch = (item) => {
    if (
      searchValue === "" ||
      searchValue === " " ||
      searchValue === null ||
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.model.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return item;
    }
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

      <div className="search-container">
        <a-search
          class="search-input"
          placeholder="Pesquisar por marca ou modelo"
          @onSearch="(value) => handleSearch(value)"
          @onChange="(value) => handleSearch(value)"
          loading="loading"
        />
      </div>

      <div class="pagination-container">
          <a-pagination
            showSizeChanger
            current="pagination.page"
            defaultPageSize="pagination.size"
            total="totalCount"
            @onChange="onChangePagination"
            @disabled="disabled"
            pageSizeOptions="4, 12, 20, 28"
          />

        <div class="sorter">
          <span>Ordem:</span>

          <a-select defaultValue="ASC" @onChange="onChangeSelect">
            <a-option value="ASC">Crescente</a-option>
            <a-option value="DESC">Decrescente</a-option>
          </a-select>
        </div>
      </div>

      <div class="viewer-container">
        <div class="container-listing" v-for="item in data">
          <Car
            key={{item.plate}}
            data = {{item}}
            img= {{images[Math.floor(Math.random() * 3)]}}
          />
        </div>
      </div>
    </div>
  </main>
  <FooterVue />

</template>

<style src="./Vehicles.scss" lang="scss" scoped />
