<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';

  import { CarOutlined, FileOutlined, UserOutlined } from "@ant-design/icons-vue"
</script>

<template>

  <HeaderVue />
  <main class="main-container">
    <div class="admin-home-container" >
      <router-link class="menu-item" to="/admin/vehicle">
        <CarOutlined/> Veículos
      </router-link>

      <router-link class="menu-item" to="/admin/reservation">
        <FileOutlined/> Reservas
      </router-link>
  
      <router-link class="menu-item" to="/admin/user"> 
        <UserOutlined/> Usuários
      </router-link>
    </div>
  </main>
  <FooterVue />

</template>

<style src="./Home.scss" lang="scss" scoped></style>
