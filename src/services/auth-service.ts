import axios from "axios";
import { urlApi } from "../environment/variables";
import { fireErrorAlert, fireSuccessAlert } from "../utils/alerts";
import { RegisterForm } from "../views/register/types";
axios.defaults.baseURL = urlApi;
export const AuthService = {
  async login(email: string, password: string) {
    try {
      const data = await axios.post("/users/login", { email, password });
      localStorage.setItem("token", data.data.token);
      return data.data.token;
    } catch (error) {
      fireErrorAlert(error);
    }
  },

  async registerUser(formValues: RegisterForm) {
    try {
      const data = await axios.post("/users/register", formValues);
      fireSuccessAlert(data.data.message);
    } catch (error) {
      console.log({ error });
      fireErrorAlert(JSON.parse(error.request.response).error);
    }
  },
};
