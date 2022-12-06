<script setup>
import Notification from "../../../services/notifications";
import PageHeader from "../../PageHeader/PageHeader.vue";
import router from "../../../routes";

import { useState } from "../../../services/useState";

const [loading, setLoading] = useState(false);

const props = defineProps({
  onDelete: {
    type: Function,
    default: null,
  },
  next: {
    type: Function,
    default: null,
  },
  previous: {
    type: Function,
    default: null,
  },
});

const onFinish = async () => {
  setLoading(true);

  try {
    props.next();

    Notification("success", "Operação realizada com sucesso!");
    router.go();
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    Notification("error", data.message);
  }
};
</script>

<template>
  <div class="payment-container">
    <PageHeader title="Efetuar Pagamento" :go-back-home="previous" />
    <div id="message">
      <p>Pagamento efetuado com sucesso!</p>
    </div>
    <div class="form-button-container">
      <a-button type="text" :loading="loading" @click="onDelete">
        Cancelar
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        class="primary-button"
        @click="onFinish"
      >
        FINALIZAR
      </a-button>
    </div>
  </div>
</template>

<style src="./Payment.scss" lang="scss" scoped />
