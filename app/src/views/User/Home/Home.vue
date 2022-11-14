<script setup>
  import HeaderVue from '../../../components/Header/Header.vue';
  import FooterVue from '../../../components/Footer/Footer.vue';
  import DateSelector from '../../../components/DateSelector/DateSelector.vue';
  import {
    CalendarOutlined,
    ArrowRightOutlined,
    SearchOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
  } from '@ant-design/icons-vue';

  const vehicleList = [
    {
      plate: "ABC123",
      brand: "Toyota",
      Model: "Corola"
    },
    {
      plate: "XYZ456",
      brand: "Toyota",
      Model: "SW4"
    },
    {
      plate: "ABC741",
      brand: "Toyota",
      Model: "SW4"
    }
  ];
</script>

<template>

    <HeaderVue />
    <main class="main-container">
      <div class="home-container">
        <div class="date-selector-container">
          <DateSelector />
        </div>

        <div class="carrousel-container">
            <h1 class="title">
              mais<span> R</span>entáveis
            </h1>

            <a-carousel autoplay>
              <div class="vehicle-container" v-for="vehicle in vehicleList" :key="vehicle.message">
                <div>
                  <img src="../../../assets/car-example-green.png" alt="vehicle"/>
                </div>
                <h3>
                  {{ vehicle.brand }} {{ vehicle.model }}
                </h3>
                <span>2020</span>
                <a-button type="primary" class="primary-button">
                  OFERTA <ArrowRightOutlined />
                </a-button>
              </div>
            </a-carousel>
          </div>
          
        <div class="cards-container">
          <h1 class="title">
            como fazer uma <span>R</span>eserva
          </h1>

          <div class="cards">
            <div class="card">
              <div class="card-icon">
                <CalendarOutlined />
              </div>
              <a-card>
                <div class="content">
                  <h3>Escolha as datas</h3>
                  <p>
                    você precisa nos dizer quando vai retirar o carro e quando vai
                    trazer ele de volta pra gente
                  </p>
                </div>

                <a-button
                  type="primary"
                  class="primary-button"
                >
                  COMEÇAR <ArrowRightOutlined />
                </a-button>
              </a-card>
            </div>

            <div class="card">
              <div class="card-icon">
                <SearchOutlined />
              </div>
              <a-card>
                <div class="content">
                  <h3>Procure um carro</h3>
                  <p>
                    temos uma grande gama de carros que você pode escolher,
                    verifique nossa lista!
                  </p>
                </div>

                <a-button
                  type="primary"
                  class="primary-button"
                >
                  COMEÇAR <ArrowRightOutlined />
                </a-button>
              </a-card>
            </div>

            <div class="card">
              <div class="card-icon">
                <FileTextOutlined />
              </div>

              <a-card>
                <div class="content">
                  <h3>Preencha o form</h3>
                  <p>
                    só precisamos saber algumas coisas sobre a reserva e sobre
                    você, o cliente
                  </p>
                </div>

                <a-button
                  type="primary"
                  class="primary-button"
                >
                  COMEÇAR <ArrowRightOutlined />
                </a-button>
              </a-card>
            </div>

            <div class="card">
              <div class="card-icon">
                <CheckCircleOutlined />
              </div>
              <a-card>
                <div class="content">
                  <h3>Retire o carro</h3>
                  <p>
                    ao realizar o pagamento você receberá um comprovante para
                    retirar o carro!
                  </p>
                </div>

                <a-button
                  type="primary"
                  class="primary-button"
                >
                  COMEÇAR <ArrowRightOutlined />
                </a-button>
              </a-card>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FooterVue />

</template>

<style src="./Home.scss" lang="scss" scoped></style>
