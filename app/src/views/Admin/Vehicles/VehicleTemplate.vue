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
      <template v-if="column.key === 'brand'">
        <span> Marca </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'brand'">
        <span>
          {{ record.brand }}
        </span>
      </template>

      <template v-else-if="column.key === 'model'">
        <span>
          {{ record.model }}
        </span>
      </template>

      <template v-else-if="column.key === 'color'">
        <span>
          <a-tag :color="record.color === 'White' ? 'Gray' : record.color">
            {{ record.color.toUpperCase() }}
          </a-tag>
        </span>
      </template>

      <template v-else-if="column.key === 'value'">
        <span>
          {{ record.value }}
        </span>
      </template>
    </template>
  </a-table>
</template>
