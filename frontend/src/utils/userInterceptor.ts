import axios from "axios";
import { baseURL } from "./config";

export const userServices = axios.create({
    baseURL: baseURL, 
    headers: {
        "Content-Type": "application/json",
        // 'Cache-Control': 'no-cache, no-store, must-revalidate',
        // 'Pragma': 'no-cache',
        // 'Expires': '0'
    },
    withCredentials: true
});
