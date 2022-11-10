<script setup>
  import DateSelector from '../../../components/DateSelector/DateSelector.vue';
  import image1 from "../../../assets/car-example-green.png";
  import image2 from "../../../assets/car-example-grey.png";
  import image3 from "../../../assets/car-example-white.png";
  import {
  CalendarOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';

  const images = [image1, image2, image3];

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
    }
  ]

</script>

<template>
    <div class="home-container">
      <div class="date-selector-container">
        <DateSelector></DateSelector>
      </div>

      <div class="carrousel-container">
          <h1 class="title">
            mais
            <span> R</span>
            entáveis
          </h1>

          <a-carousel autoplay>
            <div class="vehicle-container">
              <div>
                <img
                  src="../../../assets/car-example-green.png"
                  alt="vehicle"
                />
              </div>
              <h3>
                {{vehicleList[0].brand}} {{vehicleList[0].model}}
              </h3>
              <span>2020</span>
              <a-button
                type="primary"
              >
                OFERTA <ArrowRightOutlined />
              </a-button>
            </div>

            <div class="vehicle-container">
              <div>
                <img
                  src="../../../assets/car-example-grey.png"
                  alt="vehicle"
                />
              </div>
              <h3>
                {{vehicleList[1].brand}} {{vehicleList[1].model}}
              </h3>
              <span>2020</span>
              <a-button
                type="primary"
              >
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

</template>

<style src="./Home.scss" lang="scss" scoped></style>
