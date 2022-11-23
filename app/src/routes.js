import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/User/Home/Home.vue";
import About from "./views/User/About/About.vue";
import Vehicles from "./views/User/Vehicles/Vehicles.vue";
import Login from "./views/Login/Login.vue";
import Register from "./views/Register/Register.vue";
import Reservation from "./views/User/Reservation/Reservation.vue";
import AdminHome from "./views/Admin/Home/Home.vue";
import AdminVehicle from "./views/Admin/Vehicles/Vehicles.vue";
import AdminVehicleData from "./views/Admin/Vehicles/Data/VehicleData.vue";
import AdminReservation from "./views/Admin/Reservations/Reservations.vue";
import AdminReservationData from "./views/Admin/Reservations/Data/ReservationData.vue";
import AdminUser from "./views/Admin/Users/Users.vue";
import AdminUserData from "./views/Admin/Users/Data/UserData.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/vehicles",
    name: "vehicles",
    component: Vehicles,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/reservation",
    name: "reservation",
    component: Reservation,
  },
  {
    path: "/admin/home",
    name: "adminHome",
    component: AdminHome,
  },
  {
    path: "/admin/vehicle",
    name: "adminVehicle",
    component: AdminVehicle,
  },
  {
    path: "/admin/vehicle/data",
    name: "adminVehicleData",
    component: AdminVehicleData,
  },
  {
    path: "/admin/reservation",
    name: "adminReservation",
    component: AdminReservation,
  },
  {
    path: "/admin/reservation/data",
    name: "adminReservationData",
    component: AdminReservationData,
  },
  {
    path: "/admin/user",
    name: "adminUser",
    component: AdminUser,
  },
  {
    path: "/admin/user/data",
    name: "adminUserData",
    component: AdminUserData,
  },
];

export const router = createRouter({ history: createWebHistory(), routes });

export default router;
