import { createApp } from 'vue';
import { rolesPath } from './services/utils';
import { api, auth } from './services/api';

import Notification from './services/notifications';
import router from './routes';
import Antd from 'ant-design-vue';
import App from './App.vue';

import './styles/global.scss';

const app = createApp(App);

const getPathUser = (role) => {
  const array = [];
  rolesPath.forEach((elem) => {
    if (elem.role.includes(role))
      array.push(elem.path);
  });

  return array;
};

router.beforeEach(async (to) => {
  const { path } = to;

  if (auth.getRole()) {
    let allowedRoutes = getPathUser(auth.getRole());

    if (auth.isAuthenticated() && allowedRoutes.includes(path)) {
      try {
        await api.get("/user/check");
      } catch (error) {
        Notification("error", "Sessão expirada");

        auth.logout();
        return { path: allowedRoutes[0] || "/login" };
      }
    } else if (allowedRoutes.length > 0) {
      return { path: allowedRoutes[0] };
    } else if (allowedRoutes.length === 0) {
      auth
        .logout()
        .then(() => {
          return { path: "/login" };
        })
        .catch(() => {
          return { path: "/login" };
        });
    } else {
      return { path: allowedRoutes[0] || "/" };
    }
  } else {
    let privateRoutes = getPathUser("ADMIN");

    if (privateRoutes.includes(path)) return { path: "/login" };
  }
});

app.use(router);
app.use(Antd);

app.mount('#app');
