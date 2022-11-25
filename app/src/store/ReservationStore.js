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
    setDevolutionDataData(newState) {
      this.devolutionData = newState;
    },
  },
});
