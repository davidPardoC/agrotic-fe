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
export const ReportService = {
  async getEntriesByCreator() {
    try {
      const data = await axios.get("/plants/report/general-report");
      return data.data;
    } catch (error) {
      return false;
    }
  },
  async getEntriesByDate(){
      try {
          const data = await axios.get('/plants/report/daily-report')
          return data.data
      } catch (error) {
          return false;
      }
  },
  async getCampDataByDate(){
      try {
          const data = await axios.get('/plants//report/camp-data-daily-report')
          return data.data;
      } catch (error) {
          return false;
      }
  }
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
