<script setup>
import moment from "moment";
import { ReservationStore } from "../../store/ReservationStore";
import { reactive } from "vue";
import router from "../../routes";

const store = ReservationStore();

const props = defineProps({
  pickup: {
    type: String,
    default: "",
  },
  devolution: {
    type: String,
    default: "",
  },
});

const formState = reactive({
  pickup: props.pickup,
  devolution: props.devolution,
});

const onFinish = async () => {
  store.setPickupData(formState.pickup);
  store.setDevolutionDataData(formState.devolution);
  router.push("/vehicles");
};

const disabledPickupDate = (current) => {
  return current && current <= moment();
};

const disabledDevolutionDate = (current) => {
  if (formState.pickup === "") return true;

  return current && (current <= moment() || current <= formState.pickup);
};
</script>

<template>
  <div class="selector-container">
    <h2>datas de <span>R</span>etirada e <span>D</span>evolução</h2>
    <a-form
      :model="formState"
      name="reservation-date-form"
      class="reservation-date-form"
      @finish="onFinish"
    >
      <div class="form-date">
        <a-form-item
          name="pickup"
          :rules="[{ required: true, message: 'Insira a data de retirada!' }]"
        >
          <a-date-picker
            v-model:value="formState.pickup"
            placeholder="Data de retirada"
            :disabled-date="disabledPickupDate"
            format="DD/MM/YYYY"
          />
        </a-form-item>

        <a-form-item
          name="devolution"
          :rules="[{ required: true, message: 'Insira a data de devolução!' }]"
        >
          <a-date-picker
            v-model:value="formState.devolution"
            placeholder="Data de devolução"
            :disabled-date="disabledDevolutionDate"
            format="DD/MM/YYYY"
          />
        </a-form-item>
      </div>

      <a-form-item class="btn">
        <a-button type="primary" html-type="submit" class="secondary-button">
          CONTINUAR
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style src="./DateSelector.scss" lang="scss" scoped></style>
