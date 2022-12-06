import { defineStore } from "pinia";

export const ReservationStore = defineStore("reservation", {
  state: () => {
    return {
      pickupData: "",
      devolutionData: "",
      vehicle_id: "",
    };
  },

  actions: {
    setPickupData(newState) {
      this.pickupData = newState;
    },
    setDevolutionData(newState) {
      this.devolutionData = newState;
    },
    setVehicle(newState) {
      this.vehicle_id = newState;
    },
  },
});
