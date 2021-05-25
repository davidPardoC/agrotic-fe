import axios from "axios";
import { urlApi } from "../environment/variables";
import { fireErrorAlert, fireSuccessAlert } from "../utils/alerts";
import { PlantTableResponse } from "./types/plats-types";

axios.defaults.baseURL = urlApi;

axios.interceptors.request.use(
  (config) => {
    config.headers = { Authorization: getToken() };
    return config;
  },
  () => {}
);

export const PlantsService = {
  async getPlantsTable(page: number): Promise<PlantTableResponse | undefined> {
    try {
      const data = await axios.get(`/plants/table?page=${page}`);
      return data.data as PlantTableResponse;
    } catch (error) {
      fireErrorAlert(error);
    }
  },
  async deletePlantById(id: string) {
    try {
      const data = await axios.delete(`/plants/?id=${id}`);
      return data;
    } catch (error) {
      fireErrorAlert(error);
    }
  },
  async createPlant(plant: any) {
    try {
      const data = await axios.post("/plants/", plant);
      return data.data;
    } catch (error) {
      fireErrorAlert(error);
    }
  },
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
