import { createApp } from 'vue';

import router from './routes';
import Antd from 'ant-design-vue';
import App from './App.vue';

import './styles/global.scss';

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#app');
