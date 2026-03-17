// utils/userInterceptor.ts
import axios from "axios";
import { baseURL } from "./config";

export const userServices = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  }
});


// userServices.interceptors.request.use(
//   (config) => {
//     console.log("Making request to:", config.url);
//     console.log("With headers:", config.headers);
    

//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// userServices.interceptors.response.use(
//   (response) => {
//     console.log("Response received:", response.status);
//     return response;
//   },
//   (error) => {
//     console.log("Response error:", error.response?.status, error.response?.data);
//     return Promise.reject(error);
//   }
// );