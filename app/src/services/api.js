import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const auth = localStorage.getItem("GCUSER");
  if (auth) {
    const { token } = JSON.parse(auth);
    const tmpConfig = config;
    if (token) {
      tmpConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const AUTH = "GCUSER";

export const auth = {
  login(authData) {
    localStorage.setItem(AUTH, JSON.stringify(authData));
  },
  logout() {
    localStorage.removeItem(AUTH);
  },
  isAuthenticated() {
    if (localStorage.getItem(AUTH) !== null) return true;
    return false;
  },
  getToken() {
    if (localStorage.getItem(AUTH)) {
      const { token } = JSON.parse(localStorage.getItem(AUTH));
      return token;
    } else return false;
  },
  getId() {
    if (localStorage.getItem(AUTH)) {
      const { userId } = JSON.parse(localStorage.getItem(AUTH));
      return userId;
    } else return false;
  },
  getRole() {
    if (localStorage.getItem(AUTH)) {
      const { role } = JSON.parse(localStorage.getItem(AUTH));
      return role;
    } else return false;
  },
};
