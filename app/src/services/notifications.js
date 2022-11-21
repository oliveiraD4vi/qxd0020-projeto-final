import { notification } from "ant-design-vue";

export default function Notification(type, message) {
  notification[type]({
    message: message ? message : "Erro desconhecido",
    duration: 3,
  });
}
