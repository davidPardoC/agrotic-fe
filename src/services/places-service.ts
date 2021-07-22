import axios from "axios";
import { urlApi } from "../environment/variables";
import { fireErrorAlert } from "../utils/alerts";

axios.defaults.baseURL = urlApi;

axios.interceptors.request.use(
  (config) => {
    config.headers = { Authorization: getToken() };
    return config;
  },
  () => {}
);
export const PlacesServices = {
  async getTable(pageNumber = 1) {
    try {
      const page = await axios.get(`/places/table?page=${pageNumber}`);
      return page.data.docs;
    } catch (error) {
      return false;
    }
  },
  async createPlace(placeBody: any) {
    try {
      const place = await axios.post(`/places/`, placeBody);
      return place.data;
    } catch (error) {
      console.log(error.response.message);
      fireErrorAlert(error.response.message);
      return false;
    }
  },
  async getAllPlaces():Promise<any>{
      try {
          const places = await axios.get('/places/list')
          return places.data;
      } catch (error) {
          return false
      }
  }
};
const getToken = (): string | null => {
  return localStorage.getItem("token");
};
