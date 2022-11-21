<!-- eslint-disable vue/require-default-prop -->
<script setup>
defineProps({
  onTableChange: Function,
  rowSelection: Function,
  columns: Array,
  data: Object,
  loading: Boolean,
});
</script>

<template>
  <a-table
    class="table"
    :row-key="(record) => record.id"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :loading="loading"
    :row-selection="{ onChange: rowSelection }"
    @change="onTableChange"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Nome </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'email'">
        <span>
          {{ record.email }}
        </span>
      </template>

      <template v-else-if="column.key === 'role'">
        <span>
          {{ record.role }}
        </span>
      </template>

      <template v-else-if="column.key === 'bornAt'">
        <span>
          {{ $filters.formatDate(record.bornAt) }}
        </span>
      </template>
    </template>
  </a-table>
</template>
