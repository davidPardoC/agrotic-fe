import axios from "axios";
import { urlApi } from "../environment/variables";
axios.defaults.baseURL = urlApi;
axios.interceptors.request.use(
  (config) => {
    config.headers = { Authorization: getToken() };
    return config;
  },
  () => {}
);
export const UserService = {
  async getUserProfile() {
    try {
      const data = await axios.get("/users/profile");
      return data.data;
    } catch (error) {
      return false;
    }
  },
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
