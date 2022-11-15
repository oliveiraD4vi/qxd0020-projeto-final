<script setup>
  import { CarOutlined, FileOutlined, UserOutlined } from "@ant-design/icons-vue"
</script>

<template>
  <div class="admin-home-container" >

      <a class="menu-item">
        <router-link>
          <CarOutlined/> Veiculos
        </router-link> 
      </a>
      <a class="menu-item">
        <router-link>
          <FileOutlined/> Reservas
        </router-link>  
      </a>
      <a class="menu-item">
        <router-link>
          <UserOutlined/> Usuários
        </router-link>
      </a>
  </div>
</template>

<style src="./Home.scss" lang="scss" scoped></style>
