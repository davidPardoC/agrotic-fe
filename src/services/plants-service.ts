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
  async getPlantsTable(page: number, place:string, author:string): Promise<PlantTableResponse | undefined> {
    try {
      const data = await axios.get(`/plants/table?page=${page}${place?'&place='+place:''}${author?'&author='+author:''}`);
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
  async createPlant(plant: any, file?: File) {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.entries(plant).forEach((data: any) => {
      formData.append(data[0], data[1]);
    });
    try {
      const data = await axios.post("/plants/", formData);
      return data.data;
    } catch (error) {
      fireErrorAlert(error);
    }
  },

  async getPlantById(id: string): Promise<any> {
    try {
      const data = await axios.get(`/plants/${id}`);
      return data.data;
    } catch (error) {
      return false;
    }
  },

  async updatePlant(id: string, plant: any, file?: File) {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.entries(plant).forEach((data: any) => {
      formData.append(data[0], data[1]);
    });
    try {
      const data = await axios.put(`/plants/${id}`, formData);
      return data.data;
    } catch (error) {
      return false;
    }
  },
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
