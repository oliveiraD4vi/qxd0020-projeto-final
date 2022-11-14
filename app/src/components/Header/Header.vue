<script setup>
  import { auth } from '../../services/api';
  import router from '../../routes';

  const { pathname } = location;

  const logout = () => {
    auth.logout();
    router.push('/login');
  };
</script>

<template>
  <div class="header-container">
    <a-button type="text">
      <router-link to="/">
        <img src="../../assets/grancars-primary.svg" alt="brand logo" />
      </router-link>
    </a-button>

    <ul class="navigation-container" v-if="!pathname.includes('admin')">
      <li class="navigation-item">
        <a-button class="link-button" type="text">
          <router-link to="/">
            HOME
          </router-link>
        </a-button>
      </li>
      
      <li class="navigation-item">
        <a-button class="link-button" type="text">
          <router-link to="/vehicles">
            CARROS
          </router-link>
        </a-button>
      </li>

      <li class="navigation-item" v-if="auth.isAuthenticated()">
        <a-button class="link-button" type="text">
          <router-link to="/reservation">
            RESERVAS
          </router-link>
        </a-button>
      </li>
      
      <li class="navigation-item">
        <a-button class="link-button" type="text">
          <router-link to="/about">
            SOBRE NÓS
          </router-link>
        </a-button>
      </li>
    </ul>

    <a-button
      v-if="auth.isAuthenticated()"
      class="primary-button"
      type="primary"
      @click="logout()"
    >
      SAIR
    </a-button>

    <a-button v-else-if="pathname === '/login'" class="primary-button" type="text">
      <router-link to="/register">
        CADASTRAR
      </router-link>
    </a-button>

    <a-button v-else-if="pathname === '/register'" class="primary-button" type="primary">
      <router-link to="/login">
        ENTRAR
      </router-link>
    </a-button>

    <div v-else>
      <a-button class="link-button" type="text">
        <router-link to="/register">
          Cadastrar
        </router-link>
      </a-button>
      <a-button class="primary-button" type="primary">
        <router-link to="/login">
          ENTRAR
        </router-link>
      </a-button>
    </div>
  </div>
</template>

<style src="./Header.scss" lang="sass" scoped />
