<script setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

import router from "../../routes";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Título",
  },
  goBackHome: {
    type: [Function, Boolean],
    default: false,
  },
});

const handleGoBackButton = () => {
  if (typeof props.goBackHome === "function") {
    props.goBackHome();
  } else if (props.goBackHome) {
    router.push("/admin/home");
  } else {
    router.back();
  }
};
</script>

<template>
  <div className="page-header-container">
    <div className="page-header-title">
      <a-button
        class="icon-back"
        type="primary"
        shape="circle"
        @click="handleGoBackButton()"
      >
        <template #icon>
          <ArrowLeftOutlined />
        </template>
      </a-button>

      <h1 id="title">{{ title }}</h1>
    </div>
  </div>
</template>

<style src="./PageHeader.scss" lang="scss" scoped />
