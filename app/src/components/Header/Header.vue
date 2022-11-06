<script setup></script>

<template>
  <div class="header-container">
    <a-button type="text">
      <router-link to="/">
        <img src="../../assets/grancars-primary.svg" alt="brand logo" />
      </router-link>
    </a-button>

    <ul class="navigation-container">
      <li class="navigation-item">
        <a-button type="text">
          <router-link to="/home">
            HOME
          </router-link>
        </a-button>
      </li>
      
      <li class="navigation-item">
        <a-button type="text">
          <router-link to="/vehicles">
            CARROS
          </router-link>
        </a-button>
      </li>

      <li class="navigation-item">
        <a-button type="text">
          <router-link to="/reservation">
            RESERVAS
          </router-link>
        </a-button>
      </li>
      
      <li class="navigation-item">
        <a-button type="text">
          <router-link to="/about">
            SOBRE NÓS
          </router-link>
        </a-button>
      </li>
    </ul>

    <a-button type="primary">
      SAIR
    </a-button>
  </div>
</template>

<style src="./Header.scss" lang="sass" scoped />
