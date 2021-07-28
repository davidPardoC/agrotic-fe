import axios from "axios";
import { urlApi } from "../environment/variables";
import { fireErrorAlert, fireSuccessAlert } from "../utils/alerts";
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
  async updatePassword(values:any){
    try {
      const data = await axios.post('/users/update-password',values)
      fireSuccessAlert(data.data.message)
    } catch (error) {
      fireErrorAlert('Bad credentials')
    }
  },
  async updateProfile(values:any){
    let data;
    try {
      data = await axios.post('/users/update-profile', values)
      fireSuccessAlert('Usuario actualizado correctamente')
      return data.data
    } catch (error) {
      fireErrorAlert(data?.data.response.message)
    }
  },
  async getAllUsers(){
    try {
      const data = await axios.get('/users')
      return data.data;
    } catch (error) {
      fireErrorAlert(error.data.response.message)
    }
  }
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
