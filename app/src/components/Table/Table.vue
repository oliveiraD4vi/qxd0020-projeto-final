<!-- eslint-disable vue/require-default-prop -->
<script setup>
import {
  ArrowRightOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref, createVNode } from "vue";
import { useState } from "../../services/useState";
import { Modal } from "ant-design-vue";
import { api } from "../../services/api";

import router from "../../routes";
import Notification from "../../services/notifications";
import VehicleTemplate from "../../views/Admin/Vehicles/Template/VehicleTemplate.vue";
import UserTemplate from "../../views/Admin/Users/Template/UserTemplate.vue";
import ReservationTemplate from "../../views/Admin/Reservations/Template/ReservationTemplate.vue";

const pageSizeOptions = ref(["5", "10", "15", "20", "30"]);

onMounted(() => {
  setPag(props.pagination);
  setTotal(props.totalCount);
});

const [pag, setPag] = useState();
const [total, setTotal] = useState();
const [selectedRowKeys, setSelectedRowKeys] = useState([]);

const props = defineProps({
  goPath: String,
  data: Object,
  columns: Array,
  getData: Function,
  pagination: Object,
  setPagination: Function,
  totalCount: Number,
  loading: Boolean,
  tableTemplate: String,
});

const navigate = () => router.push(props.goPath);

const onDelete = () => {
  selectedRowKeys.value.forEach(async (id) => {
    let endpoint = "vehicle";
    const { pathname } = location;
    if (pathname.includes("user")) endpoint = "user";
    if (pathname.includes("reservation")) endpoint = "reservation";

    try {
      const { data } = await api.delete(`/${endpoint}?id=${id}`);
      Notification("success", data.message);
    } catch ({ response }) {
      Notification("error", response.data.message);
    }
  });

  props.getData(1, 5, "ASC", "");
  setSelectedRowKeys([]);
};

const onConfirmDelete = () => {
  Modal.confirm({
    title:
      selectedRowKeys.value.length > 1
        ? "Você tem mais de um item selecionado, deseja deletar todos?"
        : "Você deseja deletar esse item?",
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    onOk() {
      return onDelete();
    },
    onCancel() {},
  });
};

const onChangeSearch = (search) => {
  props.setPagination({ ...props.pagination, search: search });
  setPag({ ...props.pagination, search: search });
  props.getData(
    props.pagination.page,
    props.pagination.size,
    props.pagination.sort,
    search
  );
};

const onChangePagination = (page, size) => {
  props.setPagination({ ...props.pagination, page, size });
  setPag({ ...props.pagination, page, size });
  props.getData(page, size, props.pagination.sort, props.pagination.search);
};

const rowSelection = (selectedRows) => {
  setSelectedRowKeys(selectedRows);
};

const onTableChange = () => {
  props.getData();
};
</script>

<template>
  <div className="table-container">
    <div className="filter search-container">
      <a-input-search
        class="search-input"
        placeholder="Pesquisar..."
        @search="onChangeSearch"
      />

      <div class="action-container">
        <a-button
          type="primary"
          class="add-button"
          shape="circle"
          @click="navigate"
        >
          <template #icon>
            <PlusOutlined />
          </template>
        </a-button>

        <a-button
          type="primary"
          class="delete-button"
          :disabled="selectedRowKeys.length > 0 ? false : true"
          shape="circle"
          @click="onConfirmDelete"
        >
          <template #icon>
            <CloseOutlined />
          </template>
        </a-button>

        <a-button
          type="primary"
          :disabled="selectedRowKeys.length == 1 ? false : true"
          class="go-button"
          shape="circle"
          @click="navigate"
        >
          <template #icon>
            <ArrowRightOutlined />
          </template>
        </a-button>
      </div>
    </div>
    <div class="table-box">
      <VehicleTemplate
        v-if="tableTemplate === 'vehicle'"
        :on-table-change="onTableChange"
        :row-selection="rowSelection"
        :columns="columns"
        :data="data"
        :loading="loading"
      />
      <UserTemplate
        v-else-if="tableTemplate === 'user'"
        :on-table-change="onTableChange"
        :row-selection="rowSelection"
        :columns="columns"
        :data="data"
        :loading="loading"
      />
      <ReservationTemplate
        v-else-if="tableTemplate === 'reservation'"
        :on-table-change="onTableChange"
        :row-selection="rowSelection"
        :columns="columns"
        :data="data"
        :loading="loading"
      />

      <a-pagination
        v-if="pag"
        v-model:current="pag.page"
        v-model:defaultPageSize="pag.size"
        v-model:total="total"
        :page-size-options="pageSizeOptions"
        :disabled="loading"
        show-size-changer
        @change="onChangePagination"
      />
    </div>
  </div>
</template>

<style src="./Table.scss" lang="scss" scoped />
