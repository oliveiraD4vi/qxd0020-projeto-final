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
      <template v-if="column.key === 'user'">
        <span> Usuário </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'vehicleid'">
        <span>
          {{ record.vehicle_id }}
        </span>
      </template>

      <template v-else-if="column.key === 'pickup'">
        <span>
          {{ $filters.formatDate(record.pickup) }}
        </span>
      </template>

      <template v-else-if="column.key === 'devolution'">
        <span>
          {{ $filters.formatDate(record.devolution) }}
        </span>
      </template>

      <template v-else-if="column.key === 'setp'">
        <span>
          {{ record.step }}
        </span>
      </template>

      <template v-else-if="column.key === 'status'">
        <span>
          {{ record.status }}
        </span>
      </template>
    </template>
  </a-table>
</template>
