import axios from 'axios';
import { AuthContext } from "./authContext";
import { useContext } from "react";
import {petBooking} from '@/components/objectCatalouge';

// const { getToken } = useContext(AuthContext);

export const ApiService = {
    BASE_URL: "http://172.18.8.106/petshop/web/",
    API_URL : "http://172.18.8.106/petshop/web/index.php?r=api/v1/", // Replace with your API endpoint


    registerPushToken:async (token : string, pushToken:string)=>{
      const formData = new FormData();
      // Append each property manually
      formData.append("token", pushToken);
      try {
          const response = await axios.post(
            `${ApiService.API_URL}auth/register-token`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer '+token,
              },
            }
          );
          console.log(response.data);
          return response.data;
        } catch (error) {
          // console.error("Login failed:", error.response?.data || error.message);
          return undefined;
        }
  },

    login:async (username : string, password: string)=>{
        const formData = new FormData();
    
        // Append each property manually
        formData.append("username", username);
        formData.append("password", password);
        try {
            const response = await axios.post(
              `${ApiService.API_URL}auth/login`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response);
            return response.data;
          } catch (error) {
            // console.error("Login failed:", error.response?.data || error.message);
            return undefined;
          }
    },

    fetchVisits: async (token :string, action = "pet/upcoming-booking", method = "GET") => {
      try {
        const response = await axios({
          url: ApiService.API_URL + action,
          method: method,
          headers: {
            // "host": "localhost",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+token,
          },
        });
    
        return response.data; // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },

    fetchVisitHistoryByPet: async (pet:Number, token :string, action = "pet/visit-history", method = "GET") => {
      try {
        const response = await axios({
          url: ApiService.API_URL + action,
          method: method,
          params:{pet:pet},
          headers: {
            // "host": "localhost",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+token,
          },
        });
    
        return response.data; // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },

    fetchVisitHistory: async (token :string, action = "pet/visit-history-all", method = "GET") => {
      try {
        const response = await axios({
          url: ApiService.API_URL + action,
          method: method,
          headers: {
            // "host": "localhost",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+token,
          },
        });
        console.log(response.data);
        return response.data; // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    fetchPets: async (token :string, action = "pet/list", method = "GET") => {
      try {
        const response = await axios.get(
          ApiService.API_URL+action,
          {
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "application/json",
              "Authorization": 'Bearer '+token,
            },
          }
        );

        return response.data; // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    
    submitBooking: async (token:string, bookingObj :petBooking, action = "pet/create-booking", method = "POST") => {
      try {
        const formData = new FormData();
    
        // Append each property manually
        formData.append("idPet", bookingObj.idPet);
        formData.append("notes", bookingObj.notes);
        formData.append("bookingDate", bookingObj.bookingDate);
        formData.append("bookingTime", bookingObj.bookingTime);


        const response = await axios.post(
          `${ApiService.API_URL}${action}`,
          formData,
          {
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "multipart/form-data",
              "Authorization": 'Bearer '+token,
            },
          }
        );
        console.log(response);
        return response.data;
      } catch (error) {
        // console.error("Login failed:", error.response?.data || error.message);
        return undefined;
      }
    },
}