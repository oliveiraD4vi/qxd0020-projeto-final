import { defineStore } from "pinia";

export const ReservationStore = defineStore("reservation", {
  state: () => {
    return {
      pickupData: "",
      devolutionData: "",
    };
  },

  actions: {
    setPickupData(newState) {
      this.pickupData = newState;
    },
    setDevolutionData(newState) {
      this.devolutionData = newState;
    },
  },
});
