<script setup>
  import { CarOutlined, FileOutlined, UserOutlined } from "@ant-design/icons-vue"

  const menuItems = [
    {
      name: "Veículos",
      components: <CarOutlined/>
    },
    {
      name: "Reservas",
      components: CarOutlined
    },
    {
      name: "Usuários",
      components: CarOutlined
    },
  ];
</script>

<template>
  <div class="admin-home-container" >
      <a class="menu-item" v-for="item in menuItems" key="item.name">
        {{item.components}} {{item.name}}
      </a>
  </div>
</template>

<style src="./Home.scss" lang="scss" scoped></style>
