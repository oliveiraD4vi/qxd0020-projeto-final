import { createRouter, createWebHistory } from "vue-router";

import Home from './views/User/Home/Home.vue';
import About from './views/User/About/About.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
