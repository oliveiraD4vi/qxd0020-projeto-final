# :checkered_flag: GranCARS

GransCARS é um sistema de aluguel de carro online para uma locadora fictícia localizada na cidade de Quixadá - CE.

## :technologist: Membros da equipe

521437 - Robson do Amaral Diógenes - Engenharia de Software

521440 - Davi Silva Alves de Oliveira - Sistemas de Informação

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Cliente logado, cliente não logado e o administrador.

## :spiral_calendar: Entidades ou tabelas do sistema

Usuário, Carro e Reserva.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

O cliente não precisará estar autenticado para visualizar as informações sobre os carros disponíveis, mas precisará criar uma conta para realizar uma reserva. O cliente fará uma reserva e, após a confirmação do pagamento, receberá um comprovante de pagamento para retirada do veículo. O cliente poderá também visualizar suas antigas transações.

O administrador, por sua vez, poderá ver uma lista de cada entidade do sistema(carro, clientes e administrador), bem como deletar, editar e criar novos. Dessa forma, teremos a possibilidade do administrador realizar um cadastro e uma reserva para um cliente de forma presencial, bem como cadastrar novos administradores. 

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:

----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

* [Vue](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [VueRouter](https://router.vuejs.org/)
* [AntDesign](https://ant.design/docs/react/introduce)
* [Pinia](https://pinia.vuejs.org/)
* [Prettier](https://prettier.io/)
* [ESLint](https://eslint.org/)
* [Axios](https://axios-http.com/ptbr/docs/intro)
* [Sass](https://sass-lang.com/)
* [Commitzen](https://commitizen-tools.github.io/commitizen/)

**Backend:**

* [Node](https://nodejs.org/en/)
* [Swagger](https://swagger.io/)
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/)

Para ver o repositório do backend, clique [aqui](https://github.com/oliveiraD4vi/vehicle-rental-system-api). A API está disponível no endereço: http://54.233.164.89:8080/

Para verificar o swagger, clique [aqui](http://54.233.164.89:8080/swagger-doc/).

## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário | X |  X  |  X  |  X  |
| Veículo | X |  X  |  X  |  X  |
| Reserva | X |  X  |  X  |  X  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas
URL Base: http://54.233.164.89:8080/

Usuário:

| Método HTTP | URL |
| --- | --- |
| PUT | api/user/ |
| DELETE | api/user/ |
| GET | api/user/ |
| GET | api/user/personal |
| GET | api/user/list |
| GET | api/user/check |
| POST | api/user/register |
| POST | api/user/login |

Veículo:

| Método HTTP | URL |
| --- | --- |
| PUT | api/vehicle/ |
| GET | api/vehicle/ |
| DELETE | api/vehicle/ |
| GET | api/vehicle/list/random |
| GET | api/vehicle/list |
| POST | api/vehicle/register |

Reserva:

| Método HTTP | URL |
| --- | --- |
| POST | api/reservation/ |
| PUT | api/reservation/ |
| DELETE | api/reservation/ |
| GET | api/reservation/ |
| GET | api/reservation/user |
| GET | api/reservation/list |
