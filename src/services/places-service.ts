import axios from "axios";
import { fireErrorAlert } from "../utils/alerts";

export const PlacesServices = {
    async getTable(pageNumber=1){
        try {
            const page = await axios.get(`/places/table?page=${pageNumber}`)
            return page.data.docs
        } catch (error) {
            return false
        }
    },
    async createPlace(placeBody:any){
        try {
            const place = await axios.post(`/places/`,placeBody)
            return place.data
        } catch (error) {
            console.log(error.response.message)
            fireErrorAlert(error.response.message)
            return false
        }
    }
}
const getToken = (): string | null => {
    return localStorage.getItem("token");
  };