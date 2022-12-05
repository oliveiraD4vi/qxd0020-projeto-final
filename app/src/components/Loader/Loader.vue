<script setup>
import { LoadingOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";

import router from "../../routes";

const state = reactive({
  reload: false,
});

onMounted(() => {
  setTimeout(() => {
    state.reload = true;
  }, 3000);
});
</script>

<template>
  <div class="loader-container">
    <div class="flex">
      <LoadingOutlined />
      Carregando...
    </div>

    <div v-if="state.reload" class="flex">
      Se estiver demorando muito,
      <a-button type="text" @click="router.go()">recarregue</a-button> a página.
    </div>
  </div>
</template>

<style src="./Loader.scss" lang="scss" scoped />
