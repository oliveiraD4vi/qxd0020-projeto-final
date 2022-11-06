import { createRouter, createWebHistory } from "vue-router";

import Home from './views/User/Home/Home.vue';
import About from './views/User/About/About.vue';
import Vehicles from './views/User/Vehicles/Vehicles.vue';

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
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: Vehicles
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
