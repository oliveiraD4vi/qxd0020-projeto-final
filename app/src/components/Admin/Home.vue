<script setup>
  import { CarOutlined, FileOutlined, UserOutlined } from "@ant-design/icons-vue"
</script>

<template>
  <div class="admin-home-container" >
      <a class="menu-item">
        <CarOutlined/> Veiculos
      </a>
      <a class="menu-item">
        <FileOutlined/> Reservas
      </a>
      <a class="menu-item">
        <UserOutlined/> Usuários
      </a>
  </div>
</template>

<style src="./Home.scss" lang="scss" scoped></style>
