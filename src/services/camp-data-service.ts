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
export const CampDataService = {
  async getCampDataById(id: string): Promise<any[]> {
    try {
      const data = await axios.get(`/campData/${id}`);
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getExcelReport(id: string) {
    axios.get(`/campData/download-report/${id}`, {
      responseType: "blob",
    }).then(response=>{
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click()
    });
  },
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
